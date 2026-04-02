import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, Zap } from "lucide-react";
import { Button } from "./ui/button";

const benefits = [
  {
    icon: TrendingUp,
    title: "Tight Spreads",
    description: "Competitive spreads on NASDAQ, Gold, US30 & forex pairs",
  },
  {
    icon: Zap,
    title: "Fast Execution",
    description: "Lightning-fast order execution with minimal slippage",
  },
  {
    icon: Shield,
    title: "Regulated Broker",
    description: "Trade with confidence on a trusted, regulated platform",
  },
];

const SWYFT_MARKETS_LINK = "https://swyftmarkets.com/register?ref=PLACEHOLDER";

export function BrokerSignupSection() {
  return (
    <section id="broker" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)_/_0.06)_0%,_transparent_70%)]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
            Our Recommended Broker
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Trade with{" "}
            <span className="text-gradient-gold">Swyft Markets</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sign up with our trusted broker partner and start trading the markets
            Pip Chasers trades — NASDAQ, Gold, US30 & more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-5">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a href={SWYFT_MARKETS_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl" className="group">
              Sign Up with Swyft Markets
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
            Trading involves risk. Only trade with capital you can afford to lose. 
            Past performance is not indicative of future results.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
