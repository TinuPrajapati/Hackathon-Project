import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = ({text}) => {
    return (
        <div className="relative mb-4 flex items-center">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
                type="text"
                placeholder={text}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border-2 border-yellow-200 outline-none focus:border-none focus:ring-4 focus:ring-sky-400"
            />
        </div>
    )
}

export default SearchBar