import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { lifestyleImages } from "@/lib/lifestyleImages";

export function LifestyleGallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const previewImages = lifestyleImages.slice(0, 6);

  return (
    <section id="lifestyle" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-light/20 via-transparent to-charcoal-light/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-custom relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            Lifestyle
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            The Pip Chasers{" "}
            <span className="text-gradient-gold">Lifestyle</span>
          </h2>
          <p className="text-muted-foreground">
            A look inside the discipline, energy, and community behind the brand.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {previewImages.map((image, index) => (
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.5) }}
              className="group aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card shadow-lg"
            >
              <img
                src={image.src}
                alt={`Pip Chasers lifestyle ${image.label}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex justify-center"
        >
          <Link to="/lifestyle-gallery">
            <Button variant="gold" size="lg" className="group">
              View More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
