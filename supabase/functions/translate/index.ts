import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function extractJsonArray(raw: string, expectedLength: number): string[] {
  // Strip markdown fences
  let cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

  // Try to find a JSON array
  const arrStart = cleaned.indexOf("[");
  const arrEnd = cleaned.lastIndexOf("]");

  if (arrStart !== -1 && arrEnd > arrStart) {
    const candidate = cleaned.substring(arrStart, arrEnd + 1);
    try {
      const parsed = JSON.parse(candidate);
      if (Array.isArray(parsed)) {
        // Ensure all items are strings and length matches
        const result = parsed.map((item: unknown) => String(item ?? ""));
        // If model returned too many, trim; if too few, pad with originals
        return result.slice(0, expectedLength);
      }
    } catch {
      // Try fixing trailing commas and control chars
      const fixed = candidate
        .replace(/,\s*]/g, "]")
        .replace(/[\x00-\x1F\x7F]/g, "");
      try {
        const parsed = JSON.parse(fixed);
        if (Array.isArray(parsed)) {
          return parsed.map((item: unknown) => String(item ?? "")).slice(0, expectedLength);
        }
      } catch { /* fall through */ }
    }
  }

  // If only one text was sent and model returned a plain string, wrap it
  if (expectedLength === 1) {
    // Remove quotes if wrapped
    const unquoted = cleaned.replace(/^["']|["']$/g, "").trim();
    if (unquoted.length > 0) {
      return [unquoted];
    }
  }

  // Fallback: return null to signal failure
  return [];
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { texts, targetLang } = await req.json();

    if (!texts || !targetLang || !Array.isArray(texts)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (targetLang === "en") {
      return new Response(JSON.stringify({ translations: texts }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const langMap: Record<string, string> = { it: "Italian", ro: "Romanian" };
    const langName = langMap[targetLang];
    if (!langName) {
      return new Response(JSON.stringify({ error: "Unsupported language" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const numberedTexts = texts.map((t: string, i: number) => `[${i}] ${t}`).join("\n");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `You are a translator. Translate the numbered English texts to ${langName}. Return ONLY a JSON array of strings with exactly ${texts.length} element(s). No explanation, no markdown, no code blocks. Example for 2 inputs: ["translation1","translation2"]. Keep proper nouns like "Between Bodies", "STORM", "Shakespeare" unchanged.`,
          },
          { role: "user", content: numberedTexts },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      const t = await response.text();
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI error:", status, t);
      // Fallback: return originals
      return new Response(JSON.stringify({ translations: texts }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    const translations = extractJsonArray(content, texts.length);

    // If extraction failed or length mismatch, return originals
    if (translations.length < texts.length) {
      console.error("Parse issue, returning originals. Raw:", content);
      return new Response(JSON.stringify({ translations: texts }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ translations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("translate error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
