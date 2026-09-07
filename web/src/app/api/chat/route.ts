import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import {
  buildContextualPrompt,
  chooseTemperatureMode,
  MODE_INSTRUCTIONS,
} from "@/lib/finsathi/prompts";
import type { FinancialProfile } from "@/lib/finsathi/types";

interface ChatRequestBody {
  message: string;
  history: { role: "user" | "model"; content: string }[];
  profile?: FinancialProfile | null;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json();
    const { message, history = [], profile = null } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter a question to continue." },
        { status: 400 }
      );
    }

    const mode = chooseTemperatureMode(message);
    const systemPrompt = `${buildContextualPrompt(profile)}\n\n${MODE_INSTRUCTIONS[mode]}`;

    const zai = await ZAI.create();

    const messages: { role: "user" | "assistant"; content: string }[] = [
      { role: "assistant", content: systemPrompt },
      ...history.slice(-16).map((msg) => ({
        role: msg.role === "model" ? ("assistant" as const) : ("user" as const),
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: "disabled" },
    });

    const response =
      completion.choices[0]?.message?.content ??
      "FinSaathi could not generate a response right now. Please try rephrasing your question.";

    return NextResponse.json({ success: true, response, mode });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "FinSaathi is having trouble connecting right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
