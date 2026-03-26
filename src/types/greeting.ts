export interface GreetingBlock {
  title: string;
  description: string;
  videoPlaceholder: {
    label: string;
  };
  ctaButtons: {
    primary: { text: string; action: string };
    secondary: { text: string; action: string };
  };
}