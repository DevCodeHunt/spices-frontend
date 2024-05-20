import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";



export interface IOrderState {
    paymentMethod: string;
}

const initialState: IOrderState = {
    paymentMethod: "CashOnDelivery"
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        }
    },
});

export const OrderState = (state: RootState) => state.order;

export const {
    setPaymentMethod
} = orderSlice.actions;

export default orderSlice.reducer;