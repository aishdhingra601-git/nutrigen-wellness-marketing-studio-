import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDishContent = async (
  dishName: string,
  heroIngredient: string,
  ingredients: string,
  healthFocus: string,
  aspectRatio: '1:1' | '9:16',
  imageEnhancements: string
): Promise<{ description: string; imageBase64: string | null }> => {
  
  try {
    // 1. Generate Text Description
    const textPrompt = `
      Write a sophisticated, sensory-rich, and concise menu description (max 40 words) for a high-end dish named "${dishName}".
      Hero Ingredient: ${heroIngredient} (This is the star, highlight it).
      Other Key Ingredients: ${ingredients}.
      Health Benefit: ${healthFocus}.
      Tone: Culinary luxury, Michelin-star menu style, enticing.
      Start directly with the description. Do not use quotes.
    `;

    const textResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: textPrompt,
    });

    const description = textResponse.text || "A masterpiece of culinary wellness featuring premium ingredients.";

    // 2. Generate Image using Gemini 2.5 Flash Image (More stable than Imagen for this key)
    const imagePrompt = `
      Professional food photography of ${dishName}.
      Close-up shot focusing on ${heroIngredient}.
      Visible ingredients: ${ingredients}.
      Lighting: Natural, soft window light, appetizing.
      Style: High-end cookbook, sharp focus, vibrant natural colors.
      Composition: ${aspectRatio === '9:16' ? 'Vertical' : 'Square'} centered.
      ${imageEnhancements}
    `;

    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: imagePrompt,
      config: {
        imageConfig: {
            aspectRatio: aspectRatio,
        }
      }
    });

    let imageBase64 = null;
    if (imageResponse.candidates && imageResponse.candidates[0].content.parts) {
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          imageBase64 = part.inlineData.data;
          break;
        }
      }
    }

    return {
      description,
      imageBase64
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};