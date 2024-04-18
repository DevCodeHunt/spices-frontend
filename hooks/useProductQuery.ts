import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const useProductQuery = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast();

    const createProductMutation = useMutation({
        mutationFn: async (values: FormData) => {
            return values
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError(error: any) {
            toast({
                description: error?.response?.data?.message,
                variant: "destructive",
            });
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
            toast({
                description: error?.response?.data?.message,
                variant: "destructive",
            });
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
            toast({
                description: error?.response?.data?.message,
                variant: "destructive",
            });
        },
    });


    return {
        createProductMutation,
        updateProductMutation,
        deleteProductMutation
    }
}

export default useProductQuery