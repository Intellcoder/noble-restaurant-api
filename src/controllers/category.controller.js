"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.findCategoryByName = exports.findCategory = exports.getAllCategory = exports.createCategory = void 0;
const category_services_1 = require("../services/category.services");
const errorHandler_1 = require("../errors/errorHandler");
const createCategory = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await category_services_1.CategoryServices.create(data);
        return res.status(200).json({
            success: true,
            message: "category created successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("category creation failed", 500));
    }
};
exports.createCategory = createCategory;
const getAllCategory = async (req, res, next) => {
    try {
        const result = await category_services_1.CategoryServices.getAllCategories();
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.getAllCategory = getAllCategory;
const findCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await category_services_1.CategoryServices.findById(id);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Failed to get category", 500));
    }
};
exports.findCategory = findCategory;
const findCategoryByName = async (req, res, next) => {
    try {
        const { name } = req.body;
        const result = await category_services_1.CategoryServices.findByName(name);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Error running this operation", 500));
    }
};
exports.findCategoryByName = findCategoryByName;
const updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const result = await category_services_1.CategoryServices.findByName(name);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await category_services_1.CategoryServices.deleteCategory(id);
        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map