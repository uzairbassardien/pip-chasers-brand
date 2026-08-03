import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Crown, Infinity as InfinityIcon, Lock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const perks = [
  "Lifetime access to all premium signals on NASDAQ, Gold, US30 & majors",
  "Every entry, stop-loss and take-profit clearly laid out",
  "Priority alerts via VIP Telegram channel",
  "All future signal upgrades & strategies included — forever",
  "Direct line to ask questions about any setup",
  "One-time payment. No subscriptions. No renewals.",
];

const faqs = [
  {
    q: "What does 'lifetime' mean exactly?",
    a: "Once you join, you receive signals from Pip Chasers for as long as the service exists. No monthly or yearly fees — ever.",
  },
  {
    q: "How are signals delivered?",
    a: "All signals are sent via a private VIP Telegram channel in real-time, with clear entries, stop losses and take profit targets.",
  },
  {
    q: "Is this beginner friendly?",
    a: "Yes. Signals come with context and reasoning. We also recommend pairing Lifetime Signals with Mentorship for fastest growth.",
  },
  {
    q: "How do I pay?",
    a: "Message us on WhatsApp and we'll send through secure payment options and onboard you the same day.",
  },
];

const LifetimeSignals = () => {
  const waLink =
    "https://wa.me/27720702237?text=Hi%20I%20want%20to%20join%20Lifetime%20Signals";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)_/_0.08)_0%,_transparent_70%)]" />
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
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-gold/10 text-gold border border-gold/20">
              <Crown className="w-4 h-4" /> Lifetime Access · Limited Spots
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Lifetime <span className="text-gradient-gold">Signals</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Pay once. Receive Pip Chasers premium trade signals for life.
              No subscriptions. No renewals. Just disciplined, high-probability
              setups delivered straight to your phone — forever.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="xl" className="group">
                  Claim Lifetime Access
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </a>
              <a href="#perks">
                <Button variant="heroOutline" size="xl">
                  See What's Included
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section id="perks" className="section-padding bg-charcoal-light/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
                What You Get
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                One payment. <span className="text-gradient-gold">Forever access.</span>
              </h2>
              <ul className="space-y-4">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-10 rounded-3xl bg-gradient-to-br from-charcoal-light to-card border border-gold/30 shadow-[0_0_60px_-20px_hsl(217_91%_50%_/_0.4)]"
            >
              <InfinityIcon className="w-12 h-12 text-gold mb-6" />
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                Lifetime Signals
              </p>
              <p className="font-display text-6xl font-bold text-gradient-gold mb-2">
                R15000
              </p>
              <p className="text-muted-foreground mb-8">
                One-time payment · No renewals · All future updates included
              </p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="gold" size="xl" className="w-full">
                  Enquire on WhatsApp
                </Button>
              </a>
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                <Lock className="w-3 h-3" /> Secure onboarding · Limited spots
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center">
            Frequently <span className="text-gradient-gold">Asked</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-display font-semibold mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="xl">
                I'm Ready — Claim Lifetime
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LifetimeSignals;
