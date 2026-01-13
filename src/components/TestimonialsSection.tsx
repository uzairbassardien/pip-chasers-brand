import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Thabo M.",
    role: "Trading Student",
    content: "Pip Chasers changed my approach to trading completely. The focus on discipline and risk management helped me stop gambling and start trading properly.",
    rating: 5,
    type: "trading",
  },
  {
    name: "Naledi K.",
    role: "Matric 2024",
    content: "The car rental service was incredible! Arrived on time, the car was spotless, and everyone at my matric ball was impressed. Highly recommend!",
    rating: 5,
    type: "rental",
  },
  {
    name: "James P.",
    role: "Forex Trader",
    content: "After months of losses, the mentorship program helped me find consistency. The community support and daily analysis are game-changers.",
    rating: 5,
    type: "trading",
  },
  {
    name: "Mpho S.",
    role: "Event Photoshoot",
    content: "Booked for a birthday photoshoot. Professional service, beautiful cars, and made my event photos look absolutely premium.",
    rating: 5,
    type: "rental",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What Our{" "}
            <span className="text-gradient-gold">Community</span> Says
          </h2>
          <p className="text-muted-foreground">
            Real feedback from real people who trusted Pip Chasers with their 
            trading journey and special moments.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative p-8 bg-card rounded-2xl border border-border hover:border-gold/20 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gold/10 group-hover:text-gold/20 transition-colors" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <span className="font-display font-bold text-gold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="ml-auto">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    testimonial.type === "trading"
                      ? "bg-gold/10 text-gold"
                      : "bg-foreground/10 text-foreground"
                  }`}>
                    {testimonial.type === "trading" ? "Trading" : "Car Rental"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
