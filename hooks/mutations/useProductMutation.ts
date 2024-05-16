import { axiosPrivate } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { setImages } from '@/redux/slices/productSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const useProductMutation = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    const router = useRouter()


    const addProductMutation = useMutation({
        mutationKey: ["admin", { action: "addProduct" }],
        mutationFn: async (values: any) => {
            const response = await axiosPrivate.post("/admin/products", values);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product added successfully");
            router.push("/admin/products")
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });

    const updateProductMutation = useMutation({
        mutationFn: async (values: any) => {
            const response = await axiosPrivate.put(`/admin/products/${values.id}`, values);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product updated successfully");
            router.push("/admin/products")
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: async (values: any) => {
            const response = await axiosPrivate.post(`/admin/products/delete`, values);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product deleted successfully");
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });

    const deleteAllProductMutation = useMutation({
        mutationFn: async (values: any) => {
            const response = await axiosPrivate.post(`/admin/products/deleteAll`, values);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product deleted successfully");
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });


    return {
        addProductMutation,
        updateProductMutation,
        deleteProductMutation,
        deleteAllProductMutation
    }
}

export default useProductMutation