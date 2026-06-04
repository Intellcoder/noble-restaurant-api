import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
export declare class ComboModel extends Model<InferAttributes<ComboModel>, InferCreationAttributes<ComboModel>> {
    id: CreationOptional<string>;
    name: string;
    description?: CreationOptional<string | null>;
    price: number;
    image?: CreationOptional<string | null>;
    isActive: boolean;
    createdAt: CreationOptional<Date | null>;
}
//# sourceMappingURL=combo.model.d.ts.map