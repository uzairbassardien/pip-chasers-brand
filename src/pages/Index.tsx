import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SignalsSection } from "@/components/SignalsSection";
import { MentorshipSection } from "@/components/MentorshipSection";
import { ResultsSection } from "@/components/ResultsSection";
import { BrokersSection } from "@/components/BrokersSection";
import { CarRentalsSection } from "@/components/CarRentalsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SignalsSection />
      <MentorshipSection />
      <ResultsSection />
      <BrokersSection />
      <CarRentalsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
