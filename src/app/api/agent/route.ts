import { GoogleGenAI } from "@google/genai";
import {
  agentRequestSchema,
  buildAgentSystemPrompt,
  parseAgentResponse,
} from "@/lib/agent";
import { getAgentCatalogContext } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    configured: Boolean(process.env.GEMINI_API_KEY || process.env.PIONEER_API_KEY),
    provider: process.env.PIONEER_API_KEY ? "pioneer" : "gemini",
  });
}

export async function POST(request: Request) {
  const pioneerApiKey = process.env.PIONEER_API_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!pioneerApiKey && !geminiApiKey) {
    return Response.json(
      { error: "API Key not configured. Set GEMINI_API_KEY or PIONEER_API_KEY." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = agentRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid agent request.", issues: parsed.error.issues }, { status: 400 });
  }

  const payload = parsed.data;
  const catalogContext = getAgentCatalogContext();
  const systemPrompt = buildAgentSystemPrompt(payload.locale, catalogContext);

  if (pioneerApiKey) {
    const model = process.env.PIONEER_MODEL || "claude-sonnet-4-6";
    const messages = [
      { role: "system", content: systemPrompt },
      ...payload.messages.map((message) => ({
        role: message.role === "assistant" ? "assistant" : "user",
        content: message.content,
      })),
      {
        role: "user",
        content: `Current cart: ${JSON.stringify(payload.cart)}\nPlease respond strictly in JSON format as required.`,
      }
    ];

    try {
      const response = await fetch("https://api.pioneer.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${pioneerApiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Pioneer API response error: ${response.status} - ${errorText}`);
      }

      const responseJson = await response.json();
      const text = responseJson.choices?.[0]?.message?.content ?? "";
      const parsedResponse = parseAgentResponse(text);
      return Response.json(parsedResponse);
    } catch (error) {
      return Response.json(
        {
          error: "Pioneer response could not be generated or parsed.",
          detail: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 502 },
      );
    }
  }

  // Fallback to Gemini
  const apiKey = geminiApiKey!;
  const ai = new GoogleGenAI({ apiKey });

  const transcript = payload.messages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");

  const prompt = [
    systemPrompt,
    `Current cart: ${JSON.stringify(payload.cart)}`,
    "Conversation:",
    transcript,
  ].join("\n\n");

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL ?? "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text ?? "";
    const parsedResponse = parseAgentResponse(text);
    return Response.json(parsedResponse);
  } catch (error) {
    return Response.json(
      {
        error: "Gemini response could not be generated or parsed.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 },
    );
  }
}
