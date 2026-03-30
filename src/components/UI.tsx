import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-white rounded-2xl p-4 card-shadow border border-white/50",
      onClick && "cursor-pointer active:scale-[0.98] transition-transform",
      className
    )}
  >
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}) => {
  const variants = {
    primary: "bg-sage-500 text-white hover:bg-sage-600",
    secondary: "bg-lavender-500 text-white hover:bg-lavender-600",
    outline: "border-2 border-sage-500 text-sage-600 hover:bg-sage-50",
    ghost: "text-sage-600 hover:bg-sage-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
    icon: "p-2",
  };

  return (
    <button
      className={cn(
        "rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", className)}>
    {children}
  </span>
);
