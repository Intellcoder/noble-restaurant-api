"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const category_model_1 = require("../models/category.model");
class CategoryServices {
    static async create(payload) {
        const category = await category_model_1.CategoryModel.create({
            name: payload.name,
            description: payload.description,
            slug: payload.slug,
            isFeatured: payload.isFeatured,
        });
        return category;
    }
    static async getAllCategories() {
        const categories = await category_model_1.CategoryModel.findAll();
        return categories;
    }
    static async findById(id) {
        const category = await category_model_1.CategoryModel.findByPk(id);
        if (!category) {
            throw new Error("category does not exist");
        }
        return category;
    }
    static async findByName(name) {
        const category = await category_model_1.CategoryModel.findOne({
            where: {
                name,
            },
        });
        return category;
    }
    static async updateCategory(id) { }
    static async deleteCategory(id) {
        const category = await category_model_1.CategoryModel.findByPk(id);
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
exports.CategoryServices = CategoryServices;
//# sourceMappingURL=category.services.js.map