import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = ({text}) => {
    return (
        <div className="relative mb-4 flex items-center">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
                type="text"
                placeholder={text}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-lg outline-none border-2 border-gray-300 focus:border-none focus:ring-2 focus:ring-purple-500"
            />
        </div>
    )
}

export default SearchBar