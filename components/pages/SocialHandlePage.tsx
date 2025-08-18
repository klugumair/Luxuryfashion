import { motion } from "motion/react";
import { Instagram, Twitter, Facebook, Youtube, Mail, Users, Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { AnimatedEmoji } from "../animations";

const socialPlatforms = [
  {
    name: "Instagram",
    handle: "@outlander_official",
    followers: "2.4M",
    icon: Instagram,
    color: "from-pink-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-pink-50 to-purple-50",
    description: "Daily fashion inspiration & behind-the-scenes",
    verified: true,
    engagement: "12.8%",
    emoji: "📸"
  },
  {
    name: "TikTok",
    handle: "@outlander_style",
    followers: "1.8M",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M19.321 5.562a5.122 5.122 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.849-1.328-1.963-1.373-3.172-.013-.341-.013-.682 0-1.023h-3.59v12.644c-.021 1.677-1.4 3.031-3.099 3.031-1.677 0-3.036-1.354-3.036-3.031s1.359-3.031 3.036-3.031c.303 0 .594.045.87.128v-3.658c-.276-.021-.555-.032-.837-.032-3.771 0-6.831 3.049-6.831 6.809s3.06 6.809 6.831 6.809c3.771 0 6.831-3.049 6.831-6.809V8.282c1.328.938 2.953 1.492 4.702 1.492v-3.772c-.684 0-1.328-.128-1.924-.341z"/>
      </svg>
    ),
    color: "from-black to-red-500",
    bgColor: "bg-gradient-to-br from-gray-50 to-red-50",
    description: "Trendy outfit transitions & style tips",
    verified: true,
    engagement: "15.2%",
    emoji: "🎵"
  },
  {
    name: "Twitter",
    handle: "@outlander_co",
    followers: "485K",
    icon: Twitter,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    description: "Latest updates & customer support",
    verified: true,
    engagement: "8.3%",
    emoji: "🐦"
  },
  {
    name: "Facebook",
    handle: "OutlanderClothing",
    followers: "1.2M",
    icon: Facebook,
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    description: "Community discussions & events",
    verified: true,
    engagement: "6.7%",
    emoji: "👥"
  },
  {
    name: "YouTube",
    handle: "Outlander Official",
    followers: "892K",
    icon: Youtube,
    color: "from-red-500 to-red-700",
    bgColor: "bg-gradient-to-br from-red-50 to-orange-50",
    description: "Fashion hauls & styling tutorials",
    verified: true,
    engagement: "9.1%",
    emoji: "🎥"
  },
  {
    name: "Pinterest",
    handle: "@outlander_style",
    followers: "756K",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.001 24c6.624 0 11.999-5.373 11.999-12C24 5.373 18.627.001 12.001.001z"/>
      </svg>
    ),
    color: "from-red-600 to-pink-600",
    bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
    description: "Style boards & fashion inspiration",
    verified: true,
    engagement: "11.4%",
    emoji: "📌"
  }
];

const communityStats = [
  { label: "Total Followers", value: "8.5M+", icon: Users, emoji: "👥" },
  { label: "Engagement Rate", value: "11.2%", icon: Heart, emoji: "❤️" },
  { label: "Customer Reviews", value: "4.9/5", icon: Star, emoji: "⭐" },
  { label: "Active Communities", value: "150+", icon: Users, emoji: "🌍" }
];

export function SocialHandlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-purple-100 rounded-full px-6 py-3 mb-6">
            <AnimatedEmoji emoji="📱" animation="bounce" size="small" />
            <span className="font-bold text-amber-700">Social Media Hub</span>
            <AnimatedEmoji emoji="✨" animation="pulse" size="small" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-amber-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
              Connect With Us
            </span>
          </h1>
          
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto mb-8">
            Join our vibrant community across all platforms. Get the latest fashion updates, exclusive content, 
            and connect with fellow style enthusiasts worldwide.
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 text-center"
              >
                <AnimatedEmoji 
                  emoji={stat.emoji} 
                  animation="bounce" 
                  size="medium" 
                  delay={index * 0.2}
                  className="mb-2"
                />
                <div className="text-2xl font-black text-zinc-800">{stat.value}</div>
                <div className="text-sm text-zinc-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className={`${platform.bgColor} border-2 border-white/50 p-6 h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br from-black/20 to-transparent" />
                  <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br from-black/10 to-transparent" />
                </div>
                
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110`}>
                        <platform.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-zinc-900">{platform.name}</h3>
                          {platform.verified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-zinc-600 font-medium">{platform.handle}</p>
                      </div>
                    </div>
                    <AnimatedEmoji 
                      emoji={platform.emoji} 
                      animation="float" 
                      size="small" 
                      delay={index * 0.1}
                    />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-black text-zinc-800">{platform.followers}</div>
                      <div className="text-xs text-zinc-600 font-medium">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-zinc-800">{platform.engagement}</div>
                      <div className="text-xs text-zinc-600 font-medium">Engagement</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 font-medium mb-6">{platform.description}</p>

                  {/* Follow Button */}
                  <Button 
                    className={`w-full bg-gradient-to-r ${platform.color} hover:scale-105 font-bold text-white border-0 transition-transform`}
                  >
                    Follow Us
                    <AnimatedEmoji emoji="👋" animation="wiggle" size="small" className="ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-amber-500 via-purple-500 to-rose-500 p-1 rounded-3xl">
            <div className="bg-white rounded-3xl p-8 md:p-12 text-center">
              <AnimatedEmoji emoji="💌" animation="bounce" size="large" className="mb-4" />
              
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Stay In The Loop
              </h2>
              
              <p className="text-zinc-600 text-lg mb-8 max-w-2xl mx-auto">
                Get exclusive access to new collections, behind-the-scenes content, and special offers 
                delivered straight to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 rounded-full border-2 border-gray-200 focus:border-amber-400 text-center sm:text-left"
                />
                <Button className="h-12 px-8 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 rounded-full font-bold">
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <AnimatedEmoji emoji="🔒" animation="pulse" size="small" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <AnimatedEmoji emoji="📧" animation="bounce" size="small" />
                  <span>No Spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <AnimatedEmoji emoji="✨" animation="pulse" size="small" />
                  <span>Exclusive Content</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-black mb-4 flex items-center justify-center gap-2">
            Ready to Join Our Community?
            <AnimatedEmoji emoji="🚀" animation="bounce" size="medium" />
          </h3>
          <p className="text-zinc-600 mb-8 max-w-2xl mx-auto">
            Follow us on your favorite platforms and become part of the Outlander family. 
            Share your style, get inspired, and connect with thousands of fashion lovers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 rounded-full font-bold px-8">
              <Instagram className="w-5 h-5 mr-2" />
              Follow on Instagram
            </Button>
            <Button size="lg" variant="outline" className="rounded-full font-bold px-8 border-2">
              <Heart className="w-5 h-5 mr-2" />
              Share the Love
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}