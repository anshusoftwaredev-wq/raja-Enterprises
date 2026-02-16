
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getShoppingAdvice = async (userMessage: string, availableProducts: Product[], userMode: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const productContext = availableProducts.map(p => 
    `${p.name} (${p.brand}) - Retail: ₹${p.retailPrice}, Wholesale: ₹${p.wholesalePrice} (MOQ: ${p.moq}). Stock: ${p.stock}. Desc: ${p.description}`
  ).join('\n');

  const systemPrompt = `
    You are the "Raja Pro-Assistant", a high-end AI consultant for Raja Enterprises, based in India.
    The store has two modes: Retail (B2C) and Wholesale (B2B).
    Currently, the user is in ${userMode.toUpperCase()} mode.
    All prices are in Indian Rupees (₹).
    
    Inventory:
    ${productContext}
    
    Guidelines:
    1. All currency mentions must be in Indian Rupees using the ₹ symbol.
    2. If mode is WHOLESALE: Focus on bulk availability, MOQ requirements, and profit margins for Indian retailers.
    3. If mode is RETAIL: Focus on product features, lifestyle benefits, and individual pricing.
    4. Be professional, slightly tech-forward, and extremely helpful.
    5. If the user asks about something not in stock, suggest the nearest alternative from the inventory.
    6. Use markdown for lists and bold text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.6,
      }
    });

    return response.text || "I'm processing that request. One moment please.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI server is currently synchronizing local inventory. Please try again shortly!";
  }
};
