import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import groomImg from "@/assets/groom.jpg";
import brideImg from "@/assets/bride.jpg";
import floralOrnament from "@/assets/floral-ornament.png";

gsap.registerPlugin(ScrollTrigger);

const CoupleStory = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Images entrance
      gsap.fromTo(
        ".groom-photo, .bride-photo",
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Text entrance
      gsap.fromTo(
        ".story-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-text",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Ornament entrance
      gsap.fromTo(
        ".story-ornament",
        { opacity: 0, rotate: -15, scale: 0.8 },
        {
          opacity: 0.3,
          rotate: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-ornament",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-wedding-cream">
      <section
        ref={sectionRef}
        className="max-w-7xl mx-auto relative min-h-[90vh] md:min-h-screen w-full overflow-hidden"
      >
        {/* Background Subtle Overlays */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay"
          style={{
            backgroundImage: `url(${floralOrnament})`,
            backgroundSize: "400px",
            backgroundPosition: "10% 20%",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-0 w-full h-full z-10">
          {/* Text - Top Left Area */}
          <div className="story-text absolute top-[6%] md:top-[10%] left-6 md:left-[8%] w-[60%] md:w-[40%] z-30">
            <p
              className="w-[50%] md:w-[80%] lg:w-[100%] text-[1.2rem] md:text-[1.8rem] leading-[1.8] md:leading-[2] text-[#4a3623] text-center md:text-left"
              style={{ fontFamily: "'Caveat', 'Great Vibes', cursive, serif" }}
            >
              This is more than just a celebration... it's the beginning of a
              story written with love, filled with laughter, and shared with the
              people who mean the most to us
            </p>
          </div>

          {/* Groom Image - Top Right Quadrant */}
          <div className="groom-photo rounded-b-full absolute top-0 right-0 w-[60%] h-[55%] md:w-[48%] md:h-[65%] z-20 overflow-hidden shadow-2xl">
            <img
              src={groomImg}
              alt="Groom"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Bride Image - Bottom Left Quadrant */}
          <div className="bride-photo rounded-t-full absolute bottom-0 left-0 w-[65%] h-[50%] md:w-[45%] md:h-[60%] z-20 overflow-hidden shadow-2xl">
            <img
              src={brideImg}
              alt="Bride"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoupleStory;
