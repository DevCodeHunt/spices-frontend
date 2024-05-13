import { axiosPrivate } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify';

const useCategoryMutation = () => {
    const queryClient = useQueryClient()

    const addCategoryMutation = useMutation({
        mutationKey: ["categories", { action: "addCategory" }],
        mutationFn: async (values: any) => {
            const response = await axiosPrivate.post("/categories", values);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category added successfully");
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });

    const updateCategoryMutation = useMutation({
        mutationKey: ["categories", { action: "updateCategory" }],
        mutationFn: async (values: any) => {
            const response = await axiosPrivate.put(`/categories/${values.id}`, values);
            return response.data;
        },
    });

    const deleteCategoryMutation = useMutation({
        mutationKey: ["categories", { action: "deleteCategory" }],
        mutationFn: async (id: string) => {
            const response = await axiosPrivate.delete(`/categories/${id}`);
            return response.data;
        },
    });
    return {
        addCategoryMutation,
        updateCategoryMutation,
        deleteCategoryMutation,
    }
}

export default useCategoryMutation