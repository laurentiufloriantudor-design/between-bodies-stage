import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RECIPIENT = "between.bconnections@gmail.com";

interface ContactPayload {
  type: "newsletter" | "partner";
  email?: string;
  name?: string;
  institution?: string;
  city?: string;
  country?: string;
  message?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: ContactPayload = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    let subject: string;
    let html: string;

    if (payload.type === "newsletter") {
      subject = `[Between Bodies] New newsletter subscriber`;
      html = `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><em>Subscribed via the Between Bodies website.</em></p>
      `;
    } else {
      subject = `[Between Bodies] Partnership inquiry from ${payload.name}`;
      html = `
        <h2>New Partnership Inquiry</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Institution:</strong> ${payload.institution}</p>
        <p><strong>City:</strong> ${payload.city}</p>
        <p><strong>Country:</strong> ${payload.country}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${payload.message}</p>
      `;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Between Bodies <onboarding@resend.dev>",
        to: [RECIPIENT],
        subject,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
