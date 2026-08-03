import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { lifestyleImages } from "@/lib/lifestyleImages";

const LifestyleGallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-light/20 via-transparent to-charcoal-light/20" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="container-custom relative">
          <Link
            to="/#lifestyle"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
              Lifestyle Gallery
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              The Full{" "}
              <span className="text-gradient-gold">Lifestyle</span>
            </h1>
            <p className="text-muted-foreground">
              Moments from the Pip Chasers journey, community, and brand.
            </p>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {lifestyleImages.map((image, index) => (
              <motion.figure
                key={image.src}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.025, 0.45) }}
                className="group mb-5 break-inside-avoid overflow-hidden rounded-xl border border-border bg-card shadow-lg"
              >
                <img
                  src={image.src}
                  alt={`Pip Chasers lifestyle ${image.label}`}
                  loading={index < 8 ? "eager" : "lazy"}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LifestyleGallery;
