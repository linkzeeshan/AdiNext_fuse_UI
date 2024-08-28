import { DateTime } from "luxon";

export interface Order { }

export class OrderItem {
    id: number = 0;
    designId: number = 0;
    name: string = '';
    size: number = 0.0;
    quantity: number = 0;
    number: number = 0;
}

export interface Orders {
    designs: Design[];
    orderItems: OrderItem[];
}
export interface Design {
    designId: number;
    orderId: number;
    filename: string;
    filepath: string;
    isActive: boolean;
    isApproved: boolean;
    orderItems: OrderItem[];

}
export interface OrderReadDto {
    id: number;
    customerId: string;
    customerName: string;
    shippingAddress: string;
    stage: string;
    details?: string;
    status: string;
    isActive: boolean;
    date: string;
}