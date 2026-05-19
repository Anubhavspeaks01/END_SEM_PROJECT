const axios = require('axios');

/**
 * @desc    Analyze complaint using Gemini AI
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

    // Using OpenRouter API to access Gemini models with the provided sk-or-... key
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.3-70b-instruct:free', // Using a valid free model to avoid 404 Not Found
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: "json_object" }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const resultText = response.data.choices[0].message.content;
    
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
    next(error);
  }
};

module.exports = {
  analyzeComplaint
};
