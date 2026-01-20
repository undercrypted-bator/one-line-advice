"use client";

import { useEffect, useRef, useState } from "react";

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

  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Init ritual + sound preference
  useEffect(() => {
    const detectedRitual = getDefaultRitual();
    setRitual(detectedRitual);
    setTone(detectedRitual === "morning" ? "calm" : "philosophical");

    const storedSound = localStorage.getItem("ambientSound");
    if (storedSound === "on") setSoundOn(true);
  }, []);

  // Handle sound play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (soundOn) {
      audioRef.current.volume = 0.25;
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {});
      localStorage.setItem("ambientSound", "on");
    } else {
      audioRef.current.pause();
      localStorage.setItem("ambientSound", "off");
    }
  }, [soundOn]);

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
      {/* Hidden audio */}
      <audio ref={audioRef} src="/ambient.mp3" />

      <div style={{ maxWidth: "720px", textAlign: "center" }}>
        <h1 style={{ fontSize: "3.2rem", marginBottom: "0.4rem" }}>
          One-Line Advice
        </h1>

        <p style={{ opacity: 0.55, marginBottom: "1.2rem" }}>
          {ritual === "morning"
            ? "A quiet thought to begin your day."
            : "Something to sit with before you rest."}
        </p>

        {/* Sound Toggle */}
        <button
          onClick={() => setSoundOn(!soundOn)}
          style={{
            fontSize: "0.7rem",
            opacity: 0.5,
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            marginBottom: "1.5rem",
          }}
        >
          {soundOn ? "Ambient sound: on" : "Ambient sound: off"}
        </button>

        <div
          style={{
            fontSize: "2.2rem",
            lineHeight: "1.55",
            padding: "2.5rem",
            marginBottom: "3rem",
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
