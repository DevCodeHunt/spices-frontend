import { Store } from "@/types";
import { create } from "zustand";

export const useEditCategorytore = create<Store>((set) => ({
    open: false,
    onClose: () => set({ open: false }),
    onOpen: () => set({ open: true }),
}));

export const useDeleteCategorytore = create<Store>((set) => ({
    open: false,
    onClose: () => set({ open: false }),
    onOpen: () => set({ open: true }),
}));

export const useViewCategorytore = create<Store>((set) => ({
    open: false,
    onClose: () => set({ open: false }),
    onOpen: () => set({ open: true }),
}));

export const useDeleteAllCategorytore = create<Store>((set) => ({
    open: false,
    onClose: () => set({ open: false }),
    onOpen: () => set({ open: true }),
}));