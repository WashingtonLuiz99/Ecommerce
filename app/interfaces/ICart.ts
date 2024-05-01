import type ICartItem from './IProductCart';

export interface ICart {
  id?: string;

  sub_total: number;
  cart_items: ICartItem[];
}
