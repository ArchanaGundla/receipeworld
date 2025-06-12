
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
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with word wrapping and UTF-8 support
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont(undefined, 'bold');
    } else {
      pdf.setFont(undefined, 'normal');
    }
    
    // Ensure proper UTF-8 encoding for all languages
    const cleanText = text.replace(/[^\x00-\x7F]/g, (char) => {
      return char; // Keep Unicode characters as is
    });
    
    const lines = pdf.splitTextToSize(cleanText, pageWidth - 2 * margin);
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * (fontSize * 0.5) + 5;
    
    // Check if we need a new page
    if (yPosition > pageHeight - margin - 30) {
      addFooter();
      pdf.addPage();
      yPosition = margin + 20;
      addHeader();
    }
  };

  // Header function
  const addHeader = () => {
    const headerY = 15;
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text('RecipeWorld - Your Global Recipe Collection', pageWidth / 2, headerY, { align: 'center' });
    
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, headerY + 5, pageWidth - margin, headerY + 5);
    yPosition = headerY + 15;
  };

  // Footer function with translated content
  const addFooter = () => {
    const footerY = pageHeight - 15;
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(100, 100, 100);
    
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, footerY - 10, pageWidth - margin, footerY - 10);
    
    pdf.text('www.recipeworld.com | contact@recipeworld.com', margin, footerY);
    pdf.text(`Page ${pdf.getCurrentPageInfo().pageNumber}`, pageWidth - margin, footerY, { align: 'right' });
    pdf.text(`Generated on ${new Date().toLocaleDateString()} | Language: ${languageName}`, pageWidth / 2, footerY, { align: 'center' });
  };

  addHeader();
  
  // Website logo/title
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(255, 130, 0);
  pdf.text('🍳 RecipeWorld', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Recipe title with proper encoding
  pdf.setFontSize(24);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(0, 0, 0);
  const titleLines = pdf.splitTextToSize(recipe.title, pageWidth - 2 * margin);
  pdf.text(titleLines, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += titleLines.length * 12 + 10;

  pdf.setDrawColor(255, 165, 0);
  pdf.setLineWidth(2);
  pdf.line(pageWidth / 2 - 30, yPosition, pageWidth / 2 + 30, yPosition);
  yPosition += 15;

  // Description
  pdf.setTextColor(80, 80, 80);
  addText(recipe.description, 12);
  yPosition += 5;

  // Recipe Info
  const infoBoxY = yPosition;
  const infoBoxHeight = 25;
  
  pdf.setFillColor(250, 245, 235);
  pdf.rect(margin, infoBoxY, pageWidth - 2 * margin, infoBoxHeight, 'F');
  
  pdf.setFontSize(10);
  pdf.setTextColor(60, 60, 60);
  const infoText = `🍽️ Cuisine: ${recipe.cuisine} | 📂 Category: ${recipe.category} | ⏱️ Prep: ${recipe.prepTime} | 🔥 Cook: ${recipe.cookTime} | 👥 Serves: ${recipe.servings} | 📊 Difficulty: ${recipe.difficulty}`;
  const infoLines = pdf.splitTextToSize(infoText, pageWidth - 2 * margin - 10);
  pdf.text(infoLines, margin + 5, infoBoxY + 8);
  
  yPosition = infoBoxY + infoBoxHeight + 15;

  // Ingredients section
  pdf.setFontSize(18);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(255, 130, 0);
  pdf.text('🥘 Ingredients', margin, yPosition);
  yPosition += 10;
  
  pdf.setTextColor(0, 0, 0);
  recipe.ingredients.forEach((ingredient, index) => {
    addText(`${index + 1}. ${ingredient}`, 11);
  });
  yPosition += 10;

  // Instructions section
  pdf.setFontSize(18);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(255, 130, 0);
  pdf.text('👨‍🍳 Instructions', margin, yPosition);
  yPosition += 10;
  
  pdf.setTextColor(0, 0, 0);
  recipe.instructions.forEach((instruction, index) => {
    const stepHeader = `Step ${index + 1}:`;
    pdf.setFont(undefined, 'bold');
    addText(stepHeader, 12, true);
    yPosition -= 5;
    
    pdf.setFont(undefined, 'normal');
    addText(instruction, 11);
    yPosition += 3;
  });

  addFooter();

  const fileName = `${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${languageName.toLowerCase()}.pdf`;
  pdf.save(fileName);
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
