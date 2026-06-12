import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, Zap } from "lucide-react";
import { Button } from "./ui/button";

const brokers = [
  {
    name: "HFM",
    tagline: "HF Markets",
    description:
      "Globally regulated broker with tight spreads, fast execution and a wide range of instruments.",
    icon: Shield,
    href: "https://www.hfm.com/",
  },
  {
    name: "JP Markets",
    tagline: "Africa's Largest Forex Broker",
    description:
      "Trusted South African broker with local support, fast deposits and competitive trading conditions.",
    icon: TrendingUp,
    href: "https://www.jpmarkets.co.za/",
  },
  {
    name: "Trade245",
    tagline: "Pro-Grade Trading",
    description:
      "Modern broker offering powerful platforms, low spreads and reliable execution for serious traders.",
    icon: Zap,
    href: "https://trade245.com/",
  },
];

export function BrokersSection() {
  return (
    <section id="brokers" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--primary)_/_0.05)_0%,_transparent_70%)]" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            Recommended Brokers
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Trade With <span className="text-gradient-gold">Trusted Brokers</span>
          </h2>
          <p className="text-muted-foreground">
            Pip Chasers partners with regulated brokers that deliver tight spreads,
            fast execution and reliable withdrawals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {brokers.map((broker, i) => (
            <motion.div
              key={broker.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-gold/40 hover:shadow-[0_0_30px_-10px_hsl(217_91%_50%_/_0.3)] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <broker.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-1">{broker.name}</h3>
              <p className="text-sm text-gold mb-4">{broker.tagline}</p>
              <p className="text-muted-foreground text-sm mb-6">{broker.description}</p>
              <a href={broker.href} target="_blank" rel="noopener noreferrer">
                <Button variant="goldOutline" className="w-full group/btn">
                  Sign Up
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10 max-w-2xl mx-auto">
          Trading involves significant risk. Only trade with capital you can afford to lose.
        </p>
      </div>
    </section>
  );
}
