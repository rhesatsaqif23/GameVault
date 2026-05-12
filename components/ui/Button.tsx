import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = "", 
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 rounded-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-white border-2 border-transparent shadow-lg shadow-primary/20 hover:bg-[#805fe3] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30",
    outline: "border-2 border-border bg-transparent hover:border-primary hover:text-primary hover:-translate-y-0.5 text-foreground",
    ghost: "bg-transparent border-2 border-transparent hover:bg-primary/10 text-foreground hover:-translate-y-0.5"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm",
    md: "px-4 py-2 text-sm md:px-6 md:py-2 md:text-base",
    lg: "px-6 py-2.5 text-base md:px-8 md:py-3 md:text-lg"
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
