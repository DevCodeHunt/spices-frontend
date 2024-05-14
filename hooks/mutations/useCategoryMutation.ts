import { axiosPrivate } from '@/lib/axios';
import { Category } from '@/types';
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
            console.log(values);

            const response = await axiosPrivate.put(`/categories/${values.id}`, values);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category updated successfully");
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });

    const deleteCategoryMutation = useMutation({
        mutationKey: ["categories", { action: "deleteCategory" }],
        mutationFn: async (category: Category) => {
            const response = await axiosPrivate.delete(`/categories/${category._id}?imageId=${category.image.id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category deleted successfully");
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });

    const deleteAllCategoryMutation = useMutation({
        mutationKey: ["categories", { action: "deleteCategory" }],
        mutationFn: async (categories: Category[]) => {
            const response = await axiosPrivate.post(`/categories/deleteAllCategory`, {categories});
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category deleted successfully");
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message);
        },
    });
    return {
        addCategoryMutation,
        updateCategoryMutation,
        deleteCategoryMutation,
        deleteAllCategoryMutation
    }
}

export default useCategoryMutation