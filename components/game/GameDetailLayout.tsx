"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export default function GameDetailLayout({ 
  left, 
  right 
}: { 
  left: React.ReactNode; 
  right: React.ReactNode; 
}) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
    >
      <motion.div variants={item} className="lg:col-span-2">
        {left}
      </motion.div>
      <motion.div variants={item} className="lg:sticky lg:top-24 self-start">
        {right}
      </motion.div>
    </motion.div>
  );
}
