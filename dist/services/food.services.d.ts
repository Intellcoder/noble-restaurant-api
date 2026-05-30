import { FoodModel } from "../models/foods.model";
import { CreatedFoodDto, UpdateFoodDto } from "../types";
export declare class FoodService {
    static createFood(payload: CreatedFoodDto, imageUrl: string): Promise<FoodModel>;
    static findById(id: string): Promise<FoodModel | null>;
    static findAll(): Promise<{
        total: number;
        foods: FoodModel[];
    }>;
    static update(id: string, data: Partial<UpdateFoodDto>): Promise<FoodModel>;
    static delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=food.services.d.ts.map