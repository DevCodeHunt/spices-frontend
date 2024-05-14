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