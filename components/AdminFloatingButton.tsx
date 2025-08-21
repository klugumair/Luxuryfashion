"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../App";
import { Button } from "./ui/button";
import { Plus, Settings, Package, X } from "lucide-react";
import { AnimatedEmoji } from "./animations";

interface AdminFloatingButtonProps {
  category: string;
  onAddProduct: () => void;
}

export function AdminFloatingButton({ category, onAddProduct }: AdminFloatingButtonProps) {
  const { setCurrentPage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border p-2 space-y-2 min-w-48"
          >
            <Button
              onClick={onAddProduct}
              className="w-full justify-start gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              size="sm"
            >
              <Plus className="w-4 h-4" />
              Add Product to {category}
            </Button>
            <Button
              onClick={() => setCurrentPage("admin")}
              variant="outline"
              className="w-full justify-start gap-2"
              size="sm"
            >
              <Package className="w-4 h-4" />
              Manage All Products
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
          size="sm"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1"
              >
                <Settings className="w-5 h-5" />
                <AnimatedEmoji emoji="⚡" size="small" animation="pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Admin badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold"
        >
          ADMIN
        </motion.div>
      </motion.div>
    </div>
  );
}
