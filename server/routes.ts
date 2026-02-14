import type { Express } from "express";
import type { Server } from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  generateMatrixRequestSchema,
  generateMatrixResponseSchema,
} from "@shared/ad-matrix";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  const parseImagePart = (base64DataUrl: string) => {
    const match = /^data:(.*?);base64,(.*)$/.exec(base64DataUrl);
    if (match) {
      return {
        inlineData: {
          mimeType: match[1],
          data: match[2],
        },
      };
    }

    return {
      inlineData: {
        mimeType: "image/png",
        data: base64DataUrl,
      },
    };
  };

  app.post("/api/generate-matrix", async (req, res, next) => {
    try {
      const parsedRequest = generateMatrixRequestSchema.safeParse(req.body);

      if (!parsedRequest.success) {
        return res.status(400).json({
          message: "Invalid request payload",
          errors: parsedRequest.error.flatten(),
        });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ message: "Server missing GEMINI_API_KEY" });
      }

      const {
        audience,
        languages,
        variations,
        campaignContext,
        logoBase64,
        productBase64,
      } = parsedRequest.data;

      const logoPart = parseImagePart(logoBase64);
      const productPart = parseImagePart(productBase64);

      const promptText = `
Role: Senior Creative Director for India.
Context: ${campaignContext}
Target Audience: ${audience}

TASK: Generate a Ad Matrix of size: ${languages.length} Columns (Languages) x ${variations.length} Rows (Variations).

COLUMNS (LANGUAGES):
${languages.join(", ")}

ROWS (VARIATIONS):
${variations.join(", ")}

REQUIREMENTS:
1. Analyze the uploaded images to determine color palettes (bgGradient, accentColor, textColor).
2. CRITICAL: The 'noiseWords' and 'headline' MUST be in the correct script for that column's language (Devanagari for Hindi, Kannada script for Kannada, Oriya script for Odia, etc.).
3. Return strictly JSON. No markdown formatting.
4. For "noiseWords", give me 2-3 punchy words relevant to the variation style in the target language.

OUTPUT STRUCTURE:
{
  "columns": [
    {
      "language": "Language Name",
      "variations": [
        { "style": "Variation Name 1", "noiseWords": ["...", "..."], "headline": "...", "subline": "...", "bgGradient": "linear-gradient(...)", "bgColor": "#hex", "accentColor": "#hex", "textColor": "#hex" },
        { "style": "Variation Name 2", "noiseWords": ["...", "..."], "headline": "...", "subline": "...", "bgGradient": "linear-gradient(...)", "bgColor": "#hex", "accentColor": "#hex", "textColor": "#hex" }
      ]
    }
  ]
}
`;

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent([promptText, logoPart, productPart]);
      const responseText = result.response.text();
      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedModelJson = JSON.parse(cleanJson);

      const parsedResponse = generateMatrixResponseSchema.safeParse(parsedModelJson);
      if (!parsedResponse.success) {
        return res.status(502).json({
          message: "Invalid model response format",
          errors: parsedResponse.error.flatten(),
        });
      }

      return res.json(parsedResponse.data);
    } catch (error) {
      return next(error);
    }
  });

  return httpServer;
}
