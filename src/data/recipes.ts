
export interface Recipe {
  id: number;
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
}

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    description: "A traditional Italian pizza with fresh tomatoes, mozzarella, and basil",
    cuisine: "Italian",
    prepTime: "20 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "2 cups all-purpose flour",
      "1 tsp active dry yeast",
      "1 tsp salt",
      "2 tbsp olive oil",
      "1 cup warm water",
      "1 cup pizza sauce",
      "8 oz fresh mozzarella cheese",
      "Fresh basil leaves",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Mix flour, yeast, and salt in a large bowl",
      "Add olive oil and warm water, mix until dough forms",
      "Knead dough for 8-10 minutes until smooth",
      "Let rise in oiled bowl for 1 hour",
      "Roll out dough on floured surface",
      "Spread pizza sauce evenly",
      "Add sliced mozzarella and season",
      "Bake at 475°F for 12-15 minutes",
      "Top with fresh basil before serving"
    ],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Butter Chicken",
    description: "Creamy and flavorful Indian curry with tender chicken in rich tomato sauce",
    cuisine: "Indian",
    prepTime: "30 mins",
    cookTime: "45 mins",
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      "2 lbs chicken breast, cubed",
      "1 cup plain yogurt",
      "2 tsp garam masala",
      "1 tsp cumin",
      "1 tsp coriander",
      "4 cloves garlic, minced",
      "1 inch ginger, grated",
      "1 can crushed tomatoes",
      "1 cup heavy cream",
      "2 tbsp butter",
      "Salt to taste"
    ],
    instructions: [
      "Marinate chicken in yogurt and spices for 30 minutes",
      "Heat butter in large pan over medium heat",
      "Cook marinated chicken until golden brown",
      "Add garlic and ginger, cook for 1 minute",
      "Add crushed tomatoes and simmer for 15 minutes",
      "Stir in heavy cream and garam masala",
      "Simmer for 10 more minutes until thickened",
      "Season with salt and serve with rice"
    ],
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "French Onion Soup",
    description: "Classic French soup with caramelized onions and melted Gruyère cheese",
    cuisine: "French",
    prepTime: "15 mins",
    cookTime: "1 hour",
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      "6 large yellow onions, sliced",
      "4 tbsp butter",
      "2 tbsp olive oil",
      "1 tsp sugar",
      "1 tsp salt",
      "6 cups beef broth",
      "1/2 cup dry white wine",
      "4 slices French bread",
      "2 cups grated Gruyère cheese",
      "Fresh thyme"
    ],
    instructions: [
      "Heat butter and oil in large pot over medium heat",
      "Add onions, sugar, and salt",
      "Cook onions for 45 minutes until caramelized",
      "Add wine and cook for 2 minutes",
      "Add broth and thyme, simmer for 20 minutes",
      "Toast bread slices until golden",
      "Ladle soup into bowls",
      "Top with bread and cheese",
      "Broil until cheese is bubbly and golden"
    ],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Chicken Tacos",
    description: "Authentic Mexican tacos with seasoned chicken and fresh toppings",
    cuisine: "Mexican",
    prepTime: "20 mins",
    cookTime: "25 mins",
    servings: 8,
    difficulty: "Easy",
    ingredients: [
      "2 lbs chicken thighs",
      "2 tsp chili powder",
      "1 tsp cumin",
      "1 tsp paprika",
      "1/2 tsp oregano",
      "8 corn tortillas",
      "1 onion, diced",
      "2 tomatoes, diced",
      "1 cup shredded lettuce",
      "1/2 cup sour cream",
      "Fresh cilantro",
      "Lime wedges"
    ],
    instructions: [
      "Season chicken with spices and salt",
      "Cook chicken in skillet for 20-25 minutes",
      "Let chicken rest, then shred",
      "Warm tortillas in dry skillet",
      "Fill tortillas with chicken",
      "Top with onion, tomato, and lettuce",
      "Add sour cream and cilantro",
      "Serve with lime wedges"
    ],
    image: "https://images.unsplash.com/photo-1565299585323-38174c559200?w=400&h=300&fit=crop"
  }
];
