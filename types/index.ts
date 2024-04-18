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
