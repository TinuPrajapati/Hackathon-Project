import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import RecommendedTeammates from './components/RecommendedTeammates';
// import teammatesData from './data/teammatesData';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [minSkillLevel, setMinSkillLevel] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // const allSkills = useMemo(() => {
  //   return [...new Set(teammatesData.flatMap(teammate => teammate.skills.map(skill => skill.name)))];
  // }, []);

  const filteredTeammates = useMemo(() => {
    return teammatesData
      .map(teammate => {
        const matchScore = selectedSkills.length === 0 ? 100 :
          Math.round(teammate.skills.filter(skill => selectedSkills.includes(skill.name) && skill.level >= minSkillLevel).length / selectedSkills.length * 100);
        return { ...teammate, matchScore };
      })
      .filter(teammate =>
        (teammate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         teammate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
         teammate.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))) &&
        (selectedSkills.length === 0 || teammate.matchScore > 0)
      )
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [searchQuery, selectedSkills, minSkillLevel]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          allSkills={allSkills}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          minSkillLevel={minSkillLevel}
          setMinSkillLevel={setMinSkillLevel}
        />
        <Features />
        <RecommendedTeammates filteredTeammates={filteredTeammates} />
      </main>
    </div>
  );
}

export default App;
