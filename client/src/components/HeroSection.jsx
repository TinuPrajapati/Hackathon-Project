import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';

const HeroSection = () => {
  const [showFilters, setShowFilters] = React.useState(false);
  const allSkills = ['React', 'Node.js', 'Python', 'Figma', 'User Research', 'Prototyping', 'Machine Learning', 'Data Analysis'];
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
        <SearchBar/>
        <button
          className="flex items-center mx-auto space-x-2 text-indigo-600 hover:text-indigo-700"
          onClick={() => setShowFilters(!showFilters)}
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
                    // onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm 
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
                // value={minSkillLevel}
                // onChange={(e) => setMinSkillLevel(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-sm text-gray-600 text-center mt-1">
                minSkillLevel%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
