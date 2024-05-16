import { axiosPrivate } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { setUserProfile } from '@/redux/slices/userSlice';
import { useQuery } from '@tanstack/react-query';

const useProfile = () => {
const dispatch = useAppDispatch()
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await axiosPrivate.get("/user/profile");
            dispatch(setUserProfile(response.data))
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