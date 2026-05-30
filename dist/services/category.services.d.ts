import { CategoryModel } from "../models/category.model";
import { CreateCategoryDto } from "../types/category.types";
export declare class CategoryServices {
    static create(payload: CreateCategoryDto): Promise<CategoryModel>;
    static getAllCategories(): Promise<CategoryModel[]>;
    static findById(id: string): Promise<CategoryModel>;
    static findByName(name: string): Promise<CategoryModel | null>;
    static updateCategory(id: string): Promise<void>;
    static deleteCategory(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=category.services.d.ts.map