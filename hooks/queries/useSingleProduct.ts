import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

const useSingleProduct = (productId: string) => {
    const { data: product, isSuccess, isError, errorUpdateCount, isLoading } = useQuery({
        queryKey: ['products', productId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/products/${productId}`)
            return data
        },
    })

    return {
        product,
        isSuccess,
        isError,
        errorUpdateCount,
        isLoading,
    }
}

export default useSingleProduct