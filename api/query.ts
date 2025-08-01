import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: "edge", // Runs on Edge, no @vercel/node needed
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { prompt, userData } = await req.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ai = new GoogleGenAI({ apiKey });

  const config = {
    maxOutputTokens: 30000,
    thinkingConfig: { thinkingBudget: 0 },
    responseMimeType: "text/plain",
    systemInstruction: [
      {
        text: `You are a tutor who primarily teaches and helps. User data: ${userData}`,
      },
    ],
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config,
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  return new Response(JSON.stringify({ reply: response.text ?? "" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
