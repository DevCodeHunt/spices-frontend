import { axiosPrivate } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { setImages } from '@/redux/slices/productSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify';

const useProductMutation = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()


    const addProductMutation = useMutation({
        mutationKey: ["admin", { action: "addProduct" }],
        mutationFn: async (values: any) => {
            const response = await axiosPrivate.post("/admin/products", values);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product added successfully");
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });

    const updateProductMutation = useMutation({
        mutationFn: async (values: FormData) => {
            return values
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: async (values: FormData) => {
            return values
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });


    return {
        addProductMutation,
        updateProductMutation,
        deleteProductMutation,
    }
}

export default useProductMutation