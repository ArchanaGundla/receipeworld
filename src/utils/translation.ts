
import { Recipe } from '../data/recipes';

// This is a mock translation function. In a real app, you would use a service like Google Translate API
export const translateText = async (recipe: Recipe, targetLanguage: string): Promise<Recipe> => {
  console.log(`Translating recipe "${recipe.title}" to ${targetLanguage}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock translations for demonstration
  const translations: Record<string, Partial<Recipe>> = {
    'hi': {
      title: getHindiTranslation(recipe.title),
      description: `${recipe.description} (हिंदी में अनुवादित)`,
      ingredients: recipe.ingredients.map(ing => `${ing} (हिंदी)`),
      instructions: recipe.instructions.map(inst => `${inst} (हिंदी में)`),
    },
    'ta': {
      title: getTamilTranslation(recipe.title),
      description: `${recipe.description} (தமிழில் மொழிபெயர்க்கப்பட்டது)`,
      ingredients: recipe.ingredients.map(ing => `${ing} (தமிழ்)`),
      instructions: recipe.instructions.map(inst => `${inst} (தமிழில்)`),
    },
    'fr': {
      title: getFrenchTranslation(recipe.title),
      description: `${recipe.description} (traduit en français)`,
      ingredients: recipe.ingredients.map(ing => `${ing} (français)`),
      instructions: recipe.instructions.map(inst => `${inst} (en français)`),
    },
    'es': {
      title: getSpanishTranslation(recipe.title),
      description: `${recipe.description} (traducido al español)`,
      ingredients: recipe.ingredients.map(ing => `${ing} (español)`),
      instructions: recipe.instructions.map(inst => `${inst} (en español)`),
    },
    'de': {
      title: getGermanTranslation(recipe.title),
      description: `${recipe.description} (ins Deutsche übersetzt)`,
      ingredients: recipe.ingredients.map(ing => `${ing} (deutsch)`),
      instructions: recipe.instructions.map(inst => `${inst} (auf deutsch)`),
    }
  };

  const translatedData = translations[targetLanguage];
  if (!translatedData) {
    throw new Error(`Translation not supported for language: ${targetLanguage}`);
  }

  return {
    ...recipe,
    ...translatedData
  } as Recipe;
};

// Mock translation functions
const getHindiTranslation = (title: string): string => {
  const hindiTitles: Record<string, string> = {
    'Classic Margherita Pizza': 'क्लासिक मार्गेरिटा पिज़्ज़ा',
    'Butter Chicken': 'बटर चिकन',
    'French Onion Soup': 'फ्रेंच प्याज़ का सूप',
    'Chicken Tacos': 'चिकन टैकोस'
  };
  return hindiTitles[title] || title;
};

const getTamilTranslation = (title: string): string => {
  const tamilTitles: Record<string, string> = {
    'Classic Margherita Pizza': 'கிளாசிக் மார்கெரிட்டா பிட்சா',
    'Butter Chicken': 'பட்டர் சிக்கன்',
    'French Onion Soup': 'பிரஞ்சு வெங்காய சூப்',
    'Chicken Tacos': 'சிக்கன் டாகோஸ்'
  };
  return tamilTitles[title] || title;
};

const getFrenchTranslation = (title: string): string => {
  const frenchTitles: Record<string, string> = {
    'Classic Margherita Pizza': 'Pizza Margherita Classique',
    'Butter Chicken': 'Poulet au Beurre',
    'French Onion Soup': 'Soupe à l\'Oignon Française',
    'Chicken Tacos': 'Tacos au Poulet'
  };
  return frenchTitles[title] || title;
};

const getSpanishTranslation = (title: string): string => {
  const spanishTitles: Record<string, string> = {
    'Classic Margherita Pizza': 'Pizza Margarita Clásica',
    'Butter Chicken': 'Pollo con Mantequilla',
    'French Onion Soup': 'Sopa de Cebolla Francesa',
    'Chicken Tacos': 'Tacos de Pollo'
  };
  return spanishTitles[title] || title;
};

const getGermanTranslation = (title: string): string => {
  const germanTitles: Record<string, string> = {
    'Classic Margherita Pizza': 'Klassische Margherita Pizza',
    'Butter Chicken': 'Butter Hühnchen',
    'French Onion Soup': 'Französische Zwiebelsuppe',
    'Chicken Tacos': 'Hühnchen Tacos'
  };
  return germanTitles[title] || title;
};
