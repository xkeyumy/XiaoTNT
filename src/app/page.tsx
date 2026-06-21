import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";

export default function Home() {
  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <footer className="py-20 text-center">
          <p className="text-dusk-blue/30 text-xs tracking-[0.2em] uppercase">
            © 2025 XiaoTNT · Crafted with precision
          </p>
        </footer>
      </main>
    </>
  );
}
