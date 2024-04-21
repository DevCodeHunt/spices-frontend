import { axiosPrivate } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const useProfile = () => {

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axiosPrivate.get("/user/profile");
            return response.data;
        },
    })

    return {
        isPending,
        isError,
        user: data,
        error
    }
}

export default useProfile