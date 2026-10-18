import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import LifetimeSignals from "./pages/LifetimeSignals";
import LifestyleGallery from "./pages/LifestyleGallery";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AudioPlayer from "./components/AudioPlayer";
import ButtonClickTracker from "./components/ButtonClickTracker";

const queryClient = new QueryClient();

const SiteAudioPlayer = () => {
  const { pathname } = useLocation();
  return pathname.startsWith("/admin") ? null : <AudioPlayer />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ButtonClickTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lifetime-signals" element={<LifetimeSignals />} />
          <Route path="/lifestyle-gallery" element={<LifestyleGallery />} />
          <Route path="/results" element={<Testimonials />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SiteAudioPlayer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
