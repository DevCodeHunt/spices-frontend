import { axiosInstance } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

const useBanners = () => {
    const { data: banners, isSuccess, isError, errorUpdateCount, isLoading } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const { data} = await axiosInstance.get("/banners")
            return data
        },
    })

    return {
        banners,
        isSuccess,
        isError,
        errorUpdateCount,
        isLoading,
    }
}

export default useBanners