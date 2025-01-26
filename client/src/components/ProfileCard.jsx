import React from 'react';
import { MessageSquare, UserPlus, Award } from 'lucide-react';

export function ProfileCard({ profile }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <div className="flex gap-6 mb-4">
        <div className="relative flex-shrink-0">
          <img
            src={profile.imageUrl}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
            profile.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
          <p className="text-gray-600">{profile.groupName || 'No Group'}</p>
          {profile.seekingGroup && (
            <div className="bg-purple-100 text-[#7000f0] text-sm py-1 px-3 rounded-full inline-block mt-2">
              Seeking Group
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4">{profile.bio}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {profile.tags.map((tag) => (
          <span
            key={tag}
            className="bg-[#d24df7] bg-opacity-10 text-[#7000f0] text-sm py-1 px-3 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {profile.achievements.map((achievement) => (
          <div
            key={achievement}
            className="flex items-center text-sm text-gray-600"
          >
            <Award className="w-4 h-4 mr-1 text-[#d24df7]" />
            {achievement}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-[#7000f0] text-white py-2 px-4 rounded-lg hover:bg-[#6000d0] transition-colors flex items-center justify-center gap-2">
          <UserPlus className="w-4 h-4" />
          Connect
        </button>
        <button className="flex-1 border border-[#7000f0] text-[#7000f0] py-2 px-4 rounded-lg hover:bg-[#7000f0] hover:text-white transition-colors flex items-center justify-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Message
        </button>
      </div>
    </div>
  );
}