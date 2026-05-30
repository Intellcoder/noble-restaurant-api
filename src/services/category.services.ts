import { CategoryModel } from "../models/category.model";
import { CreateCategoryDto } from "../types/category.types";

export class CategoryServices {
  static async create(payload: CreateCategoryDto) {
    const category = await CategoryModel.create({
      name: payload.name,
      description: payload.description,
      slug: payload.slug,
      isFeatured: payload.isFeatured,
    });

    return category;
  }

  static async getAllCategories() {
    const categories = await CategoryModel.findAll();

    return categories;
  }

  static async findById(id: string) {
    const category = await CategoryModel.findByPk(id);

    if (!category) {
      throw new Error("category does not exist");
    }

    return category;
  }

  static async findByName(name: string) {
    const category = await CategoryModel.findOne({
      where: {
        name,
      },
    });

    return category;
  }

  static async updateCategory(id: string) {}

  static async deleteCategory(id: string) {
    const category = await CategoryModel.findByPk(id);

    if (!category) {
      throw new Error("category not found");
    }

    category.destroy();
    return {
      success: true,
      message: "category deleted",
    };
  }
}
