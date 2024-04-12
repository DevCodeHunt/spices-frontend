export type TBanner = {
  title: string;
  description: string;
  image: string;
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
