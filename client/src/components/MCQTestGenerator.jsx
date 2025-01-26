import React, { useState } from "react";

const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

const MCQTestGenerator = ({ onGenerate }) => {
  const [topics, setTopics] = useState(["", "", "", ""]);
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [showTest, setShowTest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const generateTest = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/generate-mcq`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topics, difficulty }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();

      const generatedTest = {
        topics,
        difficulty,
        questions: data.questions || [],
      };

      setQuestions(generatedTest.questions);
      setShowTest(true);

      if (onGenerate) {
        onGenerate(generatedTest);
      }
    } catch (error) {
      console.error("Error generating test:", error.message);
      setErrorMessage("Failed to generate the test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        MCQ Test Generator
      </h1>

      {loading && <Loader />}

      {!loading && !showTest && (
        <div className="p-6 border border-gray-300 rounded-lg mb-6 bg-white shadow">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            Enter Topics and Difficulty
          </h2>

          {topics.map((topic, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={`topic-${index}`}
                className="block mb-2 font-medium text-gray-700"
              >
                Topic {index + 1}:
              </label>
              <input
                id={`topic-${index}`}
                value={topic}
                onChange={(e) => handleTopicChange(index, e.target.value)}
                placeholder={`Enter topic ${index + 1}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div className="mb-4">
            <label
              htmlFor="difficulty"
              className="block mb-2 font-medium text-gray-700"
            >
              Difficulty Level:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <button
            onClick={generateTest}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Generate Test
          </button>
        </div>
      )}

      {!loading && showTest && (
        <div className="p-6 border border-gray-300 rounded-lg bg-white shadow">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            Generated MCQ Test
          </h2>
          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <p className="font-semibold mb-4 text-gray-800">
                {index + 1}. {question.question}
              </p>
              {question.options.map((option, i) => (
                <div key={i} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    id={`question-${index}-option-${i}`}
                    value={option}
                    className="mr-2"
                    disabled
                  />
                  <label
                    htmlFor={`question-${index}-option-${i}`}
                    className="text-gray-700 cursor-pointer"
                  >
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
