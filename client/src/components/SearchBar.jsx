import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-2xl mx-auto mb-10">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, skills, or location..."
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-500 focus:border-[#7000f0] focus:bg-white focus:ring-2 focus:ring-[#7000f0] focus:ring-opacity-20 outline-none transition-all"
      />
    </div>
  );
}

export default SearchBar
