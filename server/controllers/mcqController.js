const axios = require("axios");

const generateMCQ = async (req, res) => {
  const { topics, difficulty } = req.body;

  const apiKey = "ede9bf7d709e4a7f8decc120062e9dbb";
  const baseURL = "https://api.aimlapi.com/v1";

  const prompt = `Create a multiple-choice test based on the following topics: ${topics.join(", ")}. The difficulty level should be ${difficulty}. Format the response as a JSON array of questions, where each question has a 'question', 'options', and 'answer'.`;

  try {
    const response = await axios.post(
      `${baseURL}/generate`,
      {
        prompt,
        max_tokens: 256,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.status(200).json({ questions: response.data.questions });
  } catch (error) {
    console.error("Error generating MCQ:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate MCQ" });
  }
};

module.exports = { generateMCQ };
