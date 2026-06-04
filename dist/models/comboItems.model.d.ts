import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
export declare class ComboItemModel extends Model<InferAttributes<ComboItemModel>, InferCreationAttributes<ComboItemModel>> {
    id: CreationOptional<string>;
    foodId: string;
    foodName: string;
    comboId: string;
    imageUrl?: string;
    unitPrice: number;
}
//# sourceMappingURL=comboItems.model.d.ts.map