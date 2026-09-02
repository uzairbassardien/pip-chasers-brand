import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Quote } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { resultsImages } from "@/lib/resultsImages";

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-light/20 via-transparent to-charcoal-light/20" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="container-custom relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
              Testimonials & Results
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Real <span className="text-gradient-gold">Progress</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Screenshots from members who followed the process, stayed disciplined,
              and built stronger trading habits with Pip Chasers.
            </p>
          </motion.div>

          <div className="mb-12 rounded-3xl border border-gold/20 bg-gradient-to-r from-gold/10 via-card to-charcoal-light p-8 md:p-10 shadow-[0_0_60px_-25px_hsl(217_91%_50%_/_0.35)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <Quote className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold">Pip Chasers</p>
                <p className="font-display text-2xl font-semibold">Member Results</p>
              </div>
            </div>
            <p className="text-foreground/90 text-lg md:text-xl max-w-3xl leading-relaxed">
              The goal is not hype. It is better execution, cleaner risk management,
              and more confidence in every trade.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {resultsImages.map((image, index) => (
              <motion.figure
                key={image.src}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.5) }}
                className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={`Pip Chasers member result ${image.label || index + 1}`}
                    loading={index < 6 ? "eager" : "lazy"}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                </div>
                <figcaption className="px-4 py-3 text-sm text-muted-foreground border-t border-border bg-card/80">
                  Member result {image.label || index + 1}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
