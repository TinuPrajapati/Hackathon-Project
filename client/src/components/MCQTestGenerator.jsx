import React, { useState } from "react";

const MCQTestGenerator = () => {
  const [topics, setTopics] = useState(["", "", "", ""]);
  const [difficulty, setDifficulty] = useState("medium");
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (index, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index] = value;
    setTopics(updatedTopics);
  };

  const generateTest = async () => {
    setLoading(true);
    const apiKey = "ede9bf7d709e4a7f8decc120062e9dbb";
    const baseURL = "https://api.aimlapi.com/v1";

    const prompt = `Create a multiple-choice test based on the following topics: ${topics.join(", ")}. The difficulty level should be ${difficulty}. Format the response as a JSON array of questions, where each question has a 'question', 'options', and 'answer'.`;

    try {
      const response = await fetch(`${baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.2",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      const generatedTest = JSON.parse(data.choices[0].message.content);
      setTest(generatedTest);
    } catch (error) {
      console.error("Error generating test:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "800px", margin: "auto" }}>
      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>MCQ Test Generator</h1>
        <div style={{ marginBottom: "1rem" }}>
          {topics.map((topic, index) => (
            <input
              key={index}
              value={topic}
              onChange={(e) => handleTopicChange(index, e.target.value)}
              placeholder={`Topic ${index + 1}`}
              style={{
                display: "block",
                width: "100%",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          ))}
        </div>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={generateTest}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Test"}
        </button>
      </div>

      {test && (
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Generated Test</h2>
          {test.map((question, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <p style={{ fontWeight: "bold" }}>{index + 1}. {question.question}</p>
              <ul style={{ paddingLeft: "1.5rem" }}>
                {question.options.map((option, i) => (
                  <li key={i} style={{ listStyleType: "disc" }}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MCQTestGenerator;