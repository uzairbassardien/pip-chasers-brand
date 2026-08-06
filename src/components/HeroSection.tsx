import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { lifestyleImages } from "@/lib/lifestyleImages";
import { scrollToSection } from "@/lib/scrollToSection";
import ThemeToggle from "./ThemeToggle";

const heroLifestyleImages = [
  { image: 1, top: "18%", left: "3%", size: "w-24 2xl:w-32", rotate: -10, delay: 0.15 },
  { image: 5, top: "28%", right: "4%", size: "w-28 2xl:w-36", rotate: 8, delay: 0.35 },
  { image: 9, bottom: "24%", left: "6%", size: "w-28 2xl:w-36", rotate: 7, delay: 0.55 },
  { image: 12, bottom: "18%", right: "7%", size: "w-24 2xl:w-32", rotate: -9, delay: 0.75 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mobile theme toggle positioned near top-right */}
      <div className="absolute top-4 right-4 z-30 md:hidden">
        <ThemeToggle />
      </div>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(217_91%_50%_/_0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(217_91%_50%_/_0.05)_0%,_transparent_50%)]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(217 91% 50%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(217 91% 50%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[15%] w-2 h-2 bg-gold/40 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-[20%] w-3 h-3 bg-gold/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-[25%] w-1.5 h-1.5 bg-gold/50 rounded-full blur-sm"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden xl:block">
        {heroLifestyleImages.map((item, index) => {
          const image = lifestyleImages[item.image % lifestyleImages.length];

          return (
            <motion.figure
              key={image.src}
              className={`absolute ${item.size}`}
              style={{
                top: item.top,
                bottom: item.bottom,
                left: item.left,
                right: item.right,
                rotate: `${item.rotate}deg`,
              }}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: item.delay }}
            >
              <motion.img
                src={image.src}
                alt=""
                loading="eager"
                animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
                transition={{
                  duration: 6 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
                className="aspect-[4/5] w-full rounded-lg border border-white/75 object-cover opacity-95 shadow-[0_18px_50px_-22px_hsl(220_20%_15%_/_0.55)] ring-1 ring-gold/20"
              />
            </motion.figure>
          );
        })}
      </div>

      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-charcoal-light/80 border border-border backdrop-blur-sm"
          >
            <TrendingUp className="w-4 h-4 text-gold" />
            <span className="text-sm text-muted-foreground">
              NASDAQ • Gold • US30 • Forex
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-foreground"
          >
            Master the Markets with{" "}
            <span className="text-gradient-gold">Discipline</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Real execution. Real markets. Real results. Join a community of disciplined traders 
            focused on precision, consistency, and sustainable growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="hero"
              size="xl"
              className="group"
              onClick={() => scrollToSection("contact")}
            >
              Join Pip Chasers
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              onClick={() => scrollToSection("services")}
            >
              View Services
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-border/30"
          >
            {[
              { value: "5+", label: "Years Trading" },
              { value: "1000+", label: "Students Trained" },
              { value: "24/7", label: "Market Analysis" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
