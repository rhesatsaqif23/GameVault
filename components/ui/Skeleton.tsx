import React from "react";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-foreground/10 rounded-lg ${className}`}
    />
  );
};

export default Skeleton;
