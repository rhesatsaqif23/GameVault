import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

const Badge = ({
  children,
  className = "",
  variant = "secondary",
}: BadgeProps) => {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary:
      "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300 border-transparent",
    outline: "bg-transparent border-border text-foreground",
  };

  return (
    <span
      className={`px-2.5 py-0.5 border text-sm font-bold rounded-full transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
