import { axiosPrivate } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { UserState } from '@/redux/slices/userSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';


const useUserMutation = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(UserState)
  const { enqueueSnackbar } = useSnackbar();

  const addToWishlistMutation = useMutation({
    mutationKey: ["user", { action: "addToWishlist" }],
    mutationFn: async (productId: string) => {
      const response = await axiosPrivate.post("/user/wishlists", { productId});
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data.message, { variant: "error" });
    }
  });

  const removeAllWishlistMutation = useMutation({
    mutationKey: ["user", { action: "revomeAllWishlist" }],
    mutationFn: async () => {
      const response = await axiosPrivate.post("/user/wishlists/removeAll");
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data.message, { variant: "error" });
    }
  });


  const handleAddToWishlist = (productId: string) => {
    if(!isAuth) {
      enqueueSnackbar("Please login to add to wishlist", { variant: "error" });
      return
    }
    addToWishlistMutation.mutate(productId)
  }

  const handleRemoveAllWishlist = () => {
    if(!isAuth) {
      enqueueSnackbar("Please login to add to wishlist", { variant: "error" });
      return
    }
    removeAllWishlistMutation.mutate()
  }


  return {
    handleAddToWishlist,
    handleRemoveAllWishlist
  }
}

export default useUserMutation