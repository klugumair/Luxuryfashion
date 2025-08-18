import { motion } from "framer-motion";
import { Mountain, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AnimatedEmoji } from "./animations";
import { fadeIn } from "./constants";

// Optimized Social Icons Component
function SocialIcons({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const socialPlatforms = [
    { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
    { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
    { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
  ];

  return (
    <div className="flex space-x-3">
      {socialPlatforms.map((social, index) => (
        <motion.div 
          key={index} 
          whileHover={{ y: -1, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <button 
            onClick={() => setCurrentPage('social-handle')}
            className="text-zinc-600 hover:text-amber-600 transition-colors duration-200"
          >
            {social.icon}
            <span className="sr-only">{social.label}</span>
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// Optimized Footer Component
export function Footer({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <footer className="w-full border-t border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-purple-50/50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="container grid gap-6 px-4 py-10 md:px-6 lg:grid-cols-4 mx-auto"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: [0, -6, 6, -6, 0], scale: 1.05 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-purple-500 flex items-center justify-center"
            >
              <Mountain className="h-5 w-5 text-white" />
            </motion.div>
            <span className="font-black text-xl bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">Outlander</span>
            <AnimatedEmoji 
              emoji="🏔️"
              animation="float"
              size="small"
              delay={0}
            />
          </div>
          <p className="text-sm text-zinc-600 font-medium">
            Premium outdoor and adventure clothing for the modern explorer. Quality, comfort, and style for every journey.
          </p>
          <div className="flex items-center gap-2">
            <SocialIcons setCurrentPage={setCurrentPage} />
            <AnimatedEmoji 
              emoji="🌐"
              animation="rotate"
              size="small"
              delay={0.3}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h3 className="text-lg font-black flex items-center gap-1">
              Shop
              <AnimatedEmoji 
                emoji="🛍️"
                animation="bounce"
                size="small"
                delay={0}
              />
            </h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200 flex items-center gap-1">
                Men's Collection
                <AnimatedEmoji 
                  emoji="👨"
                  animation="pulse"
                  size="small"
                  delay={0}
                />
              </a>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200 flex items-center gap-1">
                Women's Collection
                <AnimatedEmoji 
                  emoji="👩"
                  animation="pulse"
                  size="small"
                  delay={0.1}
                />
              </a>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200 flex items-center gap-1">
                Kids Collection
                <AnimatedEmoji 
                  emoji="🧒"
                  animation="pulse"
                  size="small"
                  delay={0.2}
                />
              </a>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200 flex items-center gap-1">
                Summer Collection
                <AnimatedEmoji 
                  emoji="🌞"
                  animation="pulse"
                  size="small"
                  delay={0.3}
                />
              </a>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-black flex items-center gap-1">
              Company
              <AnimatedEmoji 
                emoji="🏢"
                animation="wiggle"
                size="small"
                delay={0}
              />
            </h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200">
                About Us
              </a>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200">
                Our Story
              </a>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200">
                Careers
              </a>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200">
                Press
              </a>
            </nav>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h3 className="text-lg font-black flex items-center gap-1">
              Help
              <AnimatedEmoji 
                emoji="🆘"
                animation="shake"
                size="small"
                delay={0}
              />
            </h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <button 
                onClick={() => setCurrentPage('size-guide')}
                className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200 text-left"
              >
                Size Guide
              </button>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200">
                Shipping Info
              </a>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200">
                Care Instructions
              </a>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-black flex items-center gap-1">
              Support
              <AnimatedEmoji 
                emoji="🤝"
                animation="wiggle"
                size="small"
                delay={0}
              />
            </h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <button 
                onClick={() => setCurrentPage('social-handle')}
                className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200 text-left"
              >
                Contact Us
              </button>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200">
                FAQ
              </a>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200">
                Live Chat
              </a>
              <a href="#" className="text-zinc-600 hover:text-amber-600 font-medium transition-colors duration-200">
                Track Order
              </a>
            </nav>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-black flex items-center gap-1">
            Newsletter
            <AnimatedEmoji 
              emoji="📰"
              animation="bounce"
              size="small"
              delay={0}
            />
          </h3>
          <p className="text-sm text-zinc-600 font-medium">
            Subscribe for new arrivals, sales, and exclusive offers.
          </p>
          <form className="flex space-x-2">
            <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1 rounded-full border-amber-200 focus:border-amber-400" />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="rounded-full bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold flex items-center gap-1">
                Subscribe
                <AnimatedEmoji 
                  emoji="📧"
                  animation="bounce"
                  size="small"
                  delay={0}
                />
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
      <div className="border-t border-amber-200/50">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0 mx-auto px-4">
          <p className="text-xs text-zinc-600 font-medium flex items-center gap-1">
            &copy; {new Date().getFullYear()} Outlander. All rights reserved.
            <AnimatedEmoji 
              emoji="©️"
              animation="pulse"
              size="small"
              delay={0}
            />
          </p>
          <p className="text-xs text-zinc-600 font-medium flex items-center gap-1">
            Adventure awaits in every thread
            <AnimatedEmoji 
              emoji="🧵"
              animation="wiggle"
              size="small"
              delay={0.3}
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
