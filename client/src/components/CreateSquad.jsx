import { useState, useEffect } from 'react'
import { allSkills } from '../Features/skillsList'

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

  const handleTopicChange = (index, value) => {
    const newTopics = [...topics]
    newTopics[index] = value
    setTopics(newTopics)
  }

  const handleMemberLimitChange = (value) => {
    const newValue = Math.min(Math.max(value, 4), 20)
    setMemberLimit(newValue)
  }

  const handleGenerateTest = () => {
    const test = `Generated test for ${squadName}:\n\nTopics:\n${topics.filter(t => t).map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\nDifficulty: ${difficulty}\n\nRequired Skills: ${selectedSkills.join(', ')}\n\nMember Limit: ${memberLimit}`
    setGeneratedTest(test)
  }

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
            <label className="block text-gray-700 font-semibold mb-2">Squad Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {imageUrl && (
              <div className="mt-4 border rounded-lg overflow-hidden h-48">
                <img src={imageUrl} alt="Squad" className="w-full h-full object-cover" />
              </div>
            )}
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

        <div className="mt-8">
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
        )}
      </div>
    </div>
  )
}

export default CreateSquad