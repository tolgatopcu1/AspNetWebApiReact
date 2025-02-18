import { ICartItem } from "./ICartITem";

export interface ICart
{
    cartId:number;
    customerId: string;
    cartItems: ICartItem[]
}

