import { useEffect, useRef } from "react";
import gsap from "gsap";
import ringsImg from "@/assets/rings.jpg";
import floralOrnament from "@/assets/floral-ornament.png";

interface Props {
  onOpen: () => void;
}

const RingsWelcome = ({ onOpen }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".welcome-rings",
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".welcome-ornament",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.15,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.4,
        },
      );
      gsap.fromTo(
        ".welcome-text",
        { opacity: 0, y: 30, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
        },
      );
      gsap.fromTo(
        ".welcome-btn",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1 },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={ringsImg}
          alt=""
          className="welcome-rings w-full h-full object-cover opacity-0"
          style={{ filter: "brightness(0.5) sepia(0.2)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,24,16,0.4) 0%, rgba(30,24,16,0.7) 100%)",
          }}
        />
      </div>

      {/* Floral corners */}
      <img
        src={floralOrnament}
        alt=""
        className="welcome-ornament absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-contain pointer-events-none opacity-0"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        <div className="welcome-text">
          <p className="font-display text-lg md:text-2xl leading-[1.8] tracking-wide text-wedding-cream/90">
            This moment wouldn't be the same
            <br />
            without you…
          </p>
          <div
            className="w-12 md:w-16 h-px mx-auto my-5 md:my-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #d4b47c, transparent)",
            }}
          />
          <p className="font-body text-sm md:text-lg text-wedding-cream/70 italic">
            we're truly grateful to have you here.
          </p>
        </div>

        <button
          onClick={onOpen}
          className="welcome-btn btn-gold mt-10 md:mt-14 animate-pulse-glow text-wedding-cream border-wedding-light-gold/60 opacity-0 !text-sm md:!text-[1.1rem] !py-2.5 !px-6 md:!py-[0.75rem] md:!px-[2.5rem]"
        >
          Open Invitation
        </button>
      </div>
    </section>
  );
};

export default RingsWelcome;
