export interface FooterImage {
  id: string;
  label: string;
  src?: string;
}

export interface FooterBlock {
  images: FooterImage[];
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}