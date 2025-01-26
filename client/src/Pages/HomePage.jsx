import React from 'react'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import RecommendedTeammates from '../components/RecommendedTeammates'
import RecommendedSquads from '../components/RecommendedSquads'

const HomePage = () => {
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
    <div className='py-5 mt-20'>
      <HeroSection />
      <Features />
      <RecommendedSquads />
      {/* <RecommendedTeammates filteredTeammates={allTeammates} /> */}
    </div>
  )
}

export default HomePage