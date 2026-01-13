import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Brain, Shield, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every trade is calculated. No gambling, no guessing.",
  },
  {
    icon: Brain,
    title: "Psychology",
    description: "Master your emotions. The mind is your greatest asset.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Protect your capital first. Profits follow discipline.",
  },
  {
    icon: TrendingUp,
    title: "Consistency",
    description: "Small wins compound. Patience builds empires.",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_hsl(45_80%_55%_/_0.03)_0%,_transparent_60%)]" />

      <div className="container-custom relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
              Our Story
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Built by a Trader,{" "}
              <span className="text-gradient-gold">For Traders</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Pip Chasers was founded by a young, self-made trader who discovered 
                that success in the markets isn't about luck or shortcuts—it's about 
                discipline, patience, and continuous learning.
              </p>
              <p>
                After years of mastering NASDAQ, Gold (XAUUSD), US30, and major forex 
                pairs, the mission became clear: share the real path to trading success 
                with those ready to put in the work.
              </p>
              <p className="text-foreground font-medium">
                No fake hype. No rented lambos. Just process, discipline, and 
                sustainable results.
              </p>
            </div>

            <div className="mt-8 p-6 bg-charcoal-light/50 rounded-xl border border-border">
              <blockquote className="italic text-lg text-foreground">
                "The market doesn't care about your feelings. Master yourself, 
                and you'll master the charts."
              </blockquote>
              <p className="mt-3 text-gold font-display font-semibold">
                — Pip Chasers Founder
              </p>
            </div>
          </motion.div>

          {/* Right - Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group p-6 bg-card rounded-xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-[0_0_30px_-10px_hsl(45_80%_55%_/_0.2)]"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <value.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
