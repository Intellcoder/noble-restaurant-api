export interface Category {
    name: string;
    slug: string;
    description: string;
    isFeatured: boolean;
}
export interface CreateCategoryDto {
    name: string;
    description: string | null;
    slug: string | null;
    isFeatured: boolean;
}
//# sourceMappingURL=category.types.d.ts.map