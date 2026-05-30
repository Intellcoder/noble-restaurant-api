import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
export declare class OrderItemModel extends Model<InferAttributes<OrderItemModel>, InferCreationAttributes<OrderItemModel>> {
    id: CreationOptional<string>;
    foodId: string;
    foodName: string;
    orderId: string;
    imageUrl?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
//# sourceMappingURL=orderItem.model.d.ts.map