
export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  image: string;
  category: string;
  area: string;
  youtubeUrl?: string;
  sourceUrl?: string;
}

export interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
}

export const transformMealDBRecipe = (meal: MealDBRecipe): Recipe => {
  // Extract ingredients from the MealDB format
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      const fullIngredient = measure && measure.trim() 
        ? `${measure.trim()} ${ingredient.trim()}`
        : ingredient.trim();
      ingredients.push(fullIngredient);
    }
  }

  // Split instructions into steps
  const instructions = meal.strInstructions
    .split(/\r?\n/)
    .filter(step => step.trim().length > 0)
    .map(step => step.trim());

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    description: `A delicious ${meal.strArea} ${meal.strCategory.toLowerCase()} dish`,
    cuisine: meal.strArea,
    prepTime: "15 mins", // Default values since MealDB doesn't provide these
    cookTime: "30 mins",
    servings: 4,
    difficulty: 'Medium',
    ingredients,
    instructions,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    youtubeUrl: meal.strYoutube,
    sourceUrl: meal.strSource
  };
};

// API service for fetching recipes
export const fetchRecipes = async (searchTerm: string = ''): Promise<Recipe[]> => {
  try {
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    if (searchTerm) {
      url += encodeURIComponent(searchTerm);
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.meals) {
      return data.meals.map(transformMealDBRecipe);
    }
    return [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const fetchRandomRecipes = async (): Promise<Recipe[]> => {
  try {
    const promises = Array(12).fill(null).map(() => 
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
    );
    
    const results = await Promise.all(promises);
    const recipes = results
      .filter(data => data.meals && data.meals[0])
      .map(data => transformMealDBRecipe(data.meals[0]));
    
    return recipes;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
};
