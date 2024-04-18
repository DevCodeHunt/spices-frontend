import { Store } from "@/types";
import { create } from "zustand";

const useCreateBannerStore = create<Store>((set) => ({
    open: false,
    onClose: () => set({ open: false }),
    onOpen: () => set({ open: true }),
}));

export default useCreateBannerStore;