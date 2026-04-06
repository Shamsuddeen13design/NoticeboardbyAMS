const SearchFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  const categories = ['All', 'Academic', 'Events', 'General'];
  const categoryEmojis = {
    'All': '📋',
    'Academic': '🎓',
    'Events': '🎉',
    'General': '📢',
  };

  return (
    <div className="card mb-8 border-t-4 border-teal-500">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            🔍 Search Announcements
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or content..."
            className="input-field text-base"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            📂 Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {categoryEmojis[category]} {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;