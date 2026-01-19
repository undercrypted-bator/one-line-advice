"use client";

import { useEffect, useState } from "react";

type Tone = "calm" | "harsh" | "philosophical";
type Ritual = "morning" | "night";

function getDefaultRitual(): Ritual {
  const hour = new Date().getHours();
  return hour >= 5 && hour < 17 ? "morning" : "night";
}

export default function Home() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [ritual, setRitual] = useState<Ritual>("morning");
  const [tone, setTone] = useState<Tone>("calm");

  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load ritual + favorites on first load
  useEffect(() => {
    const detectedRitual = getDefaultRitual();
    setRitual(detectedRitual);
    setTone(detectedRitual === "morning" ? "calm" : "philosophical");

    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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
      setAdvice("Sit with the moment.");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdvice();
  }, [tone]);

  function saveFavorite() {
    if (!favorites.includes(advice)) {
      setFavorites([advice, ...favorites]);
    }
  }

  function removeFavorite(text: string) {
    setFavorites(favorites.filter((f) => f !== text));
  }

  const isNight = ritual === "night";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: isNight
          ? "linear-gradient(120deg, #020617, #000)"
          : "linear-gradient(120deg, #0f172a, #020617)",
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
        <h1 style={{ fontSize: "3.2rem", marginBottom: "0.4rem" }}>
          One-Line Advice
        </h1>

        <p style={{ opacity: 0.55, marginBottom: "1.2rem" }}>
          {ritual === "morning"
            ? "A quiet thought to begin your day."
            : "Something to sit with before you rest."}
        </p>

        {/* Ritual Switch */}
        <div style={{ marginBottom: "1.8rem" }}>
          <button
            onClick={() => {
              setRitual("morning");
              setTone("calm");
            }}
            style={{
              marginRight: "0.5rem",
              padding: "0.3rem 0.9rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.3)",
              background:
                ritual === "morning"
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            Morning
          </button>

          <button
            onClick={() => {
              setRitual("night");
              setTone("philosophical");
            }}
            style={{
              padding: "0.3rem 0.9rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.3)",
              background:
                ritual === "night"
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            Night
          </button>
        </div>

        {/* Tone Selector */}
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value as Tone)}
          style={{
            marginBottom: "2.5rem",
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

        {/* Advice */}
        <div
          style={{
            fontSize: "2.2rem",
            lineHeight: "1.55",
            padding: "2.5rem",
            marginBottom: "2rem",
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

        {/* Action Buttons */}
        <div style={{ marginBottom: "3rem" }}>
          <button
            onClick={() => fetchAdvice()}
            disabled={loading}
            style={{
              marginRight: "0.6rem",
              padding: "0.7rem 1.6rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
              opacity: loading ? 0.5 : 0.85,
            }}
          >
            {loading ? "Thinking…" : "New"}
          </button>

          <button
            onClick={saveFavorite}
            style={{
              padding: "0.7rem 1.4rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>

        {/* Favorites */}
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          style={{
            fontSize: "0.75rem",
            opacity: 0.5,
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          {showFavorites ? "Hide saved thoughts" : "View saved thoughts"}
        </button>

        {showFavorites && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1.5rem",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.04)",
              textAlign: "left",
              maxHeight: "220px",
              overflowY: "auto",
              fontSize: "0.9rem",
            }}
          >
            {favorites.length === 0 && (
              <p style={{ opacity: 0.5 }}>No saved thoughts yet.</p>
            )}

            {favorites.map((f, i) => (
              <div key={i} style={{ marginBottom: "1rem" }}>
                “{f}”
                <button
                  onClick={() => removeFavorite(f)}
                  style={{
                    marginLeft: "0.5rem",
                    fontSize: "0.7rem",
                    background: "none",
                    border: "none",
                    color: "#aaa",
                    cursor: "pointer",
                  }}
                >
                  remove
                </button>
              </div>
            ))}
          </div>
        )}

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
