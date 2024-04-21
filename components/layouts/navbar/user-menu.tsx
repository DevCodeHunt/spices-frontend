import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleUser,
  CircleUserRound,
  Heart,
  ShoppingBag,
  Shuffle,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { UserState } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import useProfile from "@/hooks/queries/useProfile";
import { Button } from "@/components/ui/button";
import useAuthMutation from "@/hooks/useAuthMutation";

const UserMenu = () => {
  const { isAuth } = useAppSelector(UserState);
  const { user } = useProfile();
  const router = useRouter();
  const { logoutMutation} = useAuthMutation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserRound />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAuth ? (
          <div className="space-y-2">
            <DropdownMenuItem className="flex flex-col">
              <div>
                <div className="flex items-start gap-2 mb-3">
                  <div className="border w-10 h-10 rounded-full border-gray-400"></div>
                  <div className="flex-1">
                    <span className="break-all">{user?.name}</span>
                    <span>@{user?.username}</span>
                  </div>
                </div>
                <span className="break-all">{user?.email}</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="space-x-2"
            >
              <CircleUser size={22} />
              <span className="text-base">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/wishlists")}
              className="space-x-2"
            >
              <Heart size={22} />
              <span className="text-base">Wishlist</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/compares")}
              className="space-x-2"
            >
              <Shuffle size={22} />
              <span className="text-base">Compares</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/orders")}
              className="space-x-2"
            >
              <ShoppingBag size={22} />
              <span className="text-base">Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={() => logoutMutation.mutate()} className="w-full">
                Log out
              </Button>
            </DropdownMenuItem>
          </div>
        ) : (
          <>
            <DropdownMenuItem onClick={() => router.push("/signin")}>
              <span className="hover:text-primary text-base transition duration-300">
                Login
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/signup")}>
              <span className="hover:text-primary text-base transition duration-300">
                Register
              </span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
