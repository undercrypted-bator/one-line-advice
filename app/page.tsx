"use client";

import { useEffect, useState } from "react";

type Tone = "calm" | "harsh" | "philosophical";

export default function Home() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tone, setTone] = useState<Tone>("calm");

  async function fetchAdvice(selectedTone = tone) {
    setLoading(true);
    setVisible(false);

    try {
      const res = await fetch(`/api/advice?tone=${selectedTone}`, {
        cache: "no-store",
      });
      const data = await res.json();

      setTimeout(() => {
        setAdvice(data.advice);
        setVisible(true);
      }, 300);
    } catch {
      setAdvice("Pause. Breathe. Begin again.");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdvice();
  }, [tone]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(120deg, #0f0f0f, #111827, #020617)",
        backgroundSize: "400% 400%",
        animation: "bgMove 20s ease infinite",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        color: "#f9fafb",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ maxWidth: "720px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "3.2rem",
            fontWeight: 500,
            marginBottom: "0.6rem",
          }}
        >
          One-Line Advice
        </h1>

        <p style={{ opacity: 0.5, marginBottom: "2rem" }}>
          Choose how you want to be told.
        </p>

        {/* Tone Selector */}
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value as Tone)}
          style={{
            marginBottom: "3rem",
            padding: "0.4rem 0.8rem",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            cursor: "pointer",
          }}
        >
          <option value="calm">Calm</option>
          <option value="harsh">Harsh</option>
          <option value="philosophical">Philosophical</option>
        </select>

        <div
          style={{
            fontSize: "2.2rem",
            lineHeight: "1.55",
            padding: "2.5rem",
            marginBottom: "4rem",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(14px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.8s ease",
          }}
        >
          {advice && `“${advice}”`}
        </div>

        <button
          onClick={() => fetchAdvice()}
          disabled={loading}
          style={{
            padding: "0.9rem 2.2rem",
            fontSize: "0.95rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "transparent",
            color: "#f9fafb",
            cursor: "pointer",
            opacity: loading ? 0.5 : 0.85,
          }}
        >
          {loading ? "Thinking…" : "Give me something new"}
        </button>

        <style>{`
          @keyframes bgMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </main>
  );
}
