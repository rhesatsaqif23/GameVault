import React from "react";
import { formatCurrency } from "@/lib/utils";

interface PriceBadgeProps {
  price: number;
}

const PriceBadge = ({ price }: PriceBadgeProps) => {
  if (price === 0) {
    return (
      <span className="text-sm md:text-base font-bold text-green-500 uppercase tracking-tighter">
        Free
      </span>
    );
  }

  return (
    <span className="text-sm md:text-base font-bold text-foreground">
      {formatCurrency(price)}
    </span>
  );
};

export default PriceBadge;
