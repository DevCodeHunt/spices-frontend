import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'


const useProducts = () => {
    const { data: products, isSuccess, isError, errorUpdateCount, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosInstance.get("/products")
            return data
        },
    })

    return {
        products,
        isSuccess,
        isError,
        errorUpdateCount,
        isLoading,
    }
}

export default useProducts