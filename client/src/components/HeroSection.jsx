import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';

const HeroSection = ({ 
  searchQuery, setSearchQuery, showFilters, setShowFilters, 
  allSkills, selectedSkills, setSelectedSkills, minSkillLevel, setMinSkillLevel 
}) => {
  const toggleSkill = (skill) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center space-x-2 mb-4">
        <Sparkles className="h-6 w-6 text-indigo-600" />
        <span className="text-sm font-semibold text-indigo-600 tracking-wider uppercase">AI-Powered Team Building</span>
      </div>
      <h2 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
        Unlock Your Team's 
        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"> Full Potential</span>
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Our AI analyzes skills, experience, and compatibility to create your perfect dream team.
      </p>
      <div className="max-w-2xl mx-auto">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for skills, roles, or team members..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center mx-auto space-x-2 text-indigo-600 hover:text-indigo-700"
        >
          <Filter className="h-4 w-4" />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>

        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSkills.includes(skill) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Minimum Skill Level</h4>
              <input
                type="range"
                min="0"
                max="100"
                value={minSkillLevel}
                onChange={(e) => setMinSkillLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-sm text-gray-600 text-center mt-1">
                {minSkillLevel}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
