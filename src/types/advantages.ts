import { ReactNode } from 'react';

export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface AdvantagesBlock {
  title: string;
  items: AdvantageItem[];
  ctaButtons: {
    primary: { text: string; action: string };
    secondary: { text: string; action: string };
  };
}