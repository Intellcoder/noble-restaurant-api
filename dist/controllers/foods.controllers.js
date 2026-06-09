"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.getAllFoods = exports.getFoodById = exports.createFood = void 0;
const food_services_1 = require("../services/food.services");
const cloudinary_1 = require("../utils/cloudinary");
const createFood = async (req, res, next) => {
    try {
        let imageUrl = "";
        if (req.file) {
            imageUrl = await cloudinary_1.CloudinaryService.uploadImage(req.file, "foods");
        }
        const data = req.body;
        console.log("reqbody:", data);
        const result = await food_services_1.FoodService.createFood(data, imageUrl);
        return res.status(201).json({
            success: true,
            message: "Food item created successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.createFood = createFood;
const getFoodById = async (req, res, next) => {
    try {
        console.log("Passed here ");
        const { id } = req.params;
        console.log("Id:", id);
        const result = await food_services_1.FoodService.findById(id);
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
exports.getFoodById = getFoodById;
const getAllFoods = async (req, res, next) => {
    try {
        const { total, foods } = await food_services_1.FoodService.findAll();
        return res.status(200).json({
            success: true,
            total: total,
            foods: foods,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.getAllFoods = getAllFoods;
const updateFood = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await food_services_1.FoodService.update(id, data);
        return res.status(200).json({
            success: true,
            message: "Food item deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.updateFood = updateFood;
const deleteFood = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await food_services_1.FoodService.delete(id);
        return res.status(200).json({
            success: true,
            message: "Food item deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.deleteFood = deleteFood;
//# sourceMappingURL=foods.controllers.js.map