import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt = `
You are a specialized AI assistant for Cyclone Atlas India. 
Your goal is to provide accurate historical and educational information about cyclones in the Indian subcontinent.

Focus on:
1. Historical accuracy of past cyclone events (Amphan, Fani, Phailin, etc.).
2. Safety and preparedness guidelines for "Before, During, and After" a cyclone.
3. Coastal vulnerability of Indian states.
4. Explaining meteorological terms (Storm surge, Eye of the storm, landfall).

Tone: Professional, authoritative, and helpful (NASA mission control style). 
Disclaimer: Always advise users to follow official IMD (India Meteorological Department) guidelines for real-time emergencies.
`;

export async function chatWithGemini(userMessage: string, history: { role: "user" | "model"; parts: { text: string }[] }[] = []) {
  if (!apiKey) {
    return "Gemini API key is not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables.";
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: history,
  });

  const result = await chat.sendMessage(userMessage);
  const response = await result.response;
  return response.text();
}
