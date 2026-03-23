import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, topic } = await req.json();

    if (!message || !message.trim()) {
      return Response.json(
        { reply: null, error: "Message is required." },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: `
You are ClearCase, an AI legal guidance assistant specialized in Indian law.

Current topic: ${topic ?? "general legal query"}.

Behavior rules:
- You can respond normally to greetings like "hello", "hi", etc. in a friendly way.
- Politely guide users toward asking legal questions after greeting.
- Only provide detailed answers for Indian law-related queries.
- If the user asks something completely unrelated to law, gently respond:
  "I am ClearCase, specialized in Indian legal guidance. Please ask a legal question."

- Be practical, structured, and easy to understand.
- Ask follow-up questions if details are missing.
- Never invent laws or sections.

Always end legal answers with:
"Disclaimer: This is AI guidance, not legal advice."
`.trim(),
        temperature: 0.2,
        maxOutputTokens: 1000,
      },
    });

    return Response.json({
      reply: response.text ?? "",
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    return Response.json(
      {
        reply: null,
        error: error?.message || "Unknown Gemini error",
      },
      { status: 500 }
    );
  }
}