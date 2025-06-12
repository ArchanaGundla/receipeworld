
import { jsPDF } from 'jspdf';
import { Recipe } from '../data/recipes';
import { supportedLanguages } from './translation';

export const downloadRecipe = async (recipe: Recipe, format: 'txt' | 'pdf', languageCode: string) => {
  const language = supportedLanguages.find(lang => lang.code === languageCode);
  const languageName = language?.name || 'English';
  
  console.log(`Downloading recipe "${recipe.title}" as ${format} in ${languageName}`);

  if (format === 'txt') {
    downloadAsTxt(recipe, languageName);
  } else {
    downloadAsPdf(recipe, languageName);
  }
};

const downloadAsTxt = (recipe: Recipe, languageName: string) => {
  const content = formatRecipeForText(recipe, languageName);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${languageName.toLowerCase()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const downloadAsPdf = (recipe: Recipe, languageName: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont(undefined, 'bold');
    } else {
      pdf.setFont(undefined, 'normal');
    }
    
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * (fontSize * 0.5) + 5;
    
    // Check if we need a new page
    if (yPosition > pdf.internal.pageSize.height - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Title
  addText(recipe.title, 20, true);
  yPosition += 5;

  // Description
  addText(recipe.description, 12);
  yPosition += 5;

  // Recipe Info
  addText(`Cuisine: ${recipe.cuisine} | Category: ${recipe.category} | Prep Time: ${recipe.prepTime} | Cook Time: ${recipe.cookTime} | Servings: ${recipe.servings} | Difficulty: ${recipe.difficulty}`, 10);
  yPosition += 10;

  // Ingredients
  addText('Ingredients:', 16, true);
  yPosition += 2;
  
  recipe.ingredients.forEach((ingredient, index) => {
    addText(`${index + 1}. ${ingredient}`, 11);
  });
  yPosition += 10;

  // Instructions
  addText('Instructions:', 16, true);
  yPosition += 2;
  
  recipe.instructions.forEach((instruction, index) => {
    addText(`${index + 1}. ${instruction}`, 11);
    yPosition += 3;
  });

  // Footer
  yPosition += 10;
  addText(`Recipe translated to ${languageName}`, 8);
  addText(`Generated on ${new Date().toLocaleDateString()}`, 8);

  // Download
  pdf.save(`${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${languageName.toLowerCase()}.pdf`);
};

const formatRecipeForText = (recipe: Recipe, languageName: string): string => {
  let content = '';
  
  content += `${recipe.title}\n`;
  content += '='.repeat(recipe.title.length) + '\n\n';
  
  content += `${recipe.description}\n\n`;
  
  content += `Cuisine: ${recipe.cuisine}\n`;
  content += `Category: ${recipe.category}\n`;
  content += `Prep Time: ${recipe.prepTime}\n`;
  content += `Cook Time: ${recipe.cookTime}\n`;
  content += `Servings: ${recipe.servings}\n`;
  content += `Difficulty: ${recipe.difficulty}\n\n`;
  
  content += 'INGREDIENTS:\n';
  content += '-----------\n';
  recipe.ingredients.forEach((ingredient, index) => {
    content += `${index + 1}. ${ingredient}\n`;
  });
  
  content += '\nINSTRUCTIONS:\n';
  content += '------------\n';
  recipe.instructions.forEach((instruction, index) => {
    content += `${index + 1}. ${instruction}\n\n`;
  });
  
  content += `\nTranslated to ${languageName}\n`;
  content += `Generated on ${new Date().toLocaleDateString()}\n`;
  
  return content;
};
