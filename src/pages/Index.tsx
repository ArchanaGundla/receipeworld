
import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Recipe, fetchRecipes, fetchRandomRecipes } from '../data/recipes';
import { Search, Loader2, ChefHat, Globe, Download } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  // Load random recipes on initial load
  useEffect(() => {
    const loadInitialRecipes = async () => {
      setLoading(true);
      try {
        const randomRecipes = await fetchRandomRecipes();
        setRecipes(randomRecipes);
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialRecipes();
  }, []);

  // Handle search
  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      // If search is cleared, reload random recipes
      setLoading(true);
      const randomRecipes = await fetchRandomRecipes();
      setRecipes(randomRecipes);
      setLoading(false);
      return;
    }

    setSearching(true);
    try {
      const searchResults = await fetchRecipes(term);
      setRecipes(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <section className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-6">
              Welcome to RecipeWorld
            </h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto mb-8">
              Discover authentic recipes from around the globe with instant translation 
              into 14+ languages and professional PDF downloads
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div key="authentic" className="flex items-center justify-center space-x-3 bg-white rounded-lg p-4 shadow-md">
                <ChefHat className="w-8 h-8 text-orange-500" />
                <span className="font-semibold text-gray-700">Authentic Recipes</span>
              </div>
              <div key="languages" className="flex items-center justify-center space-x-3 bg-white rounded-lg p-4 shadow-md">
                <Globe className="w-8 h-8 text-orange-500" />
                <span className="font-semibold text-gray-700">14+ Languages</span>
              </div>
              <div key="downloads" className="flex items-center justify-center space-x-3 bg-white rounded-lg p-4 shadow-md">
                <Download className="w-8 h-8 text-orange-500" />
                <span className="font-semibold text-gray-700">PDF Downloads</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes (e.g., chicken, pasta, curry)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 text-lg rounded-full border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-200"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                {searching && (
                  <Loader2 className="absolute right-6 top-1/2 transform -translate-y-1/2 text-orange-500 w-6 h-6 animate-spin" />
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Featured Recipes'}
          </h2>
          <p className="text-gray-600">Discover delicious recipes from our collection</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <span className="ml-2 text-gray-600">Loading delicious recipes...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            
            {recipes.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'No recipes found matching your search.' : 'No recipes available.'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      handleSearch('');
                    }}
                    className="mt-4 text-orange-600 hover:text-orange-700 underline"
                  >
                    Show all recipes
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
