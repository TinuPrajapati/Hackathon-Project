import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateMCQ = async (req, res) => {
  const { topics, difficulty } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  const baseURL = process.env.GEMINI_BASE_URL;

  const prompt = `Create a multiple-choice test based on the following topics: ${topics.join(", ")}. The difficulty level should be ${difficulty}. Format the response as a JSON array of questions, where each question has a 'question', 'options', and 'answer'.`;

  try {
    const response = await axios.post(
      `${baseURL}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ questions: response.data });
  } catch (error) {
    console.error("Error generating MCQ:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate MCQ" });
  }
};
