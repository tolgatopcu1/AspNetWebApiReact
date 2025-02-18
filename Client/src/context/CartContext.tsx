import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ICart } from "../Model/ICart";

interface CartContextValue{
    cart : ICart | null;
    setCart: (cart: ICart) => void;
}
export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartContextProvider");
    }
    return context;
}



export function CartContextProvider({children}:PropsWithChildren<any>){
    const [cart, setCart] = useState<ICart | null>(null);



    return(
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}