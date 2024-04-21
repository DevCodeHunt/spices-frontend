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
    });


    return {
        addProductMutation,
    }
}

export default useProductMutation