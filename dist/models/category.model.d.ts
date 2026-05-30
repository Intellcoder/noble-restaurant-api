import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
export declare class CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
    id: CreationOptional<string>;
    name: string;
    slug: string | null;
    description: string | null;
    isFeatured: boolean;
}
//# sourceMappingURL=category.model.d.ts.map