import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { ThemeShowcase } from '@/components/landing/ThemeShowcase';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features } from '@/components/landing/Features';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

interface HomePageProps {
  navigate: (to: string) => void;
}

export default function HomePage({ navigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar navigate={navigate} />
      <main>
        <Hero navigate={navigate} />
        <TrustStrip />
        <ThemeShowcase navigate={navigate} />
        <HowItWorks />
        <Features />
        <FAQ />
        <CTA navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
