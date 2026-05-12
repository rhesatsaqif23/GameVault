"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import FilterPanel from './FilterPanel';

const FilterDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3"
      >
        <Filter size={18} />
        Filter & Sort
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-background shadow-2xl z-101 flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grow overflow-y-auto p-4 custom-scrollbar">
                <FilterPanel />
              </div>
              
              <div className="p-4 border-t border-border">
                <Button 
                  className="w-full" 
                  onClick={() => setIsOpen(false)}
                >
                  Show Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDrawer;
