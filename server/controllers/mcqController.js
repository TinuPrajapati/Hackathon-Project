import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateMCQ = async (req, res) => {
  const { topics, difficulty } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  const baseURL = process.env.GEMINI_BASE_URL;

  console.log("Received Topics:", topics);
  console.log("Received Difficulty:", difficulty);
  console.log("API Key:", apiKey ? "Exists" : "Missing");
  console.log("Base URL:", baseURL);

  if (!apiKey || !baseURL) {
    console.error("Missing API key or base URL in environment variables.");
    return res.status(500).json({ error: "Server configuration error." });
  }

  const prompt = `Create a multiple-choice test based on the following topics: ${topics.join(", ")}. The difficulty level should be ${difficulty}. Format the response as a JSON array of questions, where each question has a 'question', 'options', and 'answer'.`;

  console.log("Generated Prompt:", prompt);

  try {
    const response = await axios.post(
      `${baseURL}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response:", response.data);

    // Validate and structure the response
    const questions = response.data.contents?.map((content) => ({
      question: content.text || "",
      options: content.options || [],
      answer: content.answer || "",
    })) || [];

    console.log("Structured Questions:", questions);

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error generating MCQ:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate MCQ" });
  }
};
