export interface NavLink {
  id: string;
  href: string;
  label: string;
  isActive: boolean;
}

export interface HeaderBlock {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  navLinks: NavLink[];
  userMenu: {
    label: string;
    href: string;
  };
  mobileMenuButton: {
    label: string;
  };
}