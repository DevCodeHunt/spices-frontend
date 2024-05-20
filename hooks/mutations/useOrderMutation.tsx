import { axiosPrivate } from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const useOrderMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const makeOrderMutation = useMutation({
    mutationKey: ["orders", { action: "stripePayment" }],
    mutationFn: async (values: any) => {
      const response = await axiosPrivate.post("/orders/create", values);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      enqueueSnackbar(data.message, {
        variant: "success",
      });

      // router.push("/checkout/success");
    },
  });

  return {
    makeOrderMutation,
  };
};

export default useOrderMutation;
