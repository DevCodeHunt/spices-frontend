import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TImage } from "@/types";


export interface IProductState {
    images: TImage[]
}

const initialState: IProductState = {
    images: []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload
        },
        replaceImages: (state, action) => {
            const { index, image } = action.payload;
            state.images[index] = image;
        },
        deleteImages: (state, action) => {
            const { index } = action.payload;
            state.images.splice(index, 1);
        },
        addImages: (state, action) => {
            state.images = [...state.images, ...action.payload];
        },
        clearImages: (state) => {
            state.images = [];
        }
    },
});

export const ProductState = (state: RootState) => state.product;

export const {
    setImages,
    replaceImages,
    deleteImages,
    addImages,
    clearImages
} = productSlice.actions;

export default productSlice.reducer;