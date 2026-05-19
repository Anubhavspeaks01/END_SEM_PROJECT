const { GoogleGenAI } = require('@google/genai');

/**
 * @desc    Analyze complaint using official Google GenAI SDK
 * @route   POST /api/ai/analyze
 * @access  Private
 */
const analyzeComplaint = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      res.status(400);
      throw new Error('Please provide title, description, and category for analysis');
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(503);
      throw new Error('AI analysis is currently unavailable. API key is missing.');
    }

    const prompt = `
You are an intelligent complaint classification system. Analyze the following complaint:
Title: ${title}
Category: ${category}
Description: ${description}

Provide a JSON output ONLY with exactly these keys:
- "urgency": Assess the priority. Must be strictly one of ["Low", "Medium", "High"].
- "suggestedDepartment": Suggest the relevant department (e.g., "Water Department", "Sanitation", "Electricity Board").
- "summary": A concise 1-2 sentence summary of the issue.
- "autoResponse": A polite, professional auto-generated response message to the user acknowledging the issue.

Output valid JSON only. Do not wrap in markdown tags like \`\`\`json.
    `;

    // Initialize the official Google GenAI client
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    const resultText = response.text;
    
    let analysis;
    try {
      analysis = JSON.parse(resultText);
    } catch (parseErr) {
      console.error("AI Output Parsing Error:", resultText);
      res.status(500);
      throw new Error("Failed to parse AI response");
    }

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    if (error.response) {
      if (error.response.status === 429) {
        res.status(429);
        return next(new Error("AI is currently busy (Rate Limit Exceeded). Please wait a few seconds and try again."));
      }
      res.status(error.response.status);
      return next(new Error(`AI Service Error: ${error.response.data?.error?.message || error.message}`));
    }
    next(error);
  }
};

module.exports = {
  analyzeComplaint
};
