import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SignalsSection } from "@/components/SignalsSection";
import { MentorshipSection } from "@/components/MentorshipSection";
import { ResultsSection } from "@/components/ResultsSection";
import { BrokersSection } from "@/components/BrokersSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingLifestyleImages } from "@/components/FloatingLifestyleImages";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Navigation />
      <FloatingLifestyleImages />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SignalsSection />
        <MentorshipSection />
        <ResultsSection />
        <BrokersSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
