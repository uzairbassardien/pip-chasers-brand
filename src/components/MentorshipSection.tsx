import { motion } from "framer-motion";
import { Check, GraduationCap, ArrowRight, Crown, Calendar } from "lucide-react";
import { Button } from "./ui/button";

const tiers = [
  {
    name: "Monthly Mentorship",
    price: "R2000",
    period: "/month",
    icon: Calendar,
    description: "Hands-on coaching, month by month.",
    features: [
      "Weekly live trading sessions",
      "Access to private community",
      "Trade reviews & feedback",
      "Cancel anytime",
    ],
    cta: "Start Monthly",
    msg: "Hi%20I%20want%20to%20join%20Monthly%20Mentorship",
    featured: false,
  },
  {
    name: "Yearly Mentorship",
    price: "R6000",
    period: "/year",
    icon: GraduationCap,
    description: "Full year of structured growth. Save big vs monthly.",
    features: [
      "Everything in Monthly",
      "1-on-1 quarterly sessions",
      "Full video course library",
      "Priority support",
    ],
    cta: "Go Yearly",
    msg: "Hi%20I%20want%20to%20join%20Yearly%20Mentorship",
    featured: true,
  },
  {
    name: "Lifetime Mentorship",
    price: "R15000",
    period: "once-off",
    icon: Crown,
    description: "Pay once. Mentorship for life. Limited intake.",
    features: [
      "Lifetime access to all content",
      "All future programs included",
      "Direct mentor access",
      "VIP community status",
    ],
    cta: "Apply for Lifetime",
    msg: "Hi%20I%20want%20to%20apply%20for%20Lifetime%20Mentorship",
    featured: false,
  },
];

export function MentorshipSection() {
  return (
    <section id="mentorship" className="section-padding relative">
      <div className="absolute inset-0 bg-charcoal-light/30" />
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            1-on-1 Coaching
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Trading <span className="text-gradient-gold">Mentorship</span>
          </h2>
          <p className="text-muted-foreground">
            Learn to trade NASDAQ, Gold, US30 & forex with structure, discipline
            and direct coaching from a profitable trader.
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
                  ? "bg-gradient-to-br from-charcoal-light to-card border-gold/40 shadow-[0_0_40px_-15px_hsl(217_91%_50%_/_0.4)] md:-translate-y-2"
                  : "bg-card border-border hover:border-gold/20"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                <tier.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{tier.name}</h3>
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
              <a
                href={`https://wa.me/27720702237?text=${tier.msg}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant={tier.featured ? "gold" : "goldOutline"} className="w-full group">
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
