export type PaymentMethod = "BANK_TRANSFER" | "CARD" | "CASH_ON_DELIVERY";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type DeliveryType = "DELIVERY" | "PICKUP";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "FAILED";

export interface OrderItem {
  foodId: string;
  foodName: string;
  imageUrl?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  phoneNumber: string;
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  transactionId: string;
  paidAt: Date | null;
  orderStatus: OrderStatus;
  whatsappNotificationSent?: boolean;
  customerWhatsappSent?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface createOrderItemDto {
  foodId: string;
  foodName: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderDto {
  phoneNumber: string;
  deliveryType: "DELIVERY" | "PICKUP";
  deliveryAddress: string;
  // paymentMethod: "BANK_TRANSFER" | "CARD" | "CASH_ON_DELIVERY";
  items: createOrderItemDto[];
}
