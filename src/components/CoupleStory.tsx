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
      // Parallax images
      gsap.fromTo(
        ".groom-photo",
        { x: 80, opacity: 0, rotate: 3 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".bride-photo",
        { x: -80, opacity: 0, rotate: -3 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        },
      );
      // Text
      gsap.fromTo(
        ".story-text-line",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-text",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
      // Ornamental line
      gsap.fromTo(
        ".story-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-divider",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 flex items-center overflow-hidden bg-wedding-cream"
    >
      {/* Subtle floral bg */}
      <img
        src={floralOrnament}
        alt=""
        className="absolute top-10 right-10 w-40 h-40 opacity-[0.06] pointer-events-none"
      />
      <img
        src={floralOrnament}
        alt=""
        className="absolute bottom-10 left-10 w-40 h-40 opacity-[0.06] pointer-events-none rotate-180"
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 items-center relative z-10">
        {/* Images column - 3 cols */}
        <div className="md:col-span-3 relative h-[440px] md:h-[600px]">
          {/* Groom - top right */}
          <div
            className="groom-photo absolute top-0 right-2 md:right-12 w-40 sm:w-52 md:w-60 h-60 sm:h-72 md:h-80 rounded-[2rem] overflow-hidden shadow-xl"
            style={{ boxShadow: "0 20px 50px rgba(107,79,58,0.2)" }}
          >
            <img
              src={groomImg}
              alt="Groom"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              loading="lazy"
            />
          </div>
          {/* Bride - bottom left */}
          <div
            className="bride-photo absolute bottom-0 left-2 md:left-12 w-40 sm:w-52 md:w-60 h-60 sm:h-72 md:h-80 rounded-full overflow-hidden shadow-xl"
            style={{ boxShadow: "0 20px 50px rgba(107,79,58,0.2)" }}
          >
            <img
              src={brideImg}
              alt="Bride"
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text - 2 cols */}
        <div className="md:col-span-2 story-text text-center md:text-left">
          <p className="story-text-line font-display text-lg md:text-xl leading-[1.9] text-wedding-brown/75 italic">
            "This is more than just a celebration…
          </p>
          <p className="story-text-line font-display text-lg md:text-xl leading-[1.9] text-wedding-brown/75 italic mt-2">
            it's the beginning of a story written with love,
          </p>
          <p className="story-text-line font-display text-lg md:text-xl leading-[1.9] text-wedding-brown/75 italic mt-2">
            filled with laughter, and shared
          </p>
          <p className="story-text-line font-display text-lg md:text-xl leading-[1.9] text-wedding-brown/75 italic mt-2">
            with the people who mean the most to us."
          </p>
          <div
            className="story-divider w-20 h-px bg-wedding-gold/40 mt-8 mx-auto md:mx-0"
            style={{ transformOrigin: "left" }}
          />
          <div className="flex items-center gap-3 mt-6 justify-center md:justify-start">
            <span className="font-script text-3xl text-wedding-gold">
              Ahmed
            </span>
            <span className="font-display text-wedding-gold/50">&</span>
            <span className="font-script text-3xl text-wedding-gold">
              Dalia
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleStory;
