export interface Combo {
  id: string;

  name: string;

  description?: string;

  price: number; // final combo price

  image?: string;

  items: ComboItem[];

  isActive: boolean;

  createdAt: Date;
}

export interface ComboItem {
  id: string;

  comboId: string;

  foodId: string;

  quantity: number; // how many of this product in combo
}