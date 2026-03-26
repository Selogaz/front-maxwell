import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#66AAA5] text-white hover:bg-[#337360] active:bg-[#295F59] focus:ring-[#66AAA5] disabled:bg-[#94A3B8]',
    secondary: 'border border-[#475569] bg-transparent text-white hover:border-[#66AAA5] active:border-[#66AAA5] active:bg-[#334155] focus:ring-[#66AAA5] disabled:bg-[#334155] disabled:text-[#64748B]',
    ghost: 'text-[#94A3B8] hover:text-white hover:bg-[#334155] active:bg-[#475569] focus:ring-[#66AAA5]',
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm min-w-[120px]',
    md: 'h-10 px-5 text-sm min-w-[150px]',
    lg: 'h-12 px-8 text-base min-w-[200px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
