import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.adviceslip.com/advice", {
      cache: "no-store", // 🔥 VERY IMPORTANT (prevents repeat)
    });

    const data = await res.json();

    return NextResponse.json({
      advice: data.slip.advice,
    });
  } catch (error) {
    return NextResponse.json(
      { advice: "Take a deep breath. Try again." },
      { status: 500 }
    );
  }
}
