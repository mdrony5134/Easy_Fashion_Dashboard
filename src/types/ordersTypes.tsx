export type OrderStatus = 
  | "PENDING" 
  | "CONFIRMED" 
  | "PROCESSING" 
  | "SHIPPED" 
  | "DELIVERED" 
  | "CANCELLED";

export interface OrderItem {
  product: string;
  name: string;
  category: string;
  style: string;
  sizes: string[];
  quantity: number;
  unitPrice: number;
}

export interface OrderType {
  _id: string;
  user: string | null;
  customerName: string;
  phone: string;
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  grandTotal: number;
  status: OrderStatus;
  createdAt: string;
}

export const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  PROCESSING: "bg-indigo-100 text-indigo-800 border-indigo-200",
  SHIPPED: "bg-purple-100 text-purple-800 border-purple-200",
  DELIVERED: "bg-brand-green/20 text-green-800 border-brand-green/30",
  CANCELLED: "bg-brand-red/20 text-red-800 border-brand-red/30",
};