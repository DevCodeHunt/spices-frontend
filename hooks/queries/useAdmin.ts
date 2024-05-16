import { axiosPrivate } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

const useAdmin = () => {
    const productsQuery = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosPrivate.get("/admin/products")
            return data
        },
    })

    return {
        productsQuery
    }
}

export default useAdmin