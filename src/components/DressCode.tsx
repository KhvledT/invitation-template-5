import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const colors = [
  { name: "Cream", hex: "#f5efe6" },
  { name: "Beige", hex: "#e8dccb" },
  { name: "Gold", hex: "#d4b47c" },
  { name: "Brown", hex: "#6b4f3a" },
];

const DressCode = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dress-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".color-circle",
        { opacity: 0, scale: 0, rotate: -10 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".color-palette",
            start: "top 80%",
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
      className="relative min-h-[70vh] flex items-center justify-center py-24 px-6 overflow-hidden"
    >
      {/* Split background */}

      {/* Blend overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #6b4f3a 0%, #5a4230 100%)",
        }}
      />

      <div className="relative z-10 text-center dress-content">
        <p className="font-display text-xs tracking-[0.5em] uppercase text-wedding-cream/50 mb-4">
          Please note
        </p>
        <h2 className="font-display text-4xl md:text-5xl tracking-[0.2em] text-wedding-cream">
          Dress Code
        </h2>
        <div
          className="w-12 h-px mx-auto my-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, #d4b47c, transparent)",
          }}
        />
        <p className="font-body text-lg text-wedding-cream/75 tracking-wider italic">
          Beige & Brown tones only
        </p>

        <div className="color-palette flex flex-wrap gap-5 md:gap-8 mt-10 md:mt-14 justify-center">
          {colors.map((c) => (
            <div
              key={c.name}
              className="color-circle flex flex-col items-center gap-3"
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl"
                style={{
                  backgroundColor: c.hex,
                  boxShadow: `0 8px 25px ${c.hex}40`,
                  border: "2px solid rgba(245,239,230,0.15)",
                }}
              />
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-wedding-cream/55">
                {c.name}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20">
          <div
            className="w-20 h-px mx-auto mb-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, #d4b47c60, transparent)",
            }}
          />
          <p className="font-script text-4xl text-wedding-gold">
            Ahmed & Dalia
          </p>
          <p className="font-display text-xs tracking-[0.5em] text-wedding-cream/35 mt-4">
            30 · 06 · 2026
          </p>
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-wedding-cream/25 mt-8">
            Made with love
          </p>
        </div>
      </div>
    </section>
  );
};

export default DressCode;
