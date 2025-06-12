
import React, { useState } from 'react';
import { Recipe } from '../data/recipes';
import { X, Clock, Users, ChefHat, Download, Languages, Loader2 } from 'lucide-react';
import { translateRecipe, supportedLanguages } from '../utils/translation';
import { downloadRecipe } from '../utils/download';
import { toast } from 'sonner';

interface RecipeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, isOpen, onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translatedRecipe, setTranslatedRecipe] = useState<Recipe | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const currentRecipe = translatedRecipe || recipe;

  const handleTranslate = async (languageCode: string) => {
    if (languageCode === 'en') {
      setTranslatedRecipe(null);
      setSelectedLanguage('en');
      return;
    }

    setIsTranslating(true);
    console.log(`Translating recipe to ${languageCode}`);

    try {
      const translated = await translateRecipe(recipe, languageCode);
      setTranslatedRecipe(translated);
      setSelectedLanguage(languageCode);
      
      const language = supportedLanguages.find(l => l.code === languageCode);
      toast.success(`Recipe translated to ${language?.name || languageCode}`);
    } catch (error) {
      console.error('Translation failed:', error);
      toast.error('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDownload = async (format: 'txt' | 'pdf') => {
    setIsDownloading(true);
    
    try {
      await downloadRecipe(currentRecipe, format, selectedLanguage);
      toast.success(`Recipe downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative h-64 bg-gradient-to-br from-orange-400 to-amber-500">
          <img 
            src={currentRecipe.image} 
            alt={currentRecipe.title}
            className="w-full h-full object-cover mix-blend-multiply"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-bold mb-2">{currentRecipe.title}</h2>
            <p className="text-white/90">{currentRecipe.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Languages className="w-5 h-5 text-gray-600" />
              <select
                value={selectedLanguage}
                onChange={(e) => handleTranslate(e.target.value)}
                disabled={isTranslating}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none min-w-[140px]"
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              {isTranslating && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Translating...</span>
                </div>
              )}
            </div>

            {/* Download Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleDownload('txt')}
                disabled={isDownloading || isTranslating}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span>Download TXT</span>
              </button>
              <button
                onClick={() => handleDownload('pdf')}
                disabled={isDownloading || isTranslating}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
                {isDownloading && <Loader2 className="w-4 h-4 animate-spin" />}
              </button>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Prep Time</p>
                <p className="font-medium">{currentRecipe.prepTime}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Cook Time</p>
                <p className="font-medium">{currentRecipe.cookTime}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Servings</p>
                <p className="font-medium">{currentRecipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Difficulty</p>
                <p className="font-medium">{currentRecipe.difficulty}</p>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {currentRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-xl font-bold mb-3">Instructions</h3>
            <ol className="space-y-3">
              {currentRecipe.instructions.map((instruction, index) => (
                <li key={index} className="flex space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
