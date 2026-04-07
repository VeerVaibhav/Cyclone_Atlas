import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt = `
You are a specialized AI assistant for Cyclone Atlas India. 
Your goal is to provide accurate historical and educational information about cyclones in the Indian subcontinent.

STRICT BEHAVIOR RULES:
1. Focus exclusively on cyclones, coastal safety, meteorological terms, and Indian coastal vulnerability.
2. If a user asks an unrelated question (e.g., about recipes, unrelated history, general facts), politely redirect them back to cyclone-related topics.
3. Keep answers EXTREMELY short, clear, and practical. MAXIMUM 2-3 SENTENCES.
4. Focus on India's coastal regions (Odisha, West Bengal, Andhra Pradesh, Tamil Nadu, Gujarat, etc.).
5. Explain preparedness (Before, During, After), impacts, and safety guidelines.
6. NEVER generate long lists or paragraphs. Keep it brief and to the point.

Tone: Professional, authoritative, and helpful (NASA mission control style). 
Disclaimer: Always advise users to follow official IMD (India Meteorological Department) guidelines for real-time emergencies.
`;

export async function chatWithGemini(userMessage: string, history: { role: "user" | "model"; parts: { text: string }[] }[] = []) {
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
