import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import memoriesImg from "@/assets/memories.jpg";
import ringsImg from "@/assets/rings.jpg";
import brideImg from "@/assets/bride.jpg";
import groomImg from "@/assets/groom.jpg";

gsap.registerPlugin(ScrollTrigger);

const defaultMessages = [
  "May your love grow stronger each day ❤️",
  "Wishing you a lifetime of happiness!",
  "So happy for you both! 🌸",
  "A beautiful beginning to forever",
  "Love, laughter, and happily ever after ✨",
];

const MemoryBox = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [guestMsg, setGuestMsg] = useState("");
  const [guestMessages, setGuestMessages] = useState<string[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".box-wrapper",
        { opacity: 0, y: 50 },
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const openBox = () => {
    setIsOpen(true);
    setTimeout(() => {
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        ".wish-card",
        { opacity: 0, y: 20, rotate: () => (Math.random() - 0.5) * 4 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
      );
    }, 0);
  };

  const addMessage = () => {
    if (!guestMsg.trim()) return;
    setGuestMessages((prev) => [...prev, guestMsg.trim()]);
    setGuestMsg("");
  };

  const photos = [ringsImg, brideImg, groomImg, memoriesImg];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-24 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(33 30% 85%) 0%, hsl(34 35% 90%) 100%)",
      }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {!isOpen ? (
          <div
            className="box-wrapper flex flex-col items-center justify-center min-h-[50vh] cursor-pointer group"
            onClick={openBox}
          >
            {/* Elegant box */}
            <div className="relative transition-transform duration-500 group-hover:-translate-y-2">
              {/* Box body */}
              <div
                className="w-44 h-36 rounded-lg relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(145deg, #c9a96e 0%, #b08f55 50%, #a07e48 100%)",
                  boxShadow:
                    "0 25px 60px rgba(107,79,58,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)",
                  }}
                />
              </div>
              {/* Lid */}
              <div
                className="absolute -top-5 left-1/2 -translate-x-1/2 w-48 h-7 rounded-t-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-2"
                style={{
                  background:
                    "linear-gradient(145deg, #d4b47c 0%, #c4a46c 100%)",
                  boxShadow: "0 -2px 10px rgba(107,79,58,0.15)",
                }}
              />
              {/* Heart lock */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-wedding-cream/70 text-xl">
                ♡
              </div>
            </div>
            <p className="font-display text-2xl md:text-3xl tracking-[0.2em] text-wedding-brown mt-10">
              Our Memories
            </p>
            <p className="font-body text-xs text-wedding-brown/40 mt-3 tracking-[0.3em] uppercase">
              tap to open
            </p>
          </div>
        ) : (
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-center tracking-[0.2em] text-wedding-brown mb-4">
              Our Memories
            </h2>
            <div className="w-16 h-px bg-wedding-gold/30 mx-auto mb-14" />

            {/* Photo gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {photos.map((src, i) => (
                <div
                  key={i}
                  className="gallery-item rounded-xl overflow-hidden shadow-lg group/img cursor-pointer"
                  style={{
                    boxShadow: "0 10px 30px rgba(107,79,58,0.12)",
                  }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover/img:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Wish cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {[...defaultMessages, ...guestMessages].map((msg, i) => (
                <div
                  key={i}
                  className="wish-card memory-card p-6 rounded-xl"
                  style={{
                    transform: `rotate(${i % 3 === 0 ? -1 : i % 3 === 1 ? 0.5 : 1.5}deg)`,
                  }}
                >
                  <p className="font-script text-xl text-wedding-brown/70 leading-relaxed">
                    {msg}
                  </p>
                </div>
              ))}
            </div>

            {/* Guest message input */}
            <div className="max-w-lg mx-auto text-center">
              <p className="font-display text-lg tracking-[0.15em] text-wedding-brown/50 mb-5">
                Leave your wish for the couple
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={guestMsg}
                  onChange={(e) => setGuestMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addMessage()}
                  placeholder="Write your message…"
                  className="flex-1 px-5 py-3.5 rounded-xl bg-wedding-cream/80 border border-wedding-gold/15 font-body text-sm text-wedding-brown placeholder:text-wedding-brown/25 focus:outline-none focus:border-wedding-gold/40 transition-colors"
                />
                <button
                  onClick={addMessage}
                  className="btn-gold px-7 py-3.5 text-sm rounded-xl"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MemoryBox;
