
import { Recipe } from '../data/recipes';

export interface TranslationLanguage {
  code: string;
  name: string;
  flag: string;
}

export const supportedLanguages: TranslationLanguage[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' }
];

// LibreTranslate API endpoint (you can use their public instance or set up your own)
const LIBRE_TRANSLATE_API = 'https://libretranslate.de/translate';

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  if (targetLanguage === 'en') return text;
  
  try {
    const response = await fetch(LIBRE_TRANSLATE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: targetLanguage,
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error('Translation error:', error);
    // Fallback to original text if translation fails
    return text;
  }
};

export const translateRecipe = async (recipe: Recipe, targetLanguage: string): Promise<Recipe> => {
  if (targetLanguage === 'en') {
    return recipe;
  }

  console.log(`Translating recipe "${recipe.title}" to ${targetLanguage}`);

  try {
    // Translate all text fields
    const [translatedTitle, translatedDescription, ...translatedIngredients] = await Promise.all([
      translateText(recipe.title, targetLanguage),
      translateText(recipe.description, targetLanguage),
      ...recipe.ingredients.map(ingredient => translateText(ingredient, targetLanguage))
    ]);

    // Translate instructions
    const translatedInstructions = await Promise.all(
      recipe.instructions.map(instruction => translateText(instruction, targetLanguage))
    );

    // Translate cuisine and category if needed
    const translatedCuisine = await translateText(recipe.cuisine, targetLanguage);
    
    return {
      ...recipe,
      title: translatedTitle,
      description: translatedDescription,
      cuisine: translatedCuisine,
      ingredients: translatedIngredients,
      instructions: translatedInstructions
    };
  } catch (error) {
    console.error('Failed to translate recipe:', error);
    throw new Error(`Translation failed for ${recipe.title}`);
  }
};
