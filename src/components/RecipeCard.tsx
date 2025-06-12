
import React, { useState } from 'react';
import { Recipe } from '../data/recipes';
import { Clock, Users, ChefHat } from 'lucide-react';
import RecipeModal from './RecipeModal';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Recipe Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
          </div>

          {/* Recipe Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.prepTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <ChefHat className="w-4 h-4" />
              <span>{recipe.cuisine}</span>
            </div>
          </div>

          {/* View Recipe Button */}
          <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-200 transform hover:scale-105">
            View Recipe
          </button>
        </div>
      </div>

      <RecipeModal 
        recipe={recipe}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default RecipeCard;
