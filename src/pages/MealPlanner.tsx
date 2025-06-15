
import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Clock, Users, ChefHat } from 'lucide-react';
import { Recipe, fetchRandomRecipes } from '../data/recipes';
import { toast } from 'sonner';

interface MealPlan {
  id: string;
  date: string;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
  };
}

const MealPlanner = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableRecipes, setAvailableRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRandomRecipes = async () => {
    setLoading(true);
    try {
      const recipes = await fetchRandomRecipes();
      setAvailableRecipes(recipes);
    } catch (error) {
      console.error('Failed to load recipes:', error);
      toast.error('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadRandomRecipes();
  }, []);

  const addMealToPlan = (mealType: 'breakfast' | 'lunch' | 'dinner', recipe: Recipe) => {
    const existingPlanIndex = mealPlans.findIndex(plan => plan.date === selectedDate);
    
    if (existingPlanIndex >= 0) {
      const updatedPlans = [...mealPlans];
      updatedPlans[existingPlanIndex].meals[mealType] = recipe;
      setMealPlans(updatedPlans);
    } else {
      const newPlan: MealPlan = {
        id: Date.now().toString(),
        date: selectedDate,
        meals: { [mealType]: recipe }
      };
      setMealPlans([...mealPlans, newPlan]);
    }
    
    toast.success(`${recipe.title} added to ${mealType}!`);
  };

  const removeMealFromPlan = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const existingPlanIndex = mealPlans.findIndex(plan => plan.date === selectedDate);
    
    if (existingPlanIndex >= 0) {
      const updatedPlans = [...mealPlans];
      delete updatedPlans[existingPlanIndex].meals[mealType];
      
      // Remove the entire plan if no meals left
      if (Object.keys(updatedPlans[existingPlanIndex].meals).length === 0) {
        updatedPlans.splice(existingPlanIndex, 1);
      }
      
      setMealPlans(updatedPlans);
      toast.success('Meal removed from plan');
    }
  };

  const getCurrentPlan = () => {
    return mealPlans.find(plan => plan.date === selectedDate);
  };

  const currentPlan = getCurrentPlan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Interactive Meal Planner
          </h1>
          <p className="text-gray-600 text-lg">Plan your meals for the week with our interactive planner</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Date Selection and Meal Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold">Meal Plan</h2>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
              />
            </div>

            <div className="space-y-6">
              {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                <div key={mealType} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold capitalize">{mealType}</h3>
                    {currentPlan?.meals[mealType as keyof typeof currentPlan.meals] && (
                      <button
                        onClick={() => removeMealFromPlan(mealType as 'breakfast' | 'lunch' | 'dinner')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {currentPlan?.meals[mealType as keyof typeof currentPlan.meals] ? (
                    <div className="flex items-center space-x-3">
                      <img
                        src={currentPlan.meals[mealType as keyof typeof currentPlan.meals]?.image}
                        alt={currentPlan.meals[mealType as keyof typeof currentPlan.meals]?.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{currentPlan.meals[mealType as keyof typeof currentPlan.meals]?.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{currentPlan.meals[mealType as keyof typeof currentPlan.meals]?.prepTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{currentPlan.meals[mealType as keyof typeof currentPlan.meals]?.servings}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">
                      <Plus className="w-8 h-8 mx-auto mb-2" />
                      <p>No meal planned</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Recipes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <ChefHat className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold">Available Recipes</h2>
              </div>
              <button
                onClick={loadRandomRecipes}
                disabled={loading}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {availableRecipes.map((recipe) => (
                <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{recipe.title}</h4>
                      <p className="text-sm text-gray-500">{recipe.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                      <button
                        key={mealType}
                        onClick={() => addMealToPlan(mealType as 'breakfast' | 'lunch' | 'dinner', recipe)}
                        className="flex-1 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        Add to {mealType}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
