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

  const allTeammates = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Full Stack Developer",
      skills: [
        { name: "React", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 }
      ],
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200",
      availability: 80
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "UI/UX Designer",
      skills: [
        { name: "Figma", level: 95 },
        { name: "User Research", level: 88 },
        { name: "Prototyping", level: 92 }
      ],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
      availability: 60
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Data Scientist",
      skills: [
        { name: "Python", level: 95 },
        { name: "Machine Learning", level: 92 },
        { name: "Data Analysis", level: 88 }
      ],
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
      availability: 100
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Features />
        <RecommendedTeammates filteredTeammates={allTeammates} />
      </main>
    </div>
  );
}

export default App;
