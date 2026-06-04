type OrderItem = {
    foodName: string;
    quantity: number;
    unitPrice: number;
};
type OrderTemplateProps = {
    orderNumber: string;
    customerPhone: string;
    deliveryType: string;
    deliveryAddress?: string;
    totalAmount: number;
    items: OrderItem[];
};
export declare const adminOrderTemplate: ({ orderNumber, customerPhone, deliveryType, deliveryAddress, totalAmount, items, }: OrderTemplateProps) => string;
export {};
//# sourceMappingURL=template.d.ts.map