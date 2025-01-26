import React, { useEffect, useState } from 'react';
import { Users, Sliders } from 'lucide-react';
import { ProfileCard } from '../components/ProfileCard';
import { SearchBar } from '../components/SearchBar';
import axios from 'axios';
import Cookies from 'js-cookie'

function FindMember() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('activity');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [userData, setUserData] = useState([]); // To store the users fetched from API

  const allTags = Array.from(
    new Set(userData.flatMap((profile) => profile.tags))
  );

  const filteredProfiles = userData
    .filter((profile) => {
      if (showOnlineOnly && !profile.isOnline) return false;
      if (selectedTags.length > 0 && !profile.tags.some((tag) => selectedTags.includes(tag)))
        return false;
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          profile.name.toLowerCase().includes(searchLower) ||
          profile.bio.toLowerCase().includes(searchLower) ||
          profile.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
    });

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/all`,
        {
          headers: {
            'Authorization': 'Bearer ' + Cookies.get('name')
          },
          withCredentials: true
        }
      );
      setUserData(response.data); // Set the fetched user data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen mt-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7000f0] to-[#d24df7] text-white py-16 px-4 rounded-3xl">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Users className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Team
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Connect with like-minded professionals and build something amazing together
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">Filters:</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#7000f0] outline-none"
          >
            <option value="activity">Sort by Activity</option>
            <option value="name">Sort by Name</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="rounded text-[#7000f0] focus:ring-[#7000f0]"
            />
            Online Only
          </label>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTags((prev) =>
                    prev.includes(tag)
                      ? prev.filter((t) => t !== tag)
                      : [...prev, tag]
                  )
                }
                className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTags.includes(tag)
                    ? 'bg-[#7000f0] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        {/* {filteredProfiles.some((p) => p.achievements.length > 0) && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles
                .slice(0, 3)
                .map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
            </div>
          </div>
        )} */}

        {/* All Profiles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindMember;
