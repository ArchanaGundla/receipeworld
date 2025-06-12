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
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16
  });
  
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  let yPosition = margin;

  // Helper function to safely add text with proper encoding
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont('helvetica', 'bold');
    } else {
      pdf.setFont('helvetica', 'normal');
    }
    
    // Convert text to ASCII-safe format for better compatibility
    const safeText = text
      .replace(/[^\x20-\x7E]/g, (char) => {
        // Keep common punctuation and convert others to ASCII equivalents
        const charCode = char.charCodeAt(0);
        if (charCode > 127) {
          // For non-ASCII characters, try to find ASCII equivalents or keep as is
          return char;
        }
        return char;
      });
    
    try {
      const lines = pdf.splitTextToSize(safeText, pageWidth - 2 * margin);
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * (fontSize * 0.4) + 5;
    } catch (error) {
      console.error('Error adding text to PDF:', error);
      // Fallback: add text without splitting
      pdf.text(safeText.substring(0, 50) + '...', margin, yPosition);
      yPosition += fontSize * 0.4 + 5;
    }
    
    // Check if we need a new page
    if (yPosition > pageHeight - margin - 30) {
      addFooter();
      pdf.addPage();
      yPosition = margin + 20;
      addHeader();
    }
  };

  // Helper function to add text in English (fallback for special characters)
  const addSafeText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont('helvetica', 'bold');
    } else {
      pdf.setFont('helvetica', 'normal');
    }
    
    // Use only ASCII characters for maximum compatibility
    const asciiText = text.replace(/[^\x20-\x7E]/g, '?');
    const lines = pdf.splitTextToSize(asciiText, pageWidth - 2 * margin);
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * (fontSize * 0.4) + 5;
    
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
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text('RecipeWorld - Your Global Recipe Collection', pageWidth / 2, headerY, { align: 'center' });
    
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, headerY + 5, pageWidth - margin, headerY + 5);
    yPosition = headerY + 15;
  };

  // Footer function
  const addFooter = () => {
    const footerY = pageHeight - 15;
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
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
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 130, 0);
  pdf.text('RecipeWorld', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Recipe title - use safe method for better compatibility
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  
  // For title, try to use original text but with fallback
  try {
    const titleLines = pdf.splitTextToSize(recipe.title, pageWidth - 2 * margin);
    pdf.text(titleLines, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += titleLines.length * 10 + 10;
  } catch (error) {
    // Fallback to ASCII-safe version
    const safeTitle = recipe.title.replace(/[^\x20-\x7E]/g, '?');
    pdf.text(safeTitle, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
  }

  pdf.setDrawColor(255, 165, 0);
  pdf.setLineWidth(2);
  pdf.line(pageWidth / 2 - 30, yPosition, pageWidth / 2 + 30, yPosition);
  yPosition += 15;

  // Description
  pdf.setTextColor(80, 80, 80);
  addSafeText(recipe.description, 12);
  yPosition += 5;

  // Recipe Info
  const infoBoxY = yPosition;
  const infoBoxHeight = 25;
  
  pdf.setFillColor(250, 245, 235);
  pdf.rect(margin, infoBoxY, pageWidth - 2 * margin, infoBoxHeight, 'F');
  
  pdf.setFontSize(10);
  pdf.setTextColor(60, 60, 60);
  const infoText = `Cuisine: ${recipe.cuisine} | Category: ${recipe.category} | Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime} | Serves: ${recipe.servings} | Difficulty: ${recipe.difficulty}`;
  const safeInfoText = infoText.replace(/[^\x20-\x7E]/g, '?');
  const infoLines = pdf.splitTextToSize(safeInfoText, pageWidth - 2 * margin - 10);
  pdf.text(infoLines, margin + 5, infoBoxY + 8);
  
  yPosition = infoBoxY + infoBoxHeight + 15;

  // Ingredients section
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 130, 0);
  pdf.text('Ingredients', margin, yPosition);
  yPosition += 10;
  
  pdf.setTextColor(0, 0, 0);
  recipe.ingredients.forEach((ingredient, index) => {
    addSafeText(`${index + 1}. ${ingredient}`, 11);
  });
  yPosition += 10;

  // Instructions section
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 130, 0);
  pdf.text('Instructions', margin, yPosition);
  yPosition += 10;
  
  pdf.setTextColor(0, 0, 0);
  recipe.instructions.forEach((instruction, index) => {
    const stepHeader = `Step ${index + 1}:`;
    pdf.setFont('helvetica', 'bold');
    addSafeText(stepHeader, 12, true);
    yPosition -= 5;
    
    pdf.setFont('helvetica', 'normal');
    addSafeText(instruction, 11);
    yPosition += 3;
  });

  // Add language note
  yPosition += 10;
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Note: Content translated to ${languageName}`, margin, yPosition);

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
