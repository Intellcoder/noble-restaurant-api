export interface Combo {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    items: ComboItem[];
    isActive: boolean;
    createdAt: Date;
}
export interface ComboItem {
    id: string;
    comboId: string;
    foodId: string;
    quantity: number;
}
//# sourceMappingURL=combo.types.d.ts.map