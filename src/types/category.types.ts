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
export interface UpdateCategoryDto {
  name: string;
  description: string | null;
  slug: string | null;
  isFeatured: boolean;
}
