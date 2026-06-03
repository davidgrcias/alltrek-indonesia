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
  return Response.json({ configured: Boolean(process.env.GEMINI_API_KEY) });
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Gemini is not configured. Set GEMINI_API_KEY." },
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
  const ai = new GoogleGenAI({ apiKey });

  const transcript = payload.messages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");

  const prompt = [
    buildAgentSystemPrompt(payload.locale, catalogContext),
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
