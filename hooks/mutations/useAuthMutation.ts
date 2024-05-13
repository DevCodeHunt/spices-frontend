import { axiosInstance, axiosPrivate } from '@/lib/axios';
import { removeFromLocalStorage, storeInLocalStorage } from '@/lib/localstorage';
import { useAppDispatch } from '@/redux/hooks';
import { logOut, setCredentials } from '@/redux/slices/userSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const useAuthMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter();
    const dispatch = useAppDispatch();

    const signUptMutation = useMutation({
        mutationKey: ["auth", { action: "signup" }],
        mutationFn: async (values: FormData) => {
            const response = await axiosInstance.post("/auth/signup", values);
            return response.data;
        },
    });

    const sendVerificationMailMutation = useMutation({
        mutationKey: ["auth", { action: "sendVerificationMail" }],
        mutationFn: async (values: FormData) => {
            const response = await axiosInstance.post("/auth/send-verification-mail", values);
            return response.data;
        },
        onSuccess: (data) => {
        }
    });

    const signIntMutation = useMutation({
        mutationKey: ["auth", { action: "signin" }],
        mutationFn: async (values: FormData) => {
            const response = await axiosInstance.post("/auth/signin", values);
            return response.data;
        },
        onSuccess: (data) => {
            dispatch(setCredentials({
                token: data.access_token,
                user: data.user
            }));
            storeInLocalStorage("spicesRefreshToken", data.access_token);
            router.push("/")
        },
    });

    const logoutMutation = useMutation({
        mutationKey: ["auth", { action: "logout" }],
        mutationFn: async () => {
            const response = await axiosPrivate.post("/auth/logout");
            return response.data;
        },
        onSuccess: () => {
            removeFromLocalStorage("spicesRefreshToken");
            dispatch(logOut())
            router.push("/")
            toast.success("Logged out successfully")
        },
        onError: (error: any) => {
            toast.error(error?.response?.data.message)
        }
    });

    return {
        signUptMutation,
        signIntMutation,
        sendVerificationMailMutation,
        logoutMutation
    }
}

export default useAuthMutation