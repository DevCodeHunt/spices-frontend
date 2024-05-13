import { Store } from "@/types";
import { create } from "zustand";

const useAddCategoryStore = create<Store>((set) => ({
    open: false,
    onClose: () => set({ open: false }),
    onOpen: () => set({ open: true }),
}));

export default useAddCategoryStore;
