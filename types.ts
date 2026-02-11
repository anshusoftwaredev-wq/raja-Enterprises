
export type Category = 'Phones' | 'Accessories' | 'Wearables' | 'Audio';
export type UserMode = 'retail' | 'wholesale';

export interface Product {
  id: string;
  name: string;
  brand: string;
  retailPrice: number;
  wholesalePrice: number;
  moq: number; // Minimum Order Quantity for B2B
  stock: number;
  category: Category;
  description: string;
  image: string;
  specs: Record<string, string>;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
