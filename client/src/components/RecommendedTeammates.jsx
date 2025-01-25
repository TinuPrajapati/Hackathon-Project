import React from 'react';
import { Award } from 'lucide-react';

const RecommendedTeammates = ({ filteredTeammates }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
      <h3 className="text-2xl font-bold mb-6">Recommended Teammates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeammates.map(teammate => (
          <div key={teammate.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-indigo-500">
            <img src={teammate.image} alt={teammate.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h4 className="text-lg font-semibold">{teammate.name}</h4>
              <p className="text-gray-600">{teammate.role}</p>
              <span className="text-sm font-medium text-green-600">{teammate.matchScore}% match</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTeammates;
