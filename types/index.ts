export type TBanner = {
  title: string;
  description: string;
  link: string;
  image: TImage;
  createdAt: Date;
  updatedAt: Date;
  _id: string
};

export type Store = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export type TImage = {
  id: string;
  url: string;
};

export interface CustomError {
  response?: {
    data: {
      message: string;
    };
  };
}

export interface IUser {
  _id: string,
  name: string,
  username: string,
  email: string,
  subscribed: boolean,
  acceptTerms: boolean,
  acceptCookie: boolean,
  verified: boolean,
  orders: [any],
  wishlists: [any],
  carts: [any],
  compares: [any],
  likesBlogs: [any],
  addresses: [any],
  createdAt: Date,
  updatedAt: Date,
  profileImg: TImage
}


export type TAddress = {
  _id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
}

export interface Category {
  _id: string;
  name: string;
  image: TImage;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminProduct {
  _id: string;
  name: string;
  image: string;
  stock: number;
  price: number;
  salesPerDay: number;
  salesPerMonth: number;
  totalSales: number;
  createdAt: Date;
  updatedAt: Date;
  revenue: number;
  purchased: number;
  rating: {
    count: number;
    average: number;
  },
  purchasedAt: Date;
  category: string
}

export type Review = {
  _id: string;
  rating: number;
  message: string;
  customer: Object;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: [any];
  category: boolean;
  images: TImage[];
  discountPrice: number;
  discountType: string;
  discountStartDate: Date;
  discountEndDate: Date;
  discountApplied: boolean;
  stock: number;
  shippingPrice: number;
  barCode: number;
  sku: number;
  purchased: number;
  visited: number;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  rating: {
    count: number;
    average: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  _id: string
}

export interface CheckoutInfo {
  name: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  paymentMethod: string;

}