import { motion } from "framer-motion";
import { useAppContext } from "../../App";
import { AnimatedEmoji } from "../animations";

interface AccessoriesPageProps {
  setCurrentPage?: (page: string) => void;
}

export function AccessoriesPage({ setCurrentPage }: AccessoriesPageProps) {
  const { setIsLoading } = useAppContext();

  const handleCategoryClick = (category: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (setCurrentPage) {
        setCurrentPage(category);
      }
    }, 800);
  };

  const categories = [
    {
      id: "men-accessories",
      title: "Men's Accessories",
      subtitle: "Premium accessories for the modern gentleman",
      gradient: "from-blue-500 to-purple-600",
      emoji: "👨‍💼"
    },
    {
      id: "women-accessories",
      title: "Women's Accessories",
      subtitle: "Elegant accessories for the sophisticated woman",
      gradient: "from-pink-500 to-purple-600",
      emoji: "👩‍💼"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-purple-50/50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-purple-100/30"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <AnimatedEmoji
              emoji="✨"
              animation="float"
              size="large"
              delay={0}
            />
            <h1 className="text-5xl font-black bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
              Accessories Collection
            </h1>
            <AnimatedEmoji
              emoji="💎"
              animation="bounce"
              size="large"
              delay={0.3}
            />
          </div>
          <p className="text-xl text-zinc-600 mb-8 flex items-center justify-center gap-2">
            <AnimatedEmoji
              emoji="🌟"
              animation="pulse"
              size="medium"
              delay={0.6}
            />
            Complete your look with our premium accessories collection
            <AnimatedEmoji
              emoji="👑"
              animation="wiggle"
              size="medium"
              delay={0.9}
            />
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1">
              <AnimatedEmoji
                emoji="🎯"
                animation="spin"
                size="small"
                delay={1.2}
              />
              Curated Selection
            </span>
            <span className="flex items-center gap-1">
              <AnimatedEmoji
                emoji="🏆"
                animation="bounce"
                size="small"
                delay={1.5}
              />
              Premium Quality
            </span>
            <span className="flex items-center gap-1">
              <AnimatedEmoji
                emoji="🚀"
                animation="float"
                size="small"
                delay={1.8}
              />
              Latest Trends
            </span>
          </div>
        </motion.div>
      </section>

      {/* Category Buttons Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-zinc-900 mb-4 flex items-center justify-center gap-3">
              <AnimatedEmoji
                emoji="🛍️"
                animation="bounce"
                size="large"
                delay={0}
              />
              Shop by Category
              <AnimatedEmoji
                emoji="💫"
                animation="spin"
                size="large"
                delay={0.3}
              />
            </h2>
            <p className="text-lg text-zinc-600 flex items-center justify-center gap-2">
              <AnimatedEmoji
                emoji="🎭"
                animation="wiggle"
                size="medium"
                delay={0.6}
              />
              Choose your perfect accessories collection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                onClick={() => handleCategoryClick(category.id)}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-zinc-100`}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Emoji */}
                  <div className="mb-4">
                    <AnimatedEmoji
                      emoji={category.emoji}
                      animation="bounce"
                      size="large"
                      delay={index * 0.3 + 0.7}
                    />
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${category.gradient} mb-3`}>
                    {category.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-zinc-600 mb-6 flex items-center justify-center gap-2">
                    <AnimatedEmoji
                      emoji="✨"
                      animation="pulse"
                      size="small"
                      delay={index * 0.4 + 1}
                    />
                    {category.subtitle}
                  </p>

                  {/* Call to Action */}
                  <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${category.gradient} text-white rounded-xl font-bold group-hover:shadow-lg transition-all duration-300`}>
                    <AnimatedEmoji
                      emoji="🛒"
                      animation="bounce"
                      size="small"
                      delay={index * 0.5 + 1.2}
                    />
                    Shop Now
                    <AnimatedEmoji
                      emoji="➡️"
                      animation="float"
                      size="small"
                      delay={index * 0.6 + 1.4}
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <AnimatedEmoji
                    emoji="💎"
                    animation="spin"
                    size="medium"
                    delay={index * 0.7 + 1.6}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-amber-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="text-3xl font-black text-zinc-900 mb-8 flex items-center justify-center gap-3">
              <AnimatedEmoji
                emoji="🎭"
                animation="wiggle"
                size="large"
                delay={0}
              />
              Why Choose Outlander Accessories?
              <AnimatedEmoji
                emoji="🏅"
                animation="bounce"
                size="large"
                delay={0.3}
              />
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  emoji: "🎨",
                  title: "Designer Quality",
                  description: "Handcrafted accessories from premium materials"
                },
                {
                  emoji: "🌍",
                  title: "Global Inspiration",
                  description: "Accessories inspired by cultures worldwide"
                },
                {
                  emoji: "💝",
                  title: "Perfect Gifts",
                  description: "Thoughtfully curated for every special occasion"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="mb-4">
                    <AnimatedEmoji
                      emoji={feature.emoji}
                      animation="bounce"
                      size="large"
                      delay={index * 0.3}
                    />
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-zinc-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}