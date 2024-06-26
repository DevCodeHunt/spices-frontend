import { axiosInstance, axiosPrivate } from '@/lib/axios';
import { removeFromLocalStorage, storeInLocalStorage } from '@/lib/localstorage';
import { useAppDispatch } from '@/redux/hooks';
import { logOut, setCredentials } from '@/redux/slices/userSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { toast } from 'react-toastify';

const useAuthMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const signUptMutation = useMutation({
        mutationKey: ["auth", { action: "signup" }],
        mutationFn: async (values: FormData) => {
            const response = await axiosInstance.post("/auth/signup", values);
            return response.data;
        },
    });

    const verificationMailMutation = useMutation({
        mutationKey: ["auth", { action: "verificationMail" }],
        mutationFn: async (token: string) => {
            const response = await axiosInstance.post("/auth/verify", {token});
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
            dispatch(setCredentials(data));
            queryClient.invalidateQueries({ queryKey: ["user"] });
            storeInLocalStorage("spicesAccessToken", data.access_token);
            router.push("/")
            enqueueSnackbar("Logged in successfully", { variant: "success" });
        },
    });

    const logoutMutation = useMutation({
        mutationKey: ["auth", { action: "logout" }],
        mutationFn: async () => {
            const response = await axiosPrivate.post("/auth/logout");
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            removeFromLocalStorage("spicesAccessToken");
            dispatch(logOut())
            router.push("/")
            enqueueSnackbar("Logged out successfully", { variant: "success" });
        },
        onError: (error: any) => {
            enqueueSnackbar(error?.response?.data.message, { variant: "success" });
        }
    });

    const forgotPasswordMutation = useMutation({
        mutationKey: ["auth", { action: "forgotPassword" }],
        mutationFn: async (values: FormData) => {
            const response = await axiosInstance.post("/auth/forgot-password", values);
            return response.data;
        },
    });

    const resetPasswordMutation = useMutation({
        mutationKey: ["auth", { action: "resetPassword" }],
        mutationFn: async (values: FormData) => {
            const response = await axiosInstance.patch("/auth/reset-password", values);
            return response.data;
        },
    });


    return {
        signUptMutation,
        signIntMutation,
        sendVerificationMailMutation,
        logoutMutation,
        forgotPasswordMutation,
        resetPasswordMutation,
        verificationMailMutation
    }
}

export default useAuthMutation