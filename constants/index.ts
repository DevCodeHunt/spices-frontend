import {
  BookImage,
  CalendarDays,
  Contact,
  Gift,
  Image,
  Layers3,
  LayoutDashboard,
  ShoppingBag,
  ShoppingBasket,
  Store,
  UsersRound,
} from "lucide-react";

export const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
];

export const banners = [
  {
    image:
      "https://cdn.pixabay.com/photo/2018/11/17/22/15/trees-3822149_1280.jpg",
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam perferendis temporibus voluptas reiciendis saepe unde reprehenderit similique consequuntur excepturi expedita!",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg",
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam perferendis temporibus voluptas reiciendis saepe unde reprehenderit similique consequuntur excepturi expedita!",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2023/12/06/08/41/mountain-8433234_960_720.jpg",
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam perferendis temporibus voluptas reiciendis saepe unde reprehenderit similique consequuntur excepturi expedita!",
  },
];

export const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Stores",
    path: "/admin/stores",
    icon: Store,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: UsersRound,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: ShoppingBag,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingBasket,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: Layers3,
  },
  {
    name: "Banners",
    path: "/admin/banners",
    icon: Image,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: Gift,
  },
  {
    name: "Blogs",
    path: "/admin/blogs",
    icon: BookImage,
  },
  {
    name: "Events",
    path: "/admin/events",
    icon: CalendarDays,
  },
];
