import { NextResponse } from "next/server";

async function fromAdviceSlip() {
  const res = await fetch("https://api.adviceslip.com/advice", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.slip.advice;
}

async function fromZenQuotes() {
  const res = await fetch("https://zenquotes.io/api/random", {
    cache: "no-store",
  });
  const data = await res.json();
  return data[0].q;
}

async function fromAffirmations() {
  const res = await fetch("https://www.affirmations.dev", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.affirmation;
}

export async function GET() {
  const sources = [
    fromAdviceSlip,
    fromZenQuotes,
    fromAffirmations,
  ];

  try {
    // 🎲 Pick a random source
    const randomSource =
      sources[Math.floor(Math.random() * sources.length)];

    const advice = await randomSource();

    return NextResponse.json({ advice });
  } catch (error) {
    return NextResponse.json(
      { advice: "Pause. Breathe. Begin again." },
      { status: 500 }
    );
  }
}
