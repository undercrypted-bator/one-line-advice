"use client";

import { useState, useEffect } from "react";

const initialAdvice = [
  "Start before you feel ready.",
  "Consistency beats motivation.",
  "Don’t compare your journey to others.",
  "Rest is productive.",
  "Do one thing well today.",
  "Action cures overthinking.",
  "Progress > perfection.",
  "You are allowed to go slow.",
];

function getAdviceOfTheDay(list: string[]) {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  return list[seed % list.length];
}

export default function Home() {
  const [adviceList, setAdviceList] = useState(initialAdvice);
  const [currentAdvice, setCurrentAdvice] = useState("");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentAdvice(getAdviceOfTheDay(adviceList));
  }, [adviceList]);

  function getRandomAdvice() {
    const random =
      adviceList[Math.floor(Math.random() * adviceList.length)];
    setCurrentAdvice(random);
  }

  function submitAdvice() {
    const text = input.trim();
    if (text.length === 0 || text.length > 80) return;

    setAdviceList([text, ...adviceList]);
    setCurrentAdvice(text);
    setInput("");
  }

  function copyAdvice() {
    navigator.clipboard.writeText(currentAdvice);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function shareWhatsApp() {
    const text = `"${currentAdvice}"\n\nvia One-Line Advice`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  function shareX() {
    const text = `"${currentAdvice}"\n\n— One-Line Advice`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
          One-Line Advice
        </h1>

        <p style={{ opacity: 0.7, marginBottom: "1.5rem" }}>
          Advice of the day
        </p>

        <div
          style={{
            fontSize: "1.8rem",
            lineHeight: "1.4",
            marginBottom: "1rem",
            padding: "1.5rem",
            background: "#181818",
            borderRadius: "10px",
          }}
        >
          “{currentAdvice}”
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={copyAdvice}
            style={{
              marginRight: "0.5rem",
              background: "transparent",
              border: "1px solid #444",
              color: "#fff",
              padding: "0.4rem 0.9rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            onClick={shareWhatsApp}
            style={{
              marginRight: "0.5rem",
              background: "#25D366",
              border: "none",
              color: "#000",
              padding: "0.4rem 0.9rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}
          >
            WhatsApp
          </button>

          <button
            onClick={shareX}
            style={{
              background: "#ffffff",
              border: "none",
              color: "#000",
              padding: "0.4rem 0.9rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}
          >
            X
          </button>
        </div>

        <button
          onClick={getRandomAdvice}
          style={{
            display: "block",
            margin: "0 auto 2.5rem",
            padding: "0.8rem 1.6rem",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "#ffffff",
            color: "#000",
          }}
        >
          Show random advice
        </button>

        <div>
          <textarea
            placeholder="Write your one-line advice (max 80 characters)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={80}
            style={{
              width: "100%",
              height: "90px",
              padding: "0.8rem",
              borderRadius: "6px",
              border: "none",
              fontSize: "0.95rem",
              marginBottom: "0.4rem",
            }}
          />

          <div
            style={{
              fontSize: "0.75rem",
              opacity: 0.6,
              textAlign: "right",
              marginBottom: "0.8rem",
            }}
          >
            {input.length}/80
          </div>

          <button
            onClick={submitAdvice}
            style={{
              padding: "0.6rem 1.4rem",
              fontWeight: "bold",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit advice
          </button>
        </div>
      </div>
    </main>
  );
}
