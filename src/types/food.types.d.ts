export interface Food {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    badge: string;
    categoryId: string;
    category: string;
    isAvailable: boolean;
}
export interface CreatedFoodDto {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    badge: string;
    categoryId: string;
    category: string;
    isAvailable: boolean;
}
export interface UpdateFoodDto {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    badge: string;
    categoryId: string;
    category: string;
    isAvailable: boolean;
}
//# sourceMappingURL=food.types.d.ts.map