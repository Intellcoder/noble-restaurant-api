import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
export declare class FoodModel extends Model<InferAttributes<FoodModel>, InferCreationAttributes<FoodModel>> {
    id: CreationOptional<string>;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    badge: string;
    categoryId: string;
    category: string;
    isAvailable: boolean;
}
//# sourceMappingURL=foods.model.d.ts.map