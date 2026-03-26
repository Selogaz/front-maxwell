export interface AdventureItem {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface AdventuresBlock {
  title: string;
  subtitle: string;
  adventures: AdventureItem[];
  ctaButton: {
    text: string;
    action: string;
  };
}