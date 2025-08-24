import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Mountain,
  ShoppingBag,
  Heart,
  User,
  LogOut,
  Search,
  Share2,
  Ruler,
  Settings
} from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedEmoji, TypewriterText } from "./animations";
import { staggerContainer, itemFadeIn, navigationItems, menSubcategories, womenSubcategories, kidsSubcategories, accessoriesSubcategories } from "./constants";
import { useAppContext } from "../App";
import { adminService } from "../utils/supabase/admin";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

// User interface
interface User {
  email: string;
  name: string;
}

// Search result interface
interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

// Men's Subcategory Dropdown Component
function MensDropdown({ 
  isOpen, 
  onNavigate 
}: { 
  isOpen: boolean; 
  onNavigate: (page: string) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md border-2 border-amber-200 rounded-2xl shadow-[4px_4px_0px_0px] shadow-amber-600/20 z-50 overflow-hidden"
        >
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-black text-amber-600 mb-3 flex items-center gap-2"
            >
              <AnimatedEmoji 
                emoji="👨"
                animation="pulse"
                size="small"
                delay={0}
              />
              Men's Collection
              <AnimatedEmoji 
                emoji="✨"
                animation="spin"
                size="small"
                delay={0.2}
              />
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {menSubcategories.map((subcategory, index) => (
                <motion.button
                  key={subcategory.page}
                  variants={itemFadeIn}
                  onClick={() => onNavigate(subcategory.page)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gradient-to-r hover:from-amber-50 hover:to-purple-50 transition-all duration-200 group"
                  whileHover={{ x: 2, scale: 1.005 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-purple-100 flex items-center justify-center text-amber-600 group-hover:from-amber-200 group-hover:to-purple-200"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {subcategory.icon}
                  </motion.div>
                  <div className="flex-1">
                    <span className="font-semibold text-zinc-900 text-sm flex items-center gap-1">
                      {subcategory.name}
                      <AnimatedEmoji 
                        emoji={subcategory.emoji}
                        animation="bounce"
                        size="small"
                        delay={index * 0.1}
                      />
                    </span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 2 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronRight className="h-4 w-4 text-amber-600" />
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 pt-3 border-t border-amber-200"
            >
              <motion.button
                onClick={() => onNavigate('men')}
                className="w-full bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedEmoji 
                  emoji="🛍️"
                  animation="bounce"
                  size="small"
                  delay={0}
                />
                View All Men's
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Women's Subcategory Dropdown Component
function WomensDropdown({ 
  isOpen, 
  onNavigate 
}: { 
  isOpen: boolean; 
  onNavigate: (page: string) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md border-2 border-purple-200 rounded-2xl shadow-[4px_4px_0px_0px] shadow-purple-600/20 z-50 overflow-hidden"
        >
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-black text-purple-600 mb-3 flex items-center gap-2"
            >
              <AnimatedEmoji 
                emoji="👩"
                animation="pulse"
                size="small"
                delay={0}
              />
              Women's Collection
              <AnimatedEmoji 
                emoji="✨"
                animation="spin"
                size="small"
                delay={0.2}
              />
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {womenSubcategories.map((subcategory, index) => (
                <motion.button
                  key={subcategory.page}
                  variants={itemFadeIn}
                  onClick={() => onNavigate(subcategory.page)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-rose-50 transition-all duration-200 group"
                  whileHover={{ x: 2, scale: 1.005 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center text-purple-600 group-hover:from-purple-200 group-hover:to-rose-200"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {subcategory.icon}
                  </motion.div>
                  <div className="flex-1">
                    <span className="font-semibold text-zinc-900 text-sm flex items-center gap-1">
                      {subcategory.name}
                      <AnimatedEmoji 
                        emoji={subcategory.emoji}
                        animation="bounce"
                        size="small"
                        delay={index * 0.1}
                      />
                    </span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 2 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronRight className="h-4 w-4 text-purple-600" />
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 pt-3 border-t border-purple-200"
            >
              <motion.button
                onClick={() => onNavigate('women')}
                className="w-full bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedEmoji 
                  emoji="🛍️"
                  animation="bounce"
                  size="small"
                  delay={0}
                />
                View All Women's
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Accessories Subcategory Dropdown Component
function AccessoriesDropdown({ 
  isOpen, 
  onNavigate 
}: { 
  isOpen: boolean; 
  onNavigate: (page: string) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md border-2 border-emerald-200 rounded-2xl shadow-[4px_4px_0px_0px] shadow-emerald-600/20 z-50 overflow-hidden"
        >
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-black text-emerald-600 mb-3 flex items-center gap-2"
            >
              <AnimatedEmoji 
                emoji="💎"
                animation="pulse"
                size="small"
                delay={0}
              />
              Accessories Collection
              <AnimatedEmoji 
                emoji="✨"
                animation="spin"
                size="small"
                delay={0.2}
              />
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {accessoriesSubcategories.map((subcategory, index) => (
                <motion.button
                  key={subcategory.page}
                  variants={itemFadeIn}
                  onClick={() => onNavigate(subcategory.page)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200 group"
                  whileHover={{ x: 2, scale: 1.005 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600 group-hover:from-emerald-200 group-hover:to-teal-200"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {subcategory.icon}
                  </motion.div>
                  <div className="flex-1">
                    <span className="font-semibold text-zinc-900 text-sm flex items-center gap-1">
                      {subcategory.name}
                      <AnimatedEmoji 
                        emoji={subcategory.emoji}
                        animation="bounce"
                        size="small"
                        delay={index * 0.1}
                      />
                    </span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 2 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronRight className="h-4 w-4 text-emerald-600" />
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 pt-3 border-t border-emerald-200"
            >
              <motion.button
                onClick={() => onNavigate('accessories')}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedEmoji 
                  emoji="🛍️"
                  animation="bounce"
                  size="small"
                  delay={0}
                />
                View All Accessories
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Kids Subcategory Dropdown Component with Nested Structure
function KidsDropdown({ 
  isOpen, 
  onNavigate 
}: { 
  isOpen: boolean; 
  onNavigate: (page: string) => void;
}) {
  const [openAgeGroups, setOpenAgeGroups] = useState<{[key: string]: boolean}>({});

  const toggleAgeGroup = (genderAgeKey: string) => {
    setOpenAgeGroups(prev => ({
      ...prev,
      [genderAgeKey]: !prev[genderAgeKey]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-md border-2 border-rose-200 rounded-2xl shadow-[4px_4px_0px_0px] shadow-rose-600/20 z-50 overflow-hidden max-h-[80vh] overflow-y-auto"
        >
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-black text-rose-600 mb-3 flex items-center gap-2"
            >
              <AnimatedEmoji 
                emoji="👶"
                animation="pulse"
                size="small"
                delay={0}
              />
              Kids Collection
              <AnimatedEmoji 
                emoji="✨"
                animation="spin"
                size="small"
                delay={0.2}
              />
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {kidsSubcategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  variants={itemFadeIn}
                  className="space-y-2"
                >
                  <div className="text-xs font-bold text-rose-500 uppercase tracking-wide flex items-center gap-1 px-2">
                    <AnimatedEmoji 
                      emoji={category.emoji}
                      animation="bounce"
                      size="small"
                      delay={categoryIndex * 0.1}
                    />
                    {category.category}
                  </div>
                  <div className="space-y-1">
                    {category.ageGroups?.map((ageGroup, ageIndex) => {
                      const ageGroupKey = `${category.category}-${ageGroup.name}`;
                      const isAgeGroupOpen = openAgeGroups[ageGroupKey];
                      
                      return (
                        <div key={ageGroupKey} className="space-y-1">
                          <motion.button
                            onClick={() => toggleAgeGroup(ageGroupKey)}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-200 group"
                            whileHover={{ x: 2, scale: 1.005 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.div
                              className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-rose-600 group-hover:from-rose-200 group-hover:to-pink-200"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              {ageGroup.icon}
                            </motion.div>
                            <div className="flex-1">
                              <span className="font-medium text-zinc-800 text-sm flex items-center gap-1">
                                {ageGroup.name}
                                <AnimatedEmoji 
                                  emoji={ageGroup.emoji}
                                  animation="bounce"
                                  size="small"
                                  delay={categoryIndex * 0.2 + ageIndex * 0.1}
                                />
                              </span>
                            </div>
                            <motion.div
                              animate={{ rotate: isAgeGroupOpen ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="h-3 w-3 text-rose-600" />
                            </motion.div>
                          </motion.button>
                          
                          <AnimatePresence>
                            {isAgeGroupOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 space-y-1 overflow-hidden"
                              >
                                {ageGroup.subcategories?.map((subcategory, subIndex) => (
                                  <motion.button
                                    key={subcategory.page}
                                    onClick={() => onNavigate(subcategory.page)}
                                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left hover:bg-gradient-to-r hover:from-rose-25 hover:to-pink-25 transition-all duration-200 group text-sm"
                                    whileHover={{ x: 1, scale: 1.005 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: subIndex * 0.05 }}
                                  >
                                    <motion.div
                                      className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center text-rose-500 group-hover:from-rose-100 group-hover:to-pink-100"
                                      whileHover={{ scale: 1.1 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      {subcategory.icon}
                                    </motion.div>
                                    <span className="text-zinc-700 text-xs font-medium flex items-center gap-1">
                                      {subcategory.name}
                                      <AnimatedEmoji 
                                        emoji={subcategory.emoji}
                                        animation="bounce"
                                        size="small"
                                        delay={subIndex * 0.05}
                                      />
                                    </span>
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Search Dropdown Component
function SearchDropdown({ 
  isOpen, 
  searchResults, 
  onProductSelect,
  isLoading 
}: { 
  isOpen: boolean; 
  searchResults: SearchResult[];
  onProductSelect: (product: SearchResult) => void;
  isLoading: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-md border-2 border-amber-200 rounded-2xl shadow-[4px_4px_0px_0px] shadow-amber-600/20 z-50 overflow-hidden max-h-96"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">Searching products...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-4 text-center">
              <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No products found</p>
              <p className="text-xs text-gray-500">Try different keywords</p>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              <div className="p-2">
                <p className="text-xs font-medium text-gray-500 mb-2 px-2">
                  {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
                </p>
                <div className="space-y-1">
                  {searchResults.map((product, index) => (
                    <motion.button
                      key={product.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => onProductSelect(product)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-amber-50 hover:to-purple-50 transition-all duration-200 group"
                      whileHover={{ x: 2, scale: 1.005 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=100';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="font-semibold text-sm text-zinc-900 truncate group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                          <span className="font-bold text-amber-600">${product.price}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// User Dropdown Component
function UserDropdown({
  isOpen,
  user,
  onLogout,
  onNavigate
}: {
  isOpen: boolean;
  user: User;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}) {
  const { isAdmin } = useAppContext();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md border-2 border-amber-200 rounded-2xl shadow-[4px_4px_0px_0px] shadow-amber-600/20 z-50 overflow-hidden"
        >
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-200"
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-purple-100 flex items-center justify-center text-amber-600 border-2 border-amber-300"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <User className="h-5 w-5" />
              </motion.div>
              <div className="flex-1">
                <p className="font-bold text-zinc-900 text-sm flex items-center gap-1">
                  {user.name}
                  <AnimatedEmoji 
                    emoji="👋"
                    animation="wiggle"
                    size="small"
                    delay={0}
                  />
                </p>
                <p className="text-xs text-zinc-600 font-medium">{user.email}</p>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              <motion.button
                variants={itemFadeIn}
                onClick={() => onNavigate("account")}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gradient-to-r hover:from-amber-50 hover:to-purple-50 transition-all duration-200 group"
                whileHover={{ x: 2, scale: 1.005 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-purple-100 flex items-center justify-center text-amber-600 group-hover:from-amber-200 group-hover:to-purple-200"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </motion.div>
                <span className="font-semibold text-zinc-900 text-sm flex items-center gap-1">
                  My Profile
                  <AnimatedEmoji
                    emoji="👤"
                    animation="pulse"
                    size="small"
                    delay={0}
                  />
                </span>
                <ChevronRight className="h-4 w-4 text-amber-600 ml-auto" />
              </motion.button>


              <motion.button
                variants={itemFadeIn}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gradient-to-r hover:from-amber-50 hover:to-purple-50 transition-all duration-200 group"
                whileHover={{ x: 2, scale: 1.005 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-purple-100 flex items-center justify-center text-amber-600 group-hover:from-amber-200 group-hover:to-purple-200"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingBag className="h-4 w-4" />
                </motion.div>
                <span className="font-semibold text-zinc-900 text-sm flex items-center gap-1">
                  My Orders
                  <AnimatedEmoji 
                    emoji="📦"
                    animation="bounce"
                    size="small"
                    delay={0.1}
                  />
                </span>
                <ChevronRight className="h-4 w-4 text-amber-600 ml-auto" />
              </motion.button>

              {isAdmin && (
                <motion.button
                  variants={itemFadeIn}
                  onClick={() => onNavigate("admin")}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 group"
                  whileHover={{ x: 2, scale: 1.005 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-green-600 group-hover:from-green-200 group-hover:to-emerald-200"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Settings className="h-4 w-4" />
                  </motion.div>
                  <span className="font-semibold text-green-600 text-sm flex items-center gap-1">
                    Admin Panel
                    <AnimatedEmoji 
                      emoji="⚡"
                      animation="bounce"
                      size="small"
                      delay={0.2}
                    />
                  </span>
                  <ChevronRight className="h-4 w-4 text-green-600 ml-auto" />
                </motion.button>
              )}

              <motion.button
                variants={itemFadeIn}
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 group"
                whileHover={{ x: 2, scale: 1.005 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center text-red-600 group-hover:from-red-200 group-hover:to-pink-200"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <LogOut className="h-4 w-4" />
                </motion.div>
                <span className="font-semibold text-red-600 text-sm flex items-center gap-1">
                  Sign Out
                  <AnimatedEmoji 
                    emoji="👋"
                    animation="wiggle"
                    size="small"
                    delay={0.2}
                  />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Header Props Interface
interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  user: User | null;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

// Main Header Component
export function Header({
  currentPage,
  setCurrentPage,
  isMenuOpen,
  setIsMenuOpen,
  user,
  isAuthenticated,
  onLogin,
  onLogout
}: HeaderProps) {
  const { cartCount, searchQuery, setSearchQuery, wishlistCount, setSelectedProduct } = useAppContext();
  
  // Navigation dropdown states
  const [dropdowns, setDropdowns] = useState({
    men: false,
    women: false,
    kids: false,
    accessories: false,
    user: false
  });

  // Search functionality
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search products function
  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setIsSearchLoading(true);
    setShowSearchDropdown(true);

    try {
      // Search in database products
      const products = await adminService.getProducts();
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      const searchResults: SearchResult[] = filteredProducts.slice(0, 8).map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200',
        category: product.category,
        description: product.description
      }));

      setSearchResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearchLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProducts(searchQuery);
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Dropdown handlers
  const toggleDropdown = (dropdown: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      men: false,
      women: false,
      kids: false,
      accessories: false,
      user: false,
      [dropdown]: !prev[dropdown]
    }));
  };

  const closeAllDropdowns = useCallback(() => {
    setDropdowns({
      men: false,
      women: false,
      kids: false,
      accessories: false,
      user: false
    });
    setShowSearchDropdown(false);
  }, []);

  // Search handlers
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setShowSearchDropdown(false);
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage("search");
      setIsSearchOpen(false);
      setShowSearchDropdown(false);
      closeAllDropdowns();
    }
  };

  const handleProductSelect = (product: SearchResult) => {
    // Convert search result to detailed product format
    const detailProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.price * 1.25,
      images: [
        product.image,
        product.image,
        product.image,
        product.image
      ],
      category: product.category,
      description: product.description,
      features: [
        "Premium Quality Materials",
        "Comfortable Fit",
        "Durable Construction",
        "Easy Care Instructions",
        "Versatile Style"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Navy Blue", value: "#1e3a8a", available: true },
        { name: "Charcoal Gray", value: "#374151", available: true },
        { name: "Forest Green", value: "#166534", available: true },
        { name: "Burgundy", value: "#991b1b", available: false }
      ],
      rating: 4.6 + Math.random() * 0.4,
      reviews: Math.floor(Math.random() * 200) + 50,
      inStock: true,
      fastShipping: true,
      brand: "Outlander"
    };

    setSelectedProduct(detailProduct);
    setCurrentPage("product-detail");
    setIsSearchOpen(false);
    setShowSearchDropdown(false);
    setSearchQuery("");
    closeAllDropdowns();
  };

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        closeAllDropdowns();
      }
      if (!target.closest('[data-search]')) {
        setIsSearchOpen(false);
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeAllDropdowns]);

  // Navigation handler
  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    closeAllDropdowns();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-amber-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Mountain className="h-6 w-6 text-white" style={{ marginLeft: '-2px' }} />
            </motion.div>
            <div className="hidden sm:block">
              <TypewriterText
                text="Outlander"
                className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-purple-600"
                delay={0}
                speed={100}
              />
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-xs text-zinc-500 flex items-center gap-1 -mt-1"
              >
                <AnimatedEmoji emoji="🌟" animation="twinkle" size="small" delay={1.5} />
                Summer Collection
                <AnimatedEmoji emoji="☀️" animation="pulse" size="small" delay={1.8} />
              </motion.p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="relative" data-dropdown>
                <motion.button
                  onClick={() => {
                    if (item.hasDropdown) {
                      toggleDropdown(item.name.toLowerCase() as keyof typeof dropdowns);
                    } else {
                      handleNavigation(item.page);
                    }
                  }}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-2 group ${
                    currentPage === item.page
                      ? "bg-gradient-to-r from-amber-500 to-purple-500 text-white shadow-lg"
                      : "text-zinc-700 hover:text-amber-600 hover:bg-amber-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <motion.div
                      animate={{ rotate: dropdowns[item.name.toLowerCase() as keyof typeof dropdowns] ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </motion.div>
                  )}
                </motion.button>

                {/* Dropdown Menus */}
                {item.hasDropdown && (
                  <>
                    {item.name === "Men" && (
                      <MensDropdown
                        isOpen={dropdowns.men}
                        onNavigate={handleNavigation}
                      />
                    )}
                    {item.name === "Women" && (
                      <WomensDropdown
                        isOpen={dropdowns.women}
                        onNavigate={handleNavigation}
                      />
                    )}
                    {item.name === "Kids" && (
                      <KidsDropdown
                        isOpen={dropdowns.kids}
                        onNavigate={handleNavigation}
                      />
                    )}
                    {item.name === "Accessories" && (
                      <AccessoriesDropdown
                        isOpen={dropdowns.accessories}
                        onNavigate={handleNavigation}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative" data-search>
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "300px" }}
                    exit={{ opacity: 0, width: 0 }}
                  >
                    <form
                      onSubmit={handleSearchSubmit}
                      className="relative"
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          if (e.target.value.trim()) {
                            setShowSearchDropdown(true);
                          }
                        }}
                        onFocus={() => {
                          if (searchQuery.trim()) {
                            setShowSearchDropdown(true);
                          }
                        }}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 text-sm border-2 border-amber-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white/90 backdrop-blur-sm"
                      />
                    </form>
                    
                    {/* Search Dropdown */}
                    <SearchDropdown
                      isOpen={showSearchDropdown}
                      searchResults={searchResults}
                      onProductSelect={handleProductSelect}
                      isLoading={isSearchLoading}
                    />
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={handleSearchToggle}
                    className="p-2.5 text-zinc-700 hover:text-amber-600 hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-500 rounded-full transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search className="h-5 w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Button */}
            <motion.button
              onClick={() => handleNavigation("wishlist")}
              className="relative p-2.5 text-zinc-700 hover:text-rose-600 hover:bg-rose-50 border-2 border-amber-300 hover:border-rose-400 rounded-full transition-all duration-200 bg-white/80 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`h-5 w-5 ${currentPage === "wishlist" ? "fill-current text-rose-600" : ""}`} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </motion.button>

            {/* Cart Button */}
            <motion.button
              onClick={() => handleNavigation("cart")}
              className="relative p-2.5 text-zinc-700 hover:text-amber-600 hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-500 rounded-full transition-all duration-200 bg-white/80 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-purple-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>



            {/* User Button */}
            <div className="relative" data-dropdown>
              {isAuthenticated && user ? (
                <motion.button
                  onClick={() => toggleDropdown("user")}
                  className="p-2.5 text-zinc-700 hover:text-amber-600 hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-500 rounded-full transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="h-5 w-5" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={onLogin}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 text-white font-bold rounded-full text-sm transition-all duration-200 flex items-center gap-2"
                  style={{ marginRight: '1px', padding: '7px 14px 5px' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="h-4 w-4" />
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>Sign In</span>
                </motion.button>
              )}

              {/* User Dropdown */}
              {isAuthenticated && user && (
                <UserDropdown
                  isOpen={dropdowns.user}
                  user={user}
                  onNavigate={handleNavigation}
                  onLogout={onLogout}
                />
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-zinc-700 hover:text-amber-600 hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-500 rounded-full transition-all duration-200 bg-white/80 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-amber-200/50 py-4"
            >
              <div className="space-y-3">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavigation(item.page)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-between group ${
                      currentPage === item.page
                        ? "bg-gradient-to-r from-amber-500 to-purple-500 text-white shadow-lg"
                        : "text-zinc-700 hover:text-amber-600 hover:bg-amber-50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      {item.name}
                    </div>
                    {item.hasDropdown && (
                      <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                    )}
                  </motion.button>
                ))}
                
                {/* Mobile Additional Options */}
                <div className="pt-2 border-t border-amber-200/50 space-y-2">
                  <motion.button
                    onClick={() => handleNavigation("size-guide")}
                    className="w-full text-left px-4 py-2 rounded-lg text-sm text-zinc-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Ruler className="h-4 w-4" />
                    Size Guide
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleNavigation("social-handle")}
                    className="w-full text-left px-4 py-2 rounded-lg text-sm text-zinc-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Share2 className="h-4 w-4" />
                    Social Media
                  </motion.button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
