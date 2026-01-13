import { Instagram, MessageCircle, Mail, ArrowUp } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Trading Education", href: "#services" },
    { name: "Market Analysis", href: "#services" },
    { name: "Psychology Coaching", href: "#services" },
    { name: "Private Community", href: "#services" },
  ],
  rentals: [
    { name: "Matric Ball Cars", href: "#rentals" },
    { name: "Event Rentals", href: "#rentals" },
    { name: "Photoshoots", href: "#rentals" },
    { name: "View Fleet", href: "#rentals" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Results", href: "#results" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/pipchasers", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/27000000000", label: "WhatsApp" },
  { icon: Mail, href: "mailto:hello@pipchasers.com", label: "Email" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-muted/30">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-gradient-gold mb-4">
              Pip Chasers
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Chasing Precision. Delivering Pips. Master the markets with discipline 
              and arrive in style with our luxury car rentals.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-gold/50 hover:text-gold transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Trading Services */}
          <div>
            <h3 className="font-display font-semibold mb-4">Trading</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Car Rentals */}
          <div>
            <h3 className="font-display font-semibold mb-4">Car Rentals</h3>
            <ul className="space-y-3">
              {footerLinks.rentals.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pip Chasers. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-xs text-muted-foreground">
              Trading involves risk. Past performance ≠ future results.
            </p>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-gold/50 hover:text-gold transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
