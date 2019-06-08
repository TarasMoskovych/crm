export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  _id?: string;
  list: OrderItem[];
}

export interface OrderItem {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}
