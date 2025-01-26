import { useState, useEffect,useRef } from 'react'
import { allSkills } from '../Features/skillsList'
import MCQTestGenerator from './MCQTestGenerator'
import { Globe, Lock, Upload, X } from "lucide-react";

function CreateSquad() {
  const [squadName, setSquadName] = useState('')
  const [squadDescription, setSquadDescription] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [generatedTest, setGeneratedTest] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  const [topics, setTopics] = useState(['', '', '', ''])
  const [memberLimit, setMemberLimit] = useState(4)
  const [newSkill, setNewSkill] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
    const [preview, setPreview] = useState("");
    const fileInputRef = useRef(null);
    

  useEffect(() => {
    if (newSkill.trim()) {
      const filtered = allSkills.filter(skill => 
        skill.toLowerCase().includes(newSkill.toLowerCase()) &&
        !selectedSkills.includes(skill)
      ).slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [newSkill, selectedSkills])

  const handleSkillSubmit = (e) => {
    e.preventDefault()
    if (newSkill.trim() && !selectedSkills.includes(newSkill.trim())) {
      setSelectedSkills([...selectedSkills, newSkill.trim()])
      setNewSkill('')
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (skill) => {
    setSelectedSkills([...selectedSkills, skill])
    setNewSkill('')
    setShowSuggestions(false)
  }

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove))
  }


  const handleMemberLimitChange = (value) => {
    const newValue = Math.min(Math.max(value, 4), 20)
    setMemberLimit(newValue)
  }


  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Create Squad</h1>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Squad Name</label>
              <input
                type="text"
                value={squadName}
                onChange={(e) => setSquadName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Squad Description</label>
              <textarea
                value={squadDescription}
                onChange={(e) => setSquadDescription(e.target.value)}
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
              <p className="text-sm text-gray-500 mt-1">Min: 4, Max: 20 members</p>
            </div>
          </div>

          <div>
            {/* Project Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Project Image</label>
            <div
              className="relative border-2 border-dashed border-gray-500 rounded-lg p-4 hover:border-blue-500 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
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
                    <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Skills Required</h2>
          <div className="relative">
            <form onSubmit={handleSkillSubmit} className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Type a skill and press Enter"
                className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </form>
            {showSuggestions && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
                {suggestions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSuggestionClick(skill)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {selectedSkills.map(skill => (
              <div
                key={skill}
                className="px-4 py-2 bg-secondary text-white rounded-full flex items-center space-x-2"
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

<div>
<MCQTestGenerator/>
</div>
        {/* <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Generate Test</h2>
          
          <div className="space-y-4">
            {topics.map((topic, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Topic ${index + 1}`}
                value={topic}
                onChange={(e) => handleTopicChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button
            onClick={handleGenerateTest}
            className="mt-4 px-6 py-3 bg-primary hover:bg-opacity-90 text-white rounded-lg font-semibold"
          >
            Generate Test
          </button>
        </div>

        {generatedTest && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Generated Test</h2>
            <pre className="whitespace-pre-wrap">{generatedTest}</pre>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default CreateSquad