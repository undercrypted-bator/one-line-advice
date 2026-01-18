"use client";

import { useState } from "react";

const initialAdvice = [
  "Start before you feel ready.",
  "Consistency beats motivation.",
  "Don’t compare your journey to others.",
  "Rest is productive.",
  "Do one thing well today.",
];

export default function Home() {
  const [adviceList, setAdviceList] = useState(initialAdvice);
  const [currentAdvice, setCurrentAdvice] = useState(adviceList[0]);
  const [input, setInput] = useState("");

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

        <p style={{ opacity: 0.7, marginBottom: "2.5rem" }}>
          Short wisdom from strangers on the internet.
        </p>

        <div
          style={{
            fontSize: "1.8rem",
            lineHeight: "1.4",
            marginBottom: "2rem",
            padding: "1.5rem",
            background: "#181818",
            borderRadius: "10px",
          }}
        >
          “{currentAdvice}”
        </div>

        <button
          onClick={getRandomAdvice}
          style={{
            padding: "0.8rem 1.6rem",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "#ffffff",
            color: "#000",
            marginBottom: "2.5rem",
          }}
        >
          Give me another
        </button>

        <div style={{ marginTop: "1rem" }}>
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
