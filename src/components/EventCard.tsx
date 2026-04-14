import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import floralOrnament from "@/assets/floral-ornament.png";

gsap.registerPlugin(ScrollTrigger);

const EventCard = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const target = new Date("2026-06-30T21:00:00").getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".event-card-main",
        { opacity: 0, y: 80, filter: "blur(15px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".event-line",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".event-card-main",
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".countdown-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".countdown-wrap",
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
      className="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden bg-wedding-beige"
    >
      <div className="relative z-10 flex flex-col items-center gap-14">
        {/* Arch Card */}
        <div className="event-card-main arch-card w-full max-w-[340px] md:max-w-[420px] px-6 md:px-10 pt-16 md:pt-20 pb-12 md:pb-14 text-center relative">
          {/* Floral frame inside card */}
          <img
            src={floralOrnament}
            alt=""
            className="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] object-contain opacity-[0.08] pointer-events-none"
          />

          <p className="event-line font-display text-xs tracking-[0.5em] uppercase text-wedding-brown/45">
            Save the Date
          </p>
          <p className="event-line font-display text-base tracking-[0.35em] uppercase mt-3 text-wedding-brown/55">
            Our Day
          </p>

          <div className="mt-10 mb-8">
            <p className="event-line font-script text-5xl md:text-6xl text-wedding-brown">
              Ahmed
            </p>
            <p className="event-line font-script text-3xl text-wedding-gold my-3">
              &
            </p>
            <p className="event-line font-script text-5xl md:text-6xl text-wedding-brown">
              Dalia
            </p>
          </div>

          {/* Ornamental divider */}
          <div className="event-line flex items-center justify-center gap-2 my-6">
            <div className="w-8 h-px bg-wedding-gold/30" />
            <span className="text-wedding-gold/60 text-[10px] tracking-widest">
              ✦ ✦ ✦
            </span>
            <div className="w-8 h-px bg-wedding-gold/30" />
          </div>

          <div className="event-line flex items-center justify-center font-display text-lg text-wedding-brown/80">
            <span className="px-3">Sunday</span>
            <span className="text-3xl font-semibold border-x border-wedding-gold/25 px-5 py-1">
              30
            </span>
            <span className="px-3">9 PM</span>
          </div>
          <p className="event-line font-display text-sm text-wedding-brown/50 mt-2 tracking-widest">
            Jun
          </p>
          <p className="event-line font-display text-2xl tracking-[0.4em] text-wedding-gold mt-3">
            2026
          </p>

          <div className="event-line w-12 h-px bg-wedding-gold/30 mx-auto my-8" />

          <p className="event-line font-display text-sm tracking-[0.15em] text-wedding-brown/60">
            Almasia Hall – Mansoura
          </p>

          <p className="event-line font-display text-xs tracking-[0.4em] uppercase text-wedding-gold/50 mt-10">
            Waiting for you
          </p>
        </div>

        {/* Countdown */}
        <div className="countdown-wrap flex gap-3 sm:gap-6 md:gap-12 text-center justify-center">
          {[
            { val: countdown.days, label: "Days" },
            { val: countdown.hours, label: "Hours" },
            { val: countdown.mins, label: "Minutes" },
            { val: countdown.secs, label: "Seconds" },
          ].map((item) => (
            <div
              key={item.label}
              className="countdown-item flex flex-col items-center"
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-wedding-gold/20 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(34 35% 92% / 0.8), hsl(33 30% 85% / 0.5))",
                }}
              >
                <span className="font-display text-2xl md:text-3xl text-wedding-brown">
                  {String(item.val).padStart(2, "0")}
                </span>
              </div>
              <span className="font-body text-[10px] tracking-[0.25em] uppercase text-wedding-brown/40 mt-3">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCard;
