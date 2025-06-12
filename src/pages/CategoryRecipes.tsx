
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { Recipe, transformMealDBRecipe } from '../data/recipes';

interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
}

const CategoryRecipes: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      if (!category) return;
      
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        
        if (data.meals) {
          // Fetch detailed recipe data for each meal
          const detailedRecipes = await Promise.all(
            data.meals.slice(0, 12).map(async (meal: any) => {
              const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
              const detailData = await detailResponse.json();
              return detailData.meals ? transformMealDBRecipe(detailData.meals[0]) : null;
            })
          );
          
          setRecipes(detailedRecipes.filter(recipe => recipe !== null) as Recipe[]);
        }
      } catch (error) {
        console.error('Error fetching category recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryRecipes();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <span className="text-gray-600">Loading {category} recipes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            to="/categories" 
            className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Categories</span>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            {category} Recipes
          </h1>
          <p className="text-gray-600 text-lg">
            Discover delicious {category?.toLowerCase()} recipes from around the world
          </p>
        </div>

        {/* Recipe Grid */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No {category} recipes found.</p>
            <Link
              to="/categories"
              className="mt-4 text-orange-600 hover:text-orange-700 underline"
            >
              Browse other categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryRecipes;
