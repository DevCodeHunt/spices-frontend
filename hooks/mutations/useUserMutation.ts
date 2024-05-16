import { axiosPrivate } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { UserState } from '@/redux/slices/userSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

interface CartPropsData {
  productId: string;
  quantity: number;
}

const useUserMutation = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(UserState)
  const { enqueueSnackbar } = useSnackbar();

  const addToWishlistMutation = useMutation({
    mutationKey: ["user", { action: "addToWishlist" }],
    mutationFn: async (productId: string) => {
      const response = await axiosPrivate.post("/user/wishlists", { productId });
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


  const addToCartMutation = useMutation({
    mutationKey: ["user", { action: "addToCart" }],
    mutationFn: async (values: CartPropsData) => {
      const response = await axiosPrivate.post("/user/carts/add", values);
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

  const removeFromCartMutation = useMutation({
    mutationKey: ["user", { action: "removeFromCart" }],
    mutationFn: async (productId: string) => {
      const response = await axiosPrivate.post("/user/carts/remove", { productId });
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

  const incrementCartMutation = useMutation({
    mutationKey: ["user", { action: "incrementCart" }],
    mutationFn: async (productId: string) => {
      const response = await axiosPrivate.post("/user/carts/increment", { productId });
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

  const decrementCartMutation = useMutation({
    mutationKey: ["user", { action: "decrementCart" }],
    mutationFn: async (productId: string) => {
      const response = await axiosPrivate.post("/user/carts/decrement", { productId });
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

  const removeAllFromCartMutation = useMutation({
    mutationKey: ["user", { action: "removeALlFromCart" }],
    mutationFn: async () => {
      const response = await axiosPrivate.post("/user/carts/removeAll");
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
    if (!isAuth) {
      enqueueSnackbar("Please login to add to wishlist", { variant: "error" });
      return
    }
    addToWishlistMutation.mutate(productId)
  }

  const handleRemoveAllWishlist = () => {
    if (!isAuth) {
      enqueueSnackbar("Please login to add to wishlist", { variant: "error" });
      return
    }
    removeAllWishlistMutation.mutate()
  }

  const handleAddToCart = (values: CartPropsData) => {
    if (!isAuth) {
      enqueueSnackbar("Please login to add to cart", { variant: "error" });
      return
    }
    addToCartMutation.mutate(values)
  }

  const handleRemoveFromCart = (productId: string) => {
    if (!isAuth) {
      enqueueSnackbar("Please login to remove from cart", { variant: "error" });
      return
    }
    removeFromCartMutation.mutate(productId)
  }

  const handleIncrementCart = (productId: string) => {
    if (!isAuth) {
      enqueueSnackbar("Please login to increment cart", { variant: "error" });
      return
    }
    incrementCartMutation.mutate(productId)
  }

  const handleDecrementCart = (productId: string) => {
    if (!isAuth) {
      enqueueSnackbar("Please login to decrement cart", { variant: "error" });
      return
    }
    decrementCartMutation.mutate(productId)
  }

  const handleRemoveAllFromCart = () => {
    if (!isAuth) {
      enqueueSnackbar("Please login to remove from cart", { variant: "error" });
      return
    }
    removeAllFromCartMutation.mutate()
  }


  return {
    handleAddToWishlist,
    handleRemoveAllWishlist,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncrementCart,
    handleDecrementCart,
    handleRemoveAllFromCart,
  }
}

export default useUserMutation