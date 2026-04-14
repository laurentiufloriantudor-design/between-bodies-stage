import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PollOption {
  label: string;
  value: string;
}

interface ArticlePollProps {
  articleSlug: string;
  question: string;
  options: PollOption[];
}

export default function ArticlePoll({ articleSlug, question, options }: ArticlePollProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCounts();
  }, [articleSlug]);

  const fetchCounts = async () => {
    const { data } = await supabase
      .from("article_poll_responses")
      .select("response")
      .eq("article_slug", articleSlug);

    if (!data) return;
    const c: Record<string, number> = {};
    data.forEach(row => {
      c[row.response] = (c[row.response] || 0) + 1;
    });
    setCounts(c);
    setTotal(data.length);
  };

  const handleSubmit = async () => {
    if (!selected || loading) return;
    setLoading(true);
    await supabase.from("article_poll_responses").insert({
      article_slug: articleSlug,
      response: selected,
    });
    setSubmitted(true);
    await fetchCounts();
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "3rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(22,40,54,0.12)" }}>
      <span className="font-display" style={{ fontSize: "1.3rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(22,40,54,0.4)" }}>
        Before you leave
      </span>

      <p className="font-display" style={{ fontSize: "2.7rem", lineHeight: 1.3, marginTop: "0.6rem", marginBottom: "1.5rem", color: "#162836" }}>
        {question}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {options.map(opt => {
          const count = counts[opt.value] || 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const isSelected = selected === opt.value;

          return (
            <button
              key={opt.value}
              onClick={() => !submitted && setSelected(opt.value)}
              style={{
                position: "relative",
                textAlign: "left",
                padding: "0.9rem 1.1rem",
                border: `1px solid ${isSelected ? "#162836" : "rgba(22,40,54,0.2)"}`,
                background: "transparent",
                cursor: submitted ? "default" : "pointer",
                overflow: "hidden",
                transition: "border-color 0.3s ease",
              }}
            >
              {submitted && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: `${pct}%`,
                    background: "rgba(22,40,54,0.06)",
                    transition: "width 0.6s ease",
                  }}
                />
              )}
              <span className="font-body" style={{ position: "relative", fontSize: "1.8rem", color: "#162836", display: "flex", justifyContent: "space-between" }}>
                {opt.label}
                {submitted && (
                  <span style={{ fontVariantNumeric: "tabular-nums", marginLeft: "1rem", color: "rgba(22,40,54,0.5)" }}>
                    {pct}%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selected || loading}
          className="font-display"
          style={{
            marginTop: "1rem",
            fontSize: "1.5rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            background: "none",
            border: "none",
            color: selected ? "#162836" : "rgba(22,40,54,0.3)",
            cursor: selected ? "pointer" : "default",
            padding: "0.4rem 0",
            transition: "color 0.3s ease",
          }}
        >
          {loading ? "…" : "Submit →"}
        </button>
      ) : (
        <p className="font-body" style={{ marginTop: "1rem", fontSize: "1.6rem", color: "rgba(22,40,54,0.45)" }}>
          Thank you. {total} {total === 1 ? "person" : "people"} have responded.
        </p>
      )}
    </div>
  );
}
