import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle, Instagram, Mail, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "072 070 2237",
    href: "https://wa.me/27720702237",
    color: "text-green-500",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@_ameerkarriem",
    href: "https://instagram.com/_ameerkarriem",
    color: "text-pink-500",
  },
  {
    icon: Mail,
    label: "Email",
    value: "karriemameer@gmail.com",
    href: "mailto:karriemameer@gmail.com",
    color: "text-gold",
  },
];

const whatsappNumber = "27720702237";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = [
      "Hi Pip Chasers, I would like to get in touch.",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Subject: ${formData.subject}`,
      `Message: ${formData.message}`,
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal-light/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_hsl(45_80%_55%_/_0.05)_0%,_transparent_70%)]" />

      <div className="container-custom relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your{" "}
            <span className="text-gradient-gold">Journey?</span>
          </h2>
          <p className="text-muted-foreground">
            Whether you're interested in trading mentorship or market guidance, we're
            here to help. Reach out today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="font-display text-xl font-bold mb-6">
              Contact Methods
            </h3>

            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <method.icon className={`w-6 h-6 ${method.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{method.label}</p>
                  <p className="font-display font-semibold">{method.value}</p>
                </div>
              </a>
            ))}

            <div className="p-6 bg-gradient-to-br from-gold/10 to-transparent rounded-xl border border-gold/20 mt-8">
              <MapPin className="w-8 h-8 text-gold mb-3" />
              <h4 className="font-display font-semibold mb-2">Based in South Africa</h4>
              <p className="text-sm text-muted-foreground">
                Serving traders worldwide from South Africa.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-8 bg-card rounded-2xl border border-border">
              <h3 className="font-display text-xl font-bold mb-6">
                Send a Message
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-charcoal-light border-border focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-charcoal-light border-border focus:border-gold"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  type="text"
                  placeholder="Trading Mentorship / Market Guidance / Other"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-charcoal-light border-border focus:border-gold"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  placeholder="Tell us more about what you're looking for..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-charcoal-light border-border focus:border-gold resize-none"
                />
              </div>

              <Button variant="gold" size="lg" className="w-full group">
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
