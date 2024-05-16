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
import { Button } from "@/components/ui/button";
import useAuthMutation from "@/hooks/mutations/useAuthMutation";
import Image from "next/image";

const UserMenu = () => {
  const { isAuth, user } = useAppSelector(UserState);
  const router = useRouter();
  const { logoutMutation } = useAuthMutation();

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
            <DropdownMenuLabel className="flex flex-col font-normal">
              <div>
                <div className="flex items-start gap-2 mb-3">
                  {user?.profileImg ? (
                    <Image
                      src={user?.profileImg.url}
                      alt={user?.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="border w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                      {user?.name.slice(0, 1)}
                    </div>
                  )}
                  <div className="flex-1">
                    <span className="break-all">{user?.name}</span>
                    <span>@{user?.username}</span>
                  </div>
                </div>
                <span className="break-all">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
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
              <Button
                onClick={() => logoutMutation.mutate()}
                className="w-full"
              >
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
