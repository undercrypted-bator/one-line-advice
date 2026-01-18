"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  async function fetchAdvice() {
    setLoading(true);
    setVisible(false);

    try {
      const res = await fetch("/api/advice", { cache: "no-store" });
      const data = await res.json();

      setTimeout(() => {
        setAdvice(data.advice);
        setVisible(true);
      }, 300);
    } catch {
      setAdvice("Sit with the silence for a moment.");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdvice();
  }, []);

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
      <div
        style={{
          maxWidth: "720px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3.2rem",
            fontWeight: 500,
            marginBottom: "0.6rem",
            letterSpacing: "-0.03em",
          }}
        >
          One-Line Advice
        </h1>

        <p
          style={{
            opacity: 0.5,
            marginBottom: "4rem",
            fontSize: "0.95rem",
          }}
        >
          Something different. Every time.
        </p>

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
          onClick={fetchAdvice}
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
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.opacity = "1")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.opacity = "0.85")
          }
        >
          {loading ? "Thinking…" : "Give me something new"}
        </button>

        <p
          style={{
            marginTop: "3rem",
            fontSize: "0.7rem",
            opacity: 0.35,
          }}
        >
          Refreshing too fast ruins it.
        </p>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </main>
  );
}
