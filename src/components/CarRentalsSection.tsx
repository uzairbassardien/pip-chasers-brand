import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Car, Shield, Clock, Camera, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import luxuryCarImage from "@/assets/luxury-car-hero.jpg";

const features = [
  {
    icon: Car,
    title: "Premium Fleet",
    description: "Luxury vehicles that make a statement",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Professional drivers & full insurance",
  },
  {
    icon: Clock,
    title: "Always On Time",
    description: "Punctuality is non-negotiable",
  },
  {
    icon: Camera,
    title: "Photo Ready",
    description: "Spotless cars for perfect photos",
  },
];

const occasions = [
  "Matric Balls",
  "Special Events",
  "Photoshoots",
  "Celebrations",
];

export function CarRentalsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rentals" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal-light/50" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-custom relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-background border border-border relative shadow-xl">
              <img 
                src={luxuryCarImage} 
                alt="Luxury sports car for matric ball rentals"
                className="w-full h-full object-cover"
              />
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full border border-gold/30 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  <span className="text-sm text-gold font-medium">Now Booking for 2025</span>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full border border-gold/20 mb-6">
              <span className="text-xs font-semibold text-gold tracking-wider uppercase">
                Luxury Division
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Arrive in{" "}
              <span className="text-gradient-gold">Style</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Make your special moments unforgettable with our premium car rental 
              service. Perfect for matric balls, events, and professional photoshoots.
            </p>

            {/* Occasions Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {occasions.map((occasion) => (
                <span
                  key={occasion}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground"
                >
                  {occasion}
                </span>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm mb-0.5">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" size="lg" className="group">
                Book Your Matric Ride
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="goldOutline" size="lg">
                View Fleet
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
