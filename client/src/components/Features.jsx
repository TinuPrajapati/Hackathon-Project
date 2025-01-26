import React from 'react';
import { Brain, Users, Target } from 'lucide-react';

const features = [
  { icon: <Brain className="h-12 w-12 text-indigo-600 mb-4" />, title: "AI Skill Analysis", description: "Advanced algorithms analyze skill gaps and recommend perfect matches." },
  { icon: <Users className="h-12 w-12 text-indigo-600 mb-4" />, title: "Team Building", description: "Create balanced teams based on complementary skills and experience." },
  { icon: <Target className="h-12 w-12 text-indigo-600 mb-4" />, title: "Project Matching", description: "Match projects with the most suitable team members automatically." }
];

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm transform hover:scale-105 transition-transform">
          {feature.icon}
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
