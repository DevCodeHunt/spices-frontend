import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CheckoutInfo, IUser, TAddress } from "@/types";
import { lookInInLocalStorage } from "@/lib/localstorage";


export interface IUserState {
    isAuth: boolean;
    token: string | null;
    user: IUser | null;
    addresses: TAddress[];
    checkoutInfo: CheckoutInfo | null
}

const initialState: IUserState = {
    isAuth: lookInInLocalStorage("spicesAccessToken") ? true : false,
    token: lookInInLocalStorage("spicesAccessToken"),
    user: null,
    addresses: [],
    checkoutInfo: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { access_token, user } = action.payload;
            state.token = access_token;
            state.isAuth = true;
            state.user = user;
        },

        setAddresses: (state, action: PayloadAction<TAddress[]>) => {
            state.addresses = action.payload;
        },

        setSaveAddress: (state, action: PayloadAction<TAddress>) => {
            state.addresses = [action.payload, ...state.addresses];
        },

        setEditAddress: (state, action) => {
            const addressId = action.payload._id;
            state.addresses = state.addresses.map((address) => {
                return address._id === addressId ? { ...action.payload } : address;
            });
        },

        setDeleteAddress: (state, action) => {
            const addressId = action.payload;
            state.addresses = state.addresses.filter((address) => {
                return address._id !== addressId;
            });
        },

        setToggleActiveAddress: (state, action) => {
            const addressId = action.payload;
            state.addresses = state.addresses.map((address) => {
                return address._id === addressId
                    ? { ...address, isActive: !address.isActive }
                    : address;
            });
        },

        setUserProfile: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },



        logOut: (state) => {
            state.user = null;
            state.addresses = []
            state.token = null;
            state.isAuth = false
        },
        setCheckoutInfo: (state, action: PayloadAction<CheckoutInfo>) => {
            state.checkoutInfo = { ...state.checkoutInfo, ...action.payload };
        },
    },
});

export const UserState = (state: RootState) => state.user;

export const {
    setCredentials,
    logOut,
    setAddresses,
    setEditAddress,
    setUserProfile,
    setDeleteAddress,
    setSaveAddress,
    setToggleActiveAddress,
    setCheckoutInfo
} = userSlice.actions;

export default userSlice.reducer;