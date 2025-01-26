import { useState, useEffect, useRef } from "react";
import { allSkills } from "../Features/skillsList"; // Ensure this contains the list of skills
import MCQTestGenerator from "./MCQTestGenerator"; // Assuming this is your test generator component
import { Upload, X } from "lucide-react";

function CreateSquad() {
  const [squadName, setSquadName] = useState("");
  const [squadDescription, setSquadDescription] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [memberLimit, setMemberLimit] = useState(4);
  const [newSkill, setNewSkill] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [preview, setPreview] = useState("");
  const [generatedTest, setGeneratedTest] = useState(null);
  const [loading, setLoading] = useState(false); // API call loading state
  const [message, setMessage] = useState(null); // Feedback message from API
  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  // Filter skill suggestions dynamically
  useEffect(() => {
    if (newSkill.trim()) {
      const filtered = allSkills
        .filter(
          (skill) =>
            skill.toLowerCase().includes(newSkill.toLowerCase()) &&
            !selectedSkills.includes(skill)
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [newSkill, selectedSkills]);

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !selectedSkills.includes(newSkill.trim())) {
      setSelectedSkills([...selectedSkills, newSkill.trim()]);
      setNewSkill("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    setNewSkill("");
    setShowSuggestions(false);
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToRemove));
  };

  const handleMemberLimitChange = (value) => {
    const newValue = Math.min(Math.max(value, 4), 20);
    setMemberLimit(newValue);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const createSquad = async () => {
    const squadData = {
      squadName,
      squadDescription,
      selectedSkills,
      memberLimit,
      image: preview,
      generatedTest,
    };

    // Ensure all required fields are provided
    if (!squadName || !squadDescription) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true); // Start loading
    setMessage(null); // Clear previous messages

    try {
      const response = await fetch(`${API_URL}/api/squads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(squadData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Squad created successfully!");
        // Clear form after successful submission
        setSquadName("");
        setSquadDescription("");
        setSelectedSkills([]);
        setMemberLimit(4);
        setPreview("");
        setGeneratedTest(null);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating squad:", error);
      setMessage("An error occurred while creating the squad.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Create Squad</h1>

        {/* Squad Info */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Squad Name</label>
              <input
                type="text"
                value={squadName}
                onChange={(e) => setSquadName(e.target.value)}
                placeholder="Enter squad name"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Squad Description</label>
              <textarea
                value={squadDescription}
                onChange={(e) => setSquadDescription(e.target.value)}
                placeholder="Enter squad description"
                className="w-full p-2 border border-gray-300 rounded h-32 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Member Limit (4-20)</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleMemberLimitChange(memberLimit - 1)}
                  className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                >
                  -
                </button>
                <input
                  type="number"
                  min="4"
                  max="20"
                  value={memberLimit}
                  onChange={(e) => handleMemberLimitChange(parseInt(e.target.value) || 4)}
                  className="w-20 p-2 text-center border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={() => handleMemberLimitChange(memberLimit + 1)}
                  className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Project Image */}
          <div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Image</label>
              <div className="relative border-2 border-dashed border-gray-500 rounded-lg p-4 hover:border-blue-500 transition-colors">
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md border border-gray-500"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer text-sm text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image-upload"
                          name="image"
                          type="file"
                          ref={fileInputRef}
                          className="sr-only outline-none"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Skills Required</h2>
          <form onSubmit={handleSkillSubmit} className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Type a skill and press Enter"
              className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </form>
          <div className="flex flex-wrap gap-3">
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                className="px-4 py-2 bg-purple-500 text-white rounded-full flex items-center space-x-2"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-gray-200 focus:outline-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* MCQ Test Generator */}
        <div className="mt-8">
          <MCQTestGenerator onGenerate={(data) => setGeneratedTest(data)} />
        </div>

        {/* Create Squad Button */}
        <div className="mt-8">
          <button
            onClick={createSquad}
            className={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating Squad..." : "Create A Squad"}
          </button>
        </div>

        {/* Feedback Message */}
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
}

export default CreateSquad;
