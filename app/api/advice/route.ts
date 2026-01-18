import { NextResponse } from "next/server";

async function calmAdvice() {
  const res = await fetch("https://www.affirmations.dev", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.affirmation;
}

async function harshAdvice() {
  const res = await fetch("https://api.adviceslip.com/advice", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.slip.advice;
}

async function philosophicalAdvice() {
  const res = await fetch("https://zenquotes.io/api/random", {
    cache: "no-store",
  });
  const data = await res.json();
  return data[0].q;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tone = searchParams.get("tone") || "calm";

  try {
    let advice = "";

    if (tone === "harsh") {
      advice = await harshAdvice();
    } else if (tone === "philosophical") {
      advice = await philosophicalAdvice();
    } else {
      advice = await calmAdvice();
    }

    return NextResponse.json({ advice });
  } catch {
    return NextResponse.json(
      { advice: "Sit with the silence for a moment." },
      { status: 500 }
    );
  }
}
