"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const BackButton = ({ className, children }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`bg-transparent border-none p-0 cursor-pointer outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default BackButton;
