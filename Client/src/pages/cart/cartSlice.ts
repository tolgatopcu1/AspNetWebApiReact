import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart } from "../../Model/ICart";
import requests from "../../api/requests";

interface CartState{
    cart:ICart | null;
    status: string;
}

const initialState : CartState = {
    cart: null,
    status: "idle"
}

export const addItemToCart = createAsyncThunk<ICart, { productId:number, quantity?:number}>(
    "cart/addItemToCart",
    async ({productId, quantity=1}) => {
        return await requests.Cart.addItem(productId, quantity);
    }
);

export const deleteItemFromCart = createAsyncThunk<ICart, { productId:number, quantity?:number}>(
    "cart/deleteItemFromCart",
    async ({productId, quantity=1}) => {
        return await requests.Cart.deleteItem(productId, quantity);
    }
);

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setCart: (state, action) => {
            state.cart = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.pending, (state, action) => {
            console.log(action);
            state.status = "pending";
        })
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.cart = action.payload
            state.status = "idle";
        })
        builder.addCase(addItemToCart.rejected, (state) => {
            state.status = "idle";
        })



        builder.addCase(deleteItemFromCart.pending, (state, action) => {
            console.log(action);
            state.status = "pending";
        })
        builder.addCase(deleteItemFromCart.fulfilled, (state, action) => {
            state.cart = action.payload
            state.status = "pending";
        })
        builder.addCase(deleteItemFromCart.rejected, (state) => {
            state.status = "idle";
        })
    }
})

export const { setCart } = cartSlice.actions;