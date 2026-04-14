import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ringsImg from "@/assets/rings.jpg";

interface Props {
  onComplete: () => void;
}

const IntroSection = ({ onComplete }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Canvas particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      r: number;
      vy: number;
      opacity: number;
      phase: number;
    }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        vy: -(Math.random() * 0.3 + 0.1),
        opacity: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += Math.sin(time * 0.0008 + p.phase) * 0.3;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        const flicker = Math.sin(time * 0.002 + p.phase) * 0.3 + 0.7;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `rgba(212, 180, 124, ${p.opacity * flicker})`);
        grad.addColorStop(
          0.5,
          `rgba(212, 180, 124, ${p.opacity * flicker * 0.3})`,
        );
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    // Intro GSAP timeline
    const tl = gsap.timeline();
    tl.fromTo(
      ".intro-line-1",
      { opacity: 0, y: 20, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      },
    )
      .fromTo(
        ".intro-line-2",
        { opacity: 0, y: 20, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .fromTo(
        ".intro-ornament",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3",
      )
      .add(() => setReady(true))
      .fromTo(".intro-tap", { opacity: 0 }, { opacity: 1, duration: 0.6 });

    // Mouse follow light
    const handleMove = (e: MouseEvent) => {
      if (lightRef.current) {
        gsap.to(lightRef.current, {
          x: e.clientX - 150,
          y: e.clientY - 150,
          duration: 1,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", handleMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const handleClick = () => {
    if (!ready) return;
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) containerRef.current.style.display = "none";
        onComplete();
      },
    });
    tl.to(".intro-text-wrap", {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: "power2.in",
    })
      .to(
        lightRef.current,
        { scale: 20, opacity: 0.6, duration: 1.4, ease: "expo.out" },
        "-=0.3",
      )
      .fromTo(
        ".intro-rings-img",
        { opacity: 0, scale: 0.85, rotate: -5 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "power3.out" },
        "-=1",
      )
      .fromTo(
        ".intro-names",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      )
      .to(
        containerRef.current,
        { opacity: 0, duration: 0.8, ease: "power2.in" },
        "=0.8",
      );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer select-none"
      style={{
        background:
          "linear-gradient(160deg, #2c2215 0%, #1e1810 40%, #15110c 100%)",
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Mouse glow */}
      <div
        ref={lightRef}
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(212,180,124,0.25) 0%, rgba(212,180,124,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Central content */}
      <div className="intro-text-wrap relative z-10 flex flex-col items-center">
        <p
          className="intro-line-1 font-display text-2xl md:text-4xl tracking-[0.25em] opacity-0"
          style={{ color: "#d4b47c" }}
        >
          Every story begins
        </p>
        <p
          className="intro-line-2 font-display text-lg md:text-2xl tracking-[0.2em] opacity-0 mt-3"
          style={{ color: "#b89a60" }}
        >
          with a moment…
        </p>
        <div
          className="intro-ornament w-24 h-px mt-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, #d4b47c, transparent)",
            transformOrigin: "center",
          }}
        />
        <p
          className="intro-tap font-body text-white text-md tracking-[0.4em] uppercase mt-8 opacity-0"
          style={{ color: "#8a7550" }}
        >
          Tap anywhere to begin
        </p>
      </div>

      {/* Rings reveal (hidden until click) */}
      <img
        src={ringsImg}
        alt="Wedding rings"
        className="intro-rings-img absolute w-64 h-64 md:w-80 md:h-80 object-cover rounded-full opacity-0 shadow-2xl"
        style={{ boxShadow: "0 0 80px rgba(212,180,124,0.3)" }}
      />

      {/* Names */}
      <p
        className="intro-names absolute bottom-16 font-script text-4xl md:text-5xl opacity-0"
        style={{ color: "#d4b47c" }}
      >
        Ahmed & Dalia
      </p>
    </div>
  );
};

export default IntroSection;
