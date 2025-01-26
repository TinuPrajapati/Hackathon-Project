import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

const categories = [
  'All', 'Art', 'Music', 'Writing', 'Photography', 'Design',
  'DIY', 'Crafts', 'Digital'
]

const allCards = [
  {
    title: 'Digital Art Creation',
    description: 'Learn how to create stunning digital artwork using modern tools',
    date: '2024-02-20',
    by: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1561740331-ed8242b9d6a4?w=500&auto=format&fit=crop&q=60',
    category: 'Digital'
  },
  {
    title: 'Creative Writing Tips',
    description: 'Master the art of storytelling with these creative writing techniques',
    date: '2024-02-19',
    by: 'James Wilson',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=60',
    category: 'Writing'
  },
  {
    title: 'Photography Basics',
    description: 'Essential photography techniques for beginners',
    date: '2024-02-18',
    by: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&auto=format&fit=crop&q=60',
    category: 'Photography'
  },
  {
    title: 'Music Production',
    description: 'Start your journey in music production with these fundamentals',
    date: '2024-02-17',
    by: 'Michael Brown',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop&q=60',
    category: 'Music'
  },
  {
    title: 'Watercolor Painting',
    description: 'Explore the beautiful world of watercolor painting',
    date: '2024-02-16',
    by: 'Lisa Zhang',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&auto=format&fit=crop&q=60',
    category: 'Art'
  },
  {
    title: 'Graphic Design Principles',
    description: 'Master the fundamental principles of graphic design',
    date: '2024-02-15',
    by: 'Alex Morgan',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60',
    category: 'Design'
  },
  {
    title: 'DIY Home Decor',
    description: 'Create beautiful home decorations with simple materials',
    date: '2024-02-14',
    by: 'Rachel Green',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&auto=format&fit=crop&q=60',
    category: 'DIY'
  },
  {
    title: 'Pottery Workshop',
    description: 'Learn the basics of pottery and ceramic art',
    date: '2024-02-13',
    by: 'David Miller',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&auto=format&fit=crop&q=60',
    category: 'Crafts'
  },
  {
    title: 'Digital Photography',
    description: 'Advanced techniques for digital photography',
    date: '2024-02-12',
    by: 'Chris Taylor',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&auto=format&fit=crop&q=60',
    category: 'Photography'
  },
  // Additional cards
  {
    title: 'Oil Painting Masterclass',
    description: 'Advanced oil painting techniques and color theory',
    date: '2024-02-11',
    by: 'Maria Rodriguez',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60',
    category: 'Art'
  },
  {
    title: 'Digital Marketing Design',
    description: 'Create engaging designs for social media and marketing',
    date: '2024-02-10',
    by: 'Tom Wilson',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&auto=format&fit=crop&q=60',
    category: 'Design'
  },
  {
    title: 'Songwriting Workshop',
    description: 'Learn the craft of writing memorable songs',
    date: '2024-02-09',
    by: 'John Smith',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500&auto=format&fit=crop&q=60',
    category: 'Music'
  }
]

function FindProjects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [visibleCards, setVisibleCards] = useState(9)

  // Filter cards based on search query and selected category
  const filteredCards = allCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.by.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get the cards to display based on the visible count
  const displayedCards = filteredCards.slice(0, visibleCards)

  const loadMore = () => {
    setVisibleCards(prev => prev + 6)
  }

  return (
    <div className="min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-500 mb-2">
          Get Inspired, Create, Inspire Others
        </h1>
      </header>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for inspiration..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-500">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border-2 transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white border-purple-500'
                  : 'bg-white border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Creativity Hub */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-purple-500">Creativity Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
                  <span className="text-sm text-gray-500">{card.date}</span>
                </div>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">By {card.by}</span>
                  <button className="px-4 py-2 rounded-md bg-secondary text-white hover:bg-secondary/90 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {visibleCards < filteredCards.length && (
          <div className="text-center mt-8">
            <button 
              onClick={loadMore}
              className="px-6 py-3 rounded-md bg-purple-500 text-white hover:bg-purple-500/90 transition-colors"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FindProjects