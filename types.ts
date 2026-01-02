export type FontStyle = 'classic' | 'modern' | 'minimal' | 'elegant';

export interface DishFormData {
  dishName: string;
  heroIngredient: string; // New field
  ingredients: string;
  price: string;
  healthFocus: string;
  aspectRatio: '1:1' | '9:16';
  imageEnhancements: string;
  discount: string;
  
  // New Fields
  description: string; // Movable/Editable description
  useAiImage: boolean;
  uploadedImage: string | null;
  brandLogo: string | null;
  fontStyle: FontStyle;
}

export interface GeneratedContent {
  imageUrl: string | null;
  isLoading: boolean;
}