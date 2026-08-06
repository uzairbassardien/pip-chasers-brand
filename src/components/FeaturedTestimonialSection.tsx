import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, CheckCircle2, Quote, Star, TrendingUp } from "lucide-react";

const latestTrades = [
  { pair: "NAS100", setup: "London session", result: "+82 pips", status: "TP Hit" },
  { pair: "XAUUSD", setup: "NY continuation", result: "+46 pips", status: "Secured" },
  { pair: "US30", setup: "Break and retest", result: "+64 pips", status: "TP Hit" },
];

export function FeaturedTestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-light/20 to-transparent" />

      <div className="container-custom relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-5 gap-8 items-stretch"
        >
          <div className="lg:col-span-3 p-8 md:p-10 rounded-2xl bg-card border border-gold/20 shadow-[0_0_40px_-18px_hsl(217_91%_50%_/_0.35)]">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/30 flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-gold">G</span>
              </div>
              <div>
                <p className="font-display text-2xl font-bold">Garshwin</p>
                <p className="text-sm text-muted-foreground">Pip Chasers Member</p>
              </div>
              <div className="flex gap-1 sm:ml-auto">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
            </div>

            <Quote className="w-10 h-10 text-gold/20 mb-5" />
            <blockquote className="font-display text-2xl md:text-3xl leading-relaxed mb-6">
              Pip Chasers helped me slow down, wait for better confirmations, and
              trade with a real plan instead of chasing every move.
            </blockquote>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Garshwin came in looking for cleaner entries and better discipline.
              With structured signals, risk management, and community support, his
              trading became more patient, selective, and consistent.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {["Cleaner entries", "Stronger risk control", "More confidence"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-charcoal-light to-card border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-1">
                  Latest Trades
                </p>
                <h3 className="font-display text-xl font-bold">Screenshot Preview</h3>
              </div>
              <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gold" />
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gold/20 bg-background/80">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/80">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-auto text-xs text-muted-foreground">Garshwin-trades.png</span>
              </div>

              <div className="p-4 space-y-3">
                {latestTrades.map((trade) => (
                  <div
                    key={trade.pair}
                    className="p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="font-display font-semibold">{trade.pair}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-500">
                        {trade.result}
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <span>{trade.setup}</span>
                      <span className="px-2 py-1 rounded-full bg-gold/10 text-gold">
                        {trade.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
