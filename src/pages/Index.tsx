import { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroSection from "@/components/IntroSection";
import RingsWelcome from "@/components/RingsWelcome";
import CoupleStory from "@/components/CoupleStory";
import EventCard from "@/components/EventCard";
import MemoryBox from "@/components/MemoryBox";
import DressCode from "@/components/DressCode";
import FloatingParticles from "@/components/FloatingParticles";
import ScrollProgress from "@/components/ScrollProgress";
import AudioController from "@/components/AudioController";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!showContent) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [showContent]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setAudioStarted(true);
    // Show rings welcome first
    setShowContent(true);
  };

  const handleOpen = () => {
    lenisRef.current?.scrollTo(window.innerHeight, { duration: 1.4 });
  };

  return (
    <div className="relative">
      {showIntro && <IntroSection onComplete={handleIntroComplete} />}

      {showContent && (
        <>
          <FloatingParticles />
          <ScrollProgress />
          <AudioController started={audioStarted} />

          <RingsWelcome onOpen={handleOpen} />
          <CoupleStory />
          <EventCard />
          <MemoryBox />
          <DressCode />
        </>
      )}
    </div>
  );
};

export default Index;
