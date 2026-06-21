import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import MagicLensHero from "@/components/MagicLensHero";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";

export default function Home() {
  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        <MagicLensHero />
        <AboutSection />
        <PortfolioSection />
        <footer className="py-12 text-center">
          <p className="text-dusk-blue/40 text-xs tracking-[0.15em]">
            © 2025 XiaoTNT · Crafted with precision
          </p>
        </footer>
      </main>
    </>
  );
}
