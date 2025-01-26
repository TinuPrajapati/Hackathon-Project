import React, { useState } from "react";

const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

const MCQTestGenerator = () => {
  const [topics, setTopics] = useState(["", "", "", ""]);
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state

  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers({ ...answers, [questionIndex]: selectedOption });
  };

  const generateTest = async () => {
    setLoading(true); // Show loader
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
      setResults(null); // Reset results when generating a new test
    } catch (error) {
      console.error("Error generating test:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const submitTest = async () => {
    setLoading(true); // Show loader
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/submit-answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: Object.values(answers), questions }),
      });
      const data = await response.json();
      setResults(data); // Store results after submission
    } catch (error) {
      console.error("Error submitting test:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">MCQ Test Generator</h1>

      {loading && <Loader />} {/* Show loader if loading */}

      {!loading && !showTest && (
        <div className="p-6 border border-gray-300 rounded-lg mb-6 bg-white shadow">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Enter Topics and Difficulty</h2>

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
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Your MCQ Test</h2>
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
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                    className="mr-2"
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

          <button
            onClick={submitTest}
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mt-4"
          >
            Submit Test
          </button>
        </div>
      )}

      {!loading && results && (
        <div className="p-6 border border-gray-300 rounded-lg mt-6 bg-white shadow">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Test Results</h2>
          <p className="font-bold text-gray-800 mb-4">Your Score: {results.score}</p>
        </div>
      )}
    </div>
  );
};

export default MCQTestGenerator;
