import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"


const useCategories = () => {
    const { data: categories, isSuccess, isError, errorUpdateCount, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data } = await axiosInstance.get("/categories")
            return data
        },
    })

    return {
        categories,
        isSuccess,
        isError,
        errorUpdateCount,
        isLoading,
    }
}

export default useCategories