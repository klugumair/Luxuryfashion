import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AnimatedEmoji, TypewriterText } from "../animations";
import { staggerContainer, itemFadeIn } from "../constants";
import { Ruler, User, Users, Baby, Shirt, ChevronDown, ChevronUp } from "lucide-react";

// Size data
const mensSizes = [
  { size: "XS", chest: "34-36", waist: "28-30", hips: "34-36", neck: "14-14.5" },
  { size: "S", chest: "36-38", waist: "30-32", hips: "36-38", neck: "15-15.5" },
  { size: "M", chest: "38-40", waist: "32-34", hips: "38-40", neck: "16-16.5" },
  { size: "L", chest: "40-42", waist: "34-36", hips: "40-42", neck: "17-17.5" },
  { size: "XL", chest: "42-44", waist: "36-38", hips: "42-44", neck: "18-18.5" },
  { size: "XXL", chest: "44-46", waist: "38-40", hips: "44-46", neck: "19-19.5" },
  { size: "XXXL", chest: "46-48", waist: "40-42", hips: "46-48", neck: "20-20.5" },
];

const womensSizes = [
  { size: "XS", bust: "32-34", waist: "24-26", hips: "34-36", dress: "0-2" },
  { size: "S", bust: "34-36", waist: "26-28", hips: "36-38", dress: "4-6" },
  { size: "M", bust: "36-38", waist: "28-30", hips: "38-40", dress: "8-10" },
  { size: "L", bust: "38-40", waist: "30-32", hips: "40-42", dress: "12-14" },
  { size: "XL", bust: "40-42", waist: "32-34", hips: "42-44", dress: "16-18" },
  { size: "XXL", bust: "42-44", waist: "34-36", hips: "44-46", dress: "20-22" },
  { size: "XXXL", bust: "44-46", waist: "36-38", hips: "46-48", dress: "24-26" },
];

const kidsSizes = [
  { age: "2-3Y", height: "35-38", chest: "20-21", waist: "19-20" },
  { age: "3-4Y", height: "38-41", chest: "21-22", waist: "20-21" },
  { age: "4-5Y", height: "41-44", chest: "22-23", waist: "21-22" },
  { age: "5-6Y", height: "44-47", chest: "23-24", waist: "22-23" },
  { age: "6-7Y", height: "47-50", chest: "24-25", waist: "23-24" },
  { age: "7-8Y", height: "50-53", chest: "25-26", waist: "24-25" },
  { age: "8-9Y", height: "53-56", chest: "26-27", waist: "25-26" },
  { age: "9-10Y", height: "56-59", chest: "27-28", waist: "26-27" },
  { age: "10-11Y", height: "59-62", chest: "28-29", waist: "27-28" },
  { age: "11-12Y", height: "62-65", chest: "29-30", waist: "28-29" },
];

const measurementGuide = [
  {
    title: "Chest/Bust",
    instruction: "Measure around the fullest part of your chest/bust, keeping the tape horizontal.",
    emoji: "👔",
    tip: "Keep your arms relaxed at your sides"
  },
  {
    title: "Waist",
    instruction: "Measure around your natural waistline, which is the narrowest part of your torso.",
    emoji: "📏",
    tip: "Don't pull the tape too tight"
  },
  {
    title: "Hips",
    instruction: "Measure around the fullest part of your hips, about 8 inches below your waist.",
    emoji: "🍑",
    tip: "Stand with feet together"
  },
  {
    title: "Inseam",
    instruction: "Measure from the top of your inner thigh down to your ankle bone.",
    emoji: "👖",
    tip: "Use your best-fitting pants as reference"
  },
  {
    title: "Sleeve Length",
    instruction: "Measure from your shoulder point to your wrist with your arm slightly bent.",
    emoji: "👕",
    tip: "Have someone help you for accuracy"
  },
];

const fitTips = [
  {
    category: "T-Shirts & Casual Wear",
    emoji: "👕",
    tips: [
      "For a relaxed fit, choose your normal size",
      "For a fitted look, size down one size",
      "For an oversized style, size up one size"
    ]
  },
  {
    category: "Dress Shirts",
    emoji: "👔",
    tips: [
      "Collar should fit comfortably without being too tight",
      "Shoulder seams should align with your shoulder points",
      "Allow room for movement without excess fabric"
    ]
  },
  {
    category: "Pants & Jeans",
    emoji: "👖",
    tips: [
      "Waist should sit comfortably without a belt",
      "Consider your preferred rise (low, mid, or high)",
      "Length can be tailored if needed"
    ]
  },
  {
    category: "Activewear",
    emoji: "🏃",
    tips: [
      "Choose a snug but comfortable fit",
      "Fabrics should move with your body",
      "Consider moisture-wicking properties"
    ]
  },
];

const conversionChart = [
  { us: "XS", eu: "32", uk: "6", chest: "34-36" },
  { us: "S", eu: "34", uk: "8", chest: "36-38" },
  { us: "M", eu: "36", uk: "10", chest: "38-40" },
  { us: "L", eu: "38", uk: "12", chest: "40-42" },
  { us: "XL", eu: "40", uk: "14", chest: "42-44" },
  { us: "XXL", eu: "42", uk: "16", chest: "44-46" },
];

interface MeasurementCardProps {
  measurement: typeof measurementGuide[0];
  index: number;
}

function MeasurementCard({ measurement, index }: MeasurementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={itemFadeIn}
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-md border-2 border-amber-200 rounded-2xl shadow-[4px_4px_0px_0px] shadow-amber-600/20 overflow-hidden"
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left hover:bg-amber-50/50 transition-colors duration-200"
        whileHover={{ backgroundColor: "rgba(251, 191, 36, 0.05)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-purple-100 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatedEmoji 
                emoji={measurement.emoji}
                animation="bounce"
                size="medium"
                delay={index * 0.1}
              />
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
                {measurement.title}
                <AnimatedEmoji 
                  emoji="📐"
                  animation="pulse"
                  size="small"
                  delay={index * 0.1 + 0.2}
                />
              </h3>
              <p className="text-zinc-600 text-sm">{measurement.instruction}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-amber-600" />
          </motion.div>
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-6 pb-6 bg-gradient-to-r from-amber-50/50 to-purple-50/50"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-amber-200">
              <p className="font-medium text-amber-700 flex items-center gap-2">
                <AnimatedEmoji 
                  emoji="💡"
                  animation="bounce"
                  size="small"
                  delay={0}
                />
                Pro Tip: {measurement.tip}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState("men");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-purple-50/50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-20 pb-16 px-4"
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <AnimatedEmoji 
              emoji="📏"
              animation="bounce"
              size="large"
              delay={0}
            />
          </motion.div>
          
          <TypewriterText
            text="Size Guide"
            className="text-4xl md:text-6xl font-black bg-gradient-to-r from-amber-600 via-orange-600 to-purple-600 bg-clip-text text-transparent mb-6"
            delay={100}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-zinc-600 max-w-2xl mx-auto mb-8 flex items-center justify-center gap-2"
          >
            <AnimatedEmoji 
              emoji="✨"
              animation="spin"
              size="small"
              delay={0}
            />
            Find your perfect fit with our comprehensive sizing guide
            <AnimatedEmoji 
              emoji="🎯"
              animation="pulse"
              size="small"
              delay={0.3}
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              onClick={() => setActiveTab("men")}
              variant={activeTab === "men" ? "default" : "outline"}
              className="rounded-full font-bold px-6 py-3 flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Men's Sizes
              <AnimatedEmoji 
                emoji="👨"
                animation="wiggle"
                size="small"
                delay={0}
              />
            </Button>
            <Button
              onClick={() => setActiveTab("women")}
              variant={activeTab === "women" ? "default" : "outline"}
              className="rounded-full font-bold px-6 py-3 flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Women's Sizes
              <AnimatedEmoji 
                emoji="👩"
                animation="wiggle"
                size="small"
                delay={0.2}
              />
            </Button>
            <Button
              onClick={() => setActiveTab("kids")}
              variant={activeTab === "kids" ? "default" : "outline"}
              className="rounded-full font-bold px-6 py-3 flex items-center gap-2"
            >
              <Baby className="h-4 w-4" />
              Kids' Sizes
              <AnimatedEmoji 
                emoji="👶"
                animation="wiggle"
                size="small"
                delay={0.4}
              />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Size Charts Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="py-16 px-4"
      >
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Men's Sizes */}
            <TabsContent value="men" className="mt-8">
              <Card className="bg-white/80 backdrop-blur-md border-2 border-amber-200 shadow-[4px_4px_0px_0px] shadow-amber-600/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-black text-zinc-900 flex items-center justify-center gap-2">
                    <AnimatedEmoji 
                      emoji="👨"
                      animation="pulse"
                      size="medium"
                      delay={0}
                    />
                    Men's Size Chart
                    <AnimatedEmoji 
                      emoji="📊"
                      animation="bounce"
                      size="small"
                      delay={0.3}
                    />
                  </CardTitle>
                  <p className="text-zinc-600">All measurements in inches</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-amber-100 to-purple-100">
                          <th className="border-2 border-amber-200 p-3 font-bold text-zinc-900">Size</th>
                          <th className="border-2 border-amber-200 p-3 font-bold text-zinc-900">Chest</th>
                          <th className="border-2 border-amber-200 p-3 font-bold text-zinc-900">Waist</th>
                          <th className="border-2 border-amber-200 p-3 font-bold text-zinc-900">Hips</th>
                          <th className="border-2 border-amber-200 p-3 font-bold text-zinc-900">Neck</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mensSizes.map((size, index) => (
                          <motion.tr
                            key={size.size}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-amber-50/50 transition-colors duration-200"
                          >
                            <td className="border-2 border-amber-200 p-3 font-bold text-center bg-gradient-to-r from-amber-50 to-purple-50">
                              {size.size}
                            </td>
                            <td className="border-2 border-amber-200 p-3 text-center">{size.chest}</td>
                            <td className="border-2 border-amber-200 p-3 text-center">{size.waist}</td>
                            <td className="border-2 border-amber-200 p-3 text-center">{size.hips}</td>
                            <td className="border-2 border-amber-200 p-3 text-center">{size.neck}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Women's Sizes */}
            <TabsContent value="women" className="mt-8">
              <Card className="bg-white/80 backdrop-blur-md border-2 border-purple-200 shadow-[4px_4px_0px_0px] shadow-purple-600/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-black text-zinc-900 flex items-center justify-center gap-2">
                    <AnimatedEmoji 
                      emoji="👩"
                      animation="pulse"
                      size="medium"
                      delay={0}
                    />
                    Women's Size Chart
                    <AnimatedEmoji 
                      emoji="📊"
                      animation="bounce"
                      size="small"
                      delay={0.3}
                    />
                  </CardTitle>
                  <p className="text-zinc-600">All measurements in inches</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-100 to-rose-100">
                          <th className="border-2 border-purple-200 p-3 font-bold text-zinc-900">Size</th>
                          <th className="border-2 border-purple-200 p-3 font-bold text-zinc-900">Bust</th>
                          <th className="border-2 border-purple-200 p-3 font-bold text-zinc-900">Waist</th>
                          <th className="border-2 border-purple-200 p-3 font-bold text-zinc-900">Hips</th>
                          <th className="border-2 border-purple-200 p-3 font-bold text-zinc-900">Dress Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {womensSizes.map((size, index) => (
                          <motion.tr
                            key={size.size}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-purple-50/50 transition-colors duration-200"
                          >
                            <td className="border-2 border-purple-200 p-3 font-bold text-center bg-gradient-to-r from-purple-50 to-rose-50">
                              {size.size}
                            </td>
                            <td className="border-2 border-purple-200 p-3 text-center">{size.bust}</td>
                            <td className="border-2 border-purple-200 p-3 text-center">{size.waist}</td>
                            <td className="border-2 border-purple-200 p-3 text-center">{size.hips}</td>
                            <td className="border-2 border-purple-200 p-3 text-center">{size.dress}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Kids' Sizes */}
            <TabsContent value="kids" className="mt-8">
              <Card className="bg-white/80 backdrop-blur-md border-2 border-rose-200 shadow-[4px_4px_0px_0px] shadow-rose-600/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-black text-zinc-900 flex items-center justify-center gap-2">
                    <AnimatedEmoji 
                      emoji="👶"
                      animation="pulse"
                      size="medium"
                      delay={0}
                    />
                    Kids' Size Chart
                    <AnimatedEmoji 
                      emoji="📊"
                      animation="bounce"
                      size="small"
                      delay={0.3}
                    />
                  </CardTitle>
                  <p className="text-zinc-600">All measurements in inches</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-rose-100 to-pink-100">
                          <th className="border-2 border-rose-200 p-3 font-bold text-zinc-900">Age</th>
                          <th className="border-2 border-rose-200 p-3 font-bold text-zinc-900">Height</th>
                          <th className="border-2 border-rose-200 p-3 font-bold text-zinc-900">Chest</th>
                          <th className="border-2 border-rose-200 p-3 font-bold text-zinc-900">Waist</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kidsSizes.map((size, index) => (
                          <motion.tr
                            key={size.age}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-rose-50/50 transition-colors duration-200"
                          >
                            <td className="border-2 border-rose-200 p-3 font-bold text-center bg-gradient-to-r from-rose-50 to-pink-50">
                              {size.age}
                            </td>
                            <td className="border-2 border-rose-200 p-3 text-center">{size.height}</td>
                            <td className="border-2 border-rose-200 p-3 text-center">{size.chest}</td>
                            <td className="border-2 border-rose-200 p-3 text-center">{size.waist}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* Measurement Guide Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="py-16 px-4 bg-gradient-to-r from-amber-50/30 to-purple-50/30"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-zinc-900 mb-4 flex items-center justify-center gap-3">
              <AnimatedEmoji 
                emoji="📐"
                animation="bounce"
                size="medium"
                delay={0}
              />
              How to Measure
              <AnimatedEmoji 
                emoji="✏️"
                animation="wiggle"
                size="small"
                delay={0.3}
              />
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
              <AnimatedEmoji 
                emoji="💡"
                animation="pulse"
                size="small"
                delay={0}
              />
              Follow these simple steps to get accurate measurements
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {measurementGuide.map((measurement, index) => (
              <MeasurementCard 
                key={measurement.title}
                measurement={measurement}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Fit Tips Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="py-16 px-4"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-zinc-900 mb-4 flex items-center justify-center gap-3">
              <AnimatedEmoji 
                emoji="🎯"
                animation="bounce"
                size="medium"
                delay={0}
              />
              Fit Recommendations
              <AnimatedEmoji 
                emoji="👍"
                animation="wiggle"
                size="small"
                delay={0.3}
              />
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
              <AnimatedEmoji 
                emoji="✨"
                animation="spin"
                size="small"
                delay={0}
              />
              Get the perfect fit for different clothing types
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6"
          >
            {fitTips.map((tip, index) => (
              <motion.div
                key={tip.category}
                variants={itemFadeIn}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-md border-2 border-amber-200 rounded-2xl shadow-[4px_4px_0px_0px] shadow-amber-600/20 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-purple-100 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AnimatedEmoji 
                      emoji={tip.emoji}
                      animation="bounce"
                      size="medium"
                      delay={index * 0.1}
                    />
                  </motion.div>
                  <h3 className="font-bold text-lg text-zinc-900">{tip.category}</h3>
                </div>
                <ul className="space-y-2">
                  {tip.tips.map((tipText, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-zinc-600">
                      <AnimatedEmoji 
                        emoji="•"
                        animation="pulse"
                        size="small"
                        delay={tipIndex * 0.1}
                      />
                      {tipText}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* International Conversion Chart */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="py-16 px-4 bg-gradient-to-r from-purple-50/30 to-rose-50/30"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-zinc-900 mb-4 flex items-center justify-center gap-3">
              <AnimatedEmoji 
                emoji="🌍"
                animation="spin"
                size="medium"
                delay={0}
              />
              International Size Conversion
              <AnimatedEmoji 
                emoji="🔄"
                animation="bounce"
                size="small"
                delay={0.3}
              />
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
              <AnimatedEmoji 
                emoji="📍"
                animation="pulse"
                size="small"
                delay={0}
              />
              Size equivalents across different regions
            </p>
          </motion.div>

          <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border-2 border-purple-200 shadow-[4px_4px_0px_0px] shadow-purple-600/20">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-100 to-rose-100">
                      <th className="border-2 border-purple-200 p-4 font-bold text-zinc-900">
                        <div className="flex items-center justify-center gap-2">
                          <AnimatedEmoji emoji="🇺🇸" animation="wiggle" size="small" delay={0} />
                          US
                        </div>
                      </th>
                      <th className="border-2 border-purple-200 p-4 font-bold text-zinc-900">
                        <div className="flex items-center justify-center gap-2">
                          <AnimatedEmoji emoji="🇪🇺" animation="wiggle" size="small" delay={0.1} />
                          EU
                        </div>
                      </th>
                      <th className="border-2 border-purple-200 p-4 font-bold text-zinc-900">
                        <div className="flex items-center justify-center gap-2">
                          <AnimatedEmoji emoji="🇬🇧" animation="wiggle" size="small" delay={0.2} />
                          UK
                        </div>
                      </th>
                      <th className="border-2 border-purple-200 p-4 font-bold text-zinc-900">Chest (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversionChart.map((conversion, index) => (
                      <motion.tr
                        key={conversion.us}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-purple-50/50 transition-colors duration-200"
                      >
                        <td className="border-2 border-purple-200 p-4 font-bold text-center bg-gradient-to-r from-purple-50 to-rose-50">
                          {conversion.us}
                        </td>
                        <td className="border-2 border-purple-200 p-4 text-center">{conversion.eu}</td>
                        <td className="border-2 border-purple-200 p-4 text-center">{conversion.uk}</td>
                        <td className="border-2 border-purple-200 p-4 text-center">{conversion.chest}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Need Help Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="py-16 px-4"
      >
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-amber-100 to-purple-100 border-2 border-amber-300 shadow-[4px_4px_0px_0px] shadow-amber-600/20">
            <CardContent className="text-center p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="mb-4"
              >
                <AnimatedEmoji 
                  emoji="🤔"
                  animation="bounce"
                  size="large"
                  delay={0}
                />
              </motion.div>
              
              <h3 className="text-2xl font-black text-zinc-900 mb-4 flex items-center justify-center gap-2">
                Still Need Help?
                <AnimatedEmoji 
                  emoji="💬"
                  animation="wiggle"
                  size="small"
                  delay={0.3}
                />
              </h3>
              
              <p className="text-zinc-600 mb-6 flex items-center justify-center gap-2">
                <AnimatedEmoji 
                  emoji="👥"
                  animation="pulse"
                  size="small"
                  delay={0}
                />
                Our sizing experts are here to help you find the perfect fit
                <AnimatedEmoji 
                  emoji="✨"
                  animation="spin"
                  size="small"
                  delay={0.5}
                />
              </p>
              
              <Button className="rounded-full bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 font-bold px-8 py-3 flex items-center gap-2 mx-auto">
                <AnimatedEmoji 
                  emoji="📞"
                  animation="bounce"
                  size="small"
                  delay={0}
                />
                Contact Our Sizing Team
                <AnimatedEmoji 
                  emoji="➡️"
                  animation="float"
                  size="small"
                  delay={0.2}
                />
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  );
}