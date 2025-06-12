
import React, { useState } from 'react';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { Recipe, fetchRecipes } from '../data/recipes';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const results = await fetchRecipes(searchTerm);
      setRecipes(results);
    } catch (error) {
      console.error('Search failed:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-6">
            Search Recipes
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Discover your next favorite dish from thousands of recipes
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for recipes (e.g., chicken curry, pasta, desserts)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 text-lg rounded-full border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-200"
              />
              <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <button
                type="submit"
                disabled={loading || !searchTerm.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-2 rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <span className="ml-2 text-gray-600">Searching recipes...</span>
          </div>
        )}

        {hasSearched && !loading && (
          <>
            {recipes.length > 0 ? (
              <>
                <div className="text-center mb-8">
                  <p className="text-gray-600">
                    Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} for "{searchTerm}"
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  No recipes found for "{searchTerm}"
                </p>
                <p className="text-gray-400">
                  Try searching for different ingredients or dish names
                </p>
              </div>
            )}
          </>
        )}

        {/* Search Suggestions */}
        {!hasSearched && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Searches</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Chicken', 'Pasta', 'Vegetarian', 'Dessert', 'Soup', 'Salad', 'Beef', 'Seafood'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchTerm(term);
                    handleSearch({ preventDefault: () => {} } as React.FormEvent);
                  }}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 text-center hover:bg-orange-50 border-2 border-transparent hover:border-orange-200"
                >
                  <span className="font-medium text-gray-700">{term}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
