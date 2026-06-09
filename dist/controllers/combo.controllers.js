"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCombo = exports.updateCombo = exports.getComboById = exports.getAllCombos = exports.CreateCombos = void 0;
const combo_services_1 = require("../services/combo.services");
const CreateCombos = async (req, res, next) => {
    try {
        const data = req.body;
        const combos = await combo_services_1.ComboService.createCombo(data);
        return res.status(201).json({
            success: true,
            data: combos,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.CreateCombos = CreateCombos;
const getAllCombos = async (req, res, next) => {
    try {
        console.log("getting combos");
        const combos = await combo_services_1.ComboService.getAllCombos();
        return res.status(200).json({
            success: true,
            data: combos,
        });
    }
    catch (error) {
        console.log("error:", error);
        return next(error);
    }
};
exports.getAllCombos = getAllCombos;
const getComboById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const combo = await combo_services_1.ComboService.getComboById(id);
        if (!combo) {
            return res.status(404).json({
                success: false,
                message: "Combo not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: combo,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.getComboById = getComboById;
const updateCombo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const combo = await combo_services_1.ComboService.updateCombo(id, data);
        return res.status(200).json({
            success: true,
            message: "Combo updated successfully",
            data: combo,
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.updateCombo = updateCombo;
const deleteCombo = async (req, res, next) => {
    try {
        const { id } = req.params;
        await combo_services_1.ComboService.deleteCombo(id);
        return res.status(200).json({
            success: true,
            message: "Combo deleted successfully",
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteCombo = deleteCombo;
//# sourceMappingURL=combo.controllers.js.map