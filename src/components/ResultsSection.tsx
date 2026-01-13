import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Calendar, BarChart, Zap } from "lucide-react";

const disciplines = [
  {
    icon: Clock,
    title: "Morning Routine",
    description: "Markets open with preparation. Pre-market analysis, key levels marked, mindset aligned.",
  },
  {
    icon: Calendar,
    title: "Consistent Schedule",
    description: "Same time, same process, every single day. Routine breeds excellence.",
  },
  {
    icon: BarChart,
    title: "Journal Everything",
    description: "Every trade documented. Winners and losers analyzed. Growth is tracked.",
  },
  {
    icon: Zap,
    title: "Execute the Plan",
    description: "No deviation. Trust the process. Emotions stay outside the charts.",
  },
];

export function ResultsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-light/20 to-transparent" />

      <div className="container-custom relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            The Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Results Follow{" "}
            <span className="text-gradient-gold">Discipline</span>
          </h2>
          <p className="text-muted-foreground">
            We don't chase profits. We chase consistency. The results are a 
            byproduct of relentless discipline and proper execution.
          </p>
        </motion.div>

        {/* Discipline Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {disciplines.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-4 border border-gold/20">
                <item.icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-2xl blur-xl" />
          <div className="relative p-10 md:p-14 bg-card rounded-2xl border border-gold/20 text-center">
            <div className="absolute top-6 left-6 text-6xl text-gold/20 font-display">"</div>
            <blockquote className="font-display text-2xl md:text-3xl font-medium leading-relaxed mb-6">
              Patience, discipline, and consistency are the three pillars of 
              sustainable trading success. Everything else is noise.
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="font-display font-bold text-gold">PC</span>
              </div>
              <div className="text-left">
                <p className="font-display font-semibold">Pip Chasers</p>
                <p className="text-sm text-muted-foreground">Founder & Lead Trader</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
