
import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../data/recipes';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              Recipe Collection
            </h1>
            <p className="text-gray-600 text-lg">Discover delicious recipes from around the world</p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search recipes or cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200"
            />
          </div>
        </div>
      </header>

      {/* Recipe Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recipes found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
