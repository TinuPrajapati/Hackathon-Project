import React from 'react';
import { MessageSquare, UserPlus } from 'lucide-react';
import {Link} from 'react-router-dom';

export function ProfileCard({ profile }) {
  return (
    <Link to={'/user_profile/tinu'} className="bg-gray-50 rounded-2xl shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="flex items-center mb-6 gap-4">
        <div className="relative w-28 h-28">
          <img
            src={profile.imageUrl}
            alt={profile.name}
            className="w-full h-full rounded-full object-cover border-4 border-purple-200"
          />
          <span
            className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white shadow-md ${
              profile.isOnline ? 'bg-green-400' : 'bg-gray-400'
            }`}
          ></span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{profile.name}</h3>
          <p className="text-sm text-gray-500">{profile.groupName || 'No Group'}</p>
          {profile.seekingGroup && (
            <span className="mt-2 bg-purple-100 text-purple-600 text-xs font-medium py-1 px-3 rounded-full">
              Seeking Group
            </span>
          )}
        </div>
      </div>

      <p className="text-left text-gray-700 mb-4">{profile.bio}</p>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {profile.tags.map((tag) => (
          <span
            key={tag}
            className="bg-purple-200 text-purple-800 text-xs font-medium py-1 px-3 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button className="flex items-center justify-center gap-2 bg-purple-600 text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:bg-purple-500 transition-colors">
          <UserPlus className="w-5 h-5" />
          Connect
        </button>
        <button className="flex items-center justify-center gap-2 border border-purple-600 text-purple-600 text-sm font-medium py-2 px-6 rounded-full shadow-md hover:bg-purple-600 hover:text-white transition-colors">
          <MessageSquare className="w-5 h-5" />
          Message
        </button>
      </div>
    </Link>
  );
}
