import React, { useState } from "react";

const MCQTestGenerator = () => {
  const [topics, setTopics] = useState(["", "", "", ""]);
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [showTest, setShowTest] = useState(false);

  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const generateTest = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-mcq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topics, difficulty }),
      });
      const data = await response.json();
      setQuestions(data.questions || []);
      setShowTest(true);
    } catch (error) {
      console.error("Error generating test:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>
        MCQ Test Generator
      </h1>

      <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>Enter Topics and Difficulty</h2>

        {topics.map((topic, index) => (
          <div key={index} style={{ marginBottom: "16px" }}>
            <label htmlFor={`topic-${index}`} style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
              Topic {index + 1}:
            </label>
            <input
              id={`topic-${index}`}
              value={topic}
              onChange={(e) => handleTopicChange(index, e.target.value)}
              placeholder={`Enter topic ${index + 1}`}
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
        ))}

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="difficulty" style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Difficulty Level:
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          onClick={generateTest}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Generate Test
        </button>
      </div>

      {showTest && (
        <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>Your MCQ Test</h2>
          {questions.map((question, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                {index + 1}. {question.question}
              </p>
              {question.options.map((option, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    id={`question-${index}-option-${i}`}
                    value={i}
                    style={{ marginRight: "8px" }}
                  />
                  <label htmlFor={`question-${index}-option-${i}`} style={{ cursor: "pointer" }}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MCQTestGenerator;
