import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateApiRequest = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
              Return ONLY valid JSON.
              No markdown. No explanation.

              {
                "method": "GET|POST|PUT|PATCH|DELETE",
                "url": "",
                "headers": { "key": "value" },
                "body": {}
              }
              `,
            },
            { text: prompt },
          ],
        },
      ],
    });

    let text = result.candidates[0].content.parts[0].text;
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    if (!parsed.method || !parsed.url) {
      return res.status(400).json({ message: "Invalid AI response" });
    }

    res.json(parsed);
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ message: "AI generation failed" });
  }
};

export default {generateApiRequest};