"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const NotFoundPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
          duration: 2
        }}
        className="text-8xl md:text-9xl font-black mb-4 text-primary/20 drop-shadow-sm"
      >
        404
      </motion.h1>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-foreground/60 max-w-md mx-auto mb-10 text-base md:text-lg">
          The page you&apos;re looking for might have been moved, deleted, or never existed in the vault.
        </p>
        
        <Link href="/">
          <Button size="lg" className="px-8">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </main>
  );
};

export default NotFoundPage;
