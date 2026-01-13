import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  GraduationCap, 
  BarChart3, 
  Brain, 
  Users, 
  ArrowRight,
  Check
} from "lucide-react";
import { Button } from "./ui/button";

const services = [
  {
    icon: GraduationCap,
    title: "Trading Education",
    subtitle: "Master the Fundamentals",
    description: "Comprehensive mentorship program covering technical analysis, chart patterns, and market structure.",
    features: [
      "Live trading sessions",
      "Video course library",
      "Weekly market reviews",
      "1-on-1 coaching available",
    ],
    featured: false,
  },
  {
    icon: BarChart3,
    title: "Market Analysis",
    subtitle: "NASDAQ, Gold & US30",
    description: "Daily and weekly analysis of the most volatile and profitable instruments in the market.",
    features: [
      "Daily trade setups",
      "Key level identification",
      "News & sentiment analysis",
      "Real-time alerts",
    ],
    featured: true,
  },
  {
    icon: Brain,
    title: "Trading Psychology",
    subtitle: "Master Your Mind",
    description: "The mental game separates profitable traders from the rest. Learn to control emotions and execute.",
    features: [
      "Emotion management",
      "Trading journal guidance",
      "Discipline frameworks",
      "Mindset coaching",
    ],
    featured: false,
  },
  {
    icon: Users,
    title: "Private Community",
    subtitle: "Trade Together",
    description: "Join an elite group of focused traders sharing ideas, analysis, and accountability.",
    features: [
      "Private Discord/Telegram",
      "Trade idea sharing",
      "Accountability partners",
      "Exclusive webinars",
    ],
    featured: false,
  },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal-light/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_hsl(45_80%_55%_/_0.03)_0%,_transparent_70%)]" />

      <div className="container-custom relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            What We Offer
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Trading Services Built for{" "}
            <span className="text-gradient-gold">Growth</span>
          </h2>
          <p className="text-muted-foreground">
            From education to execution, we provide everything you need to develop 
            into a disciplined, profitable trader.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`group relative p-8 rounded-2xl border transition-all duration-500 ${
                service.featured
                  ? "bg-gradient-to-br from-charcoal-light to-charcoal border-gold/30 shadow-[0_0_40px_-15px_hsl(45_80%_55%_/_0.3)]"
                  : "bg-card border-border hover:border-gold/20"
              }`}
            >
              {service.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-gold text-charcoal-dark text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  service.featured ? "bg-gold/20" : "bg-gold/10"
                }`}>
                  <service.icon className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gold">{service.subtitle}</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={service.featured ? "gold" : "goldOutline"} 
                className="w-full group/btn"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-xs text-muted-foreground mt-10 max-w-2xl mx-auto"
        >
          ⚠️ Trading involves significant risk of loss. Past performance is not indicative 
          of future results. We do not guarantee profits. Trade responsibly.
        </motion.p>
      </div>
    </section>
  );
}
