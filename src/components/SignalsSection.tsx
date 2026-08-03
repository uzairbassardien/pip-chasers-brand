import { motion } from "framer-motion";
import { Check, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Monthly",
    price: "R2000",
    period: "/month",
    description: "Premium signals delivered daily. Cancel anytime.",
    features: [
      "Daily signals on NASDAQ, Gold & US30",
      "Entry, SL & TP levels",
      "Real-time alerts via Telegram",
      "Market commentary",
    ],
    cta: "Start Monthly",
    href: "https://wa.me/27720702237?text=Hi%20I%20want%20to%20join%20Monthly%20Signals",
    featured: false,
  },
  {
    name: "Yearly",
    price: "R6000",
    period: "/year",
    description: "Best value — save vs monthly and lock in your edge.",
    features: [
      "Everything in Monthly",
      "Priority signal alerts",
      "Quarterly strategy calls",
      "Save vs paying monthly",
    ],
    cta: "Go Yearly",
    href: "https://wa.me/27720702237?text=Hi%20I%20want%20to%20join%20Yearly%20Signals",
    featured: true,
  },
  {
    name: "Lifetime",
    price: "R15000",
    period: "once",
    description: "Pay once. Receive signals for life. Limited spots.",
    features: [
      "Lifetime access to all signals",
      "All future updates included",
      "VIP Telegram channel",
      "Direct line for questions",
    ],
    cta: "View Lifetime",
    href: "/lifetime-signals",
    featured: false,
    internal: true,
  },
];

export function SignalsSection() {
  return (
    <section id="signals" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)_/_0.05)_0%,_transparent_70%)]" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            Trade With Precision
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Premium <span className="text-gradient-gold">Signals</span>
          </h2>
          <p className="text-muted-foreground">
            High-probability setups on NASDAQ, Gold, US30 & major pairs —
            delivered with clear entries, stops and targets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                tier.featured
                  ? "bg-gradient-to-br from-charcoal-light to-card border-gold/40 shadow-[0_0_40px_-15px_hsl(217_91%_50%_/_0.4)]"
                  : "bg-card border-border hover:border-gold/20"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
                  Best Value
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-display text-4xl font-bold text-gradient-gold">
                  {tier.price}
                </span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {tier.internal ? (
                <Link to={tier.href}>
                  <Button variant={tier.featured ? "gold" : "goldOutline"} className="w-full group">
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <a href={tier.href} target="_blank" rel="noopener noreferrer">
                  <Button variant={tier.featured ? "gold" : "goldOutline"} className="w-full group">
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
