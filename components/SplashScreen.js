"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Particle Field ────────────────────────────────────────────────────────────
function ParticleCanvas({ isExiting }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const count = 80;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? 160 : 180, // cyan-ish range
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 200, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3
        );
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.opacity * 0.3})`);
        grad.addColorStop(1, `hsla(${p.hue}, 100%, 70%, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: isExiting ? 0 : 0.6, transition: "opacity 0.8s ease" }}
    />
  );
}

// ─── Animated Logo Letters ─────────────────────────────────────────────────────
function AnimatedLogo() {
  const letters = ["D", "R", "A", "P"];
  const colors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff"];

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{
            delay: 0.6 + i * 0.12,
            duration: 0.7,
            type: "spring",
            stiffness: 120,
            damping: 12,
          }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tighter"
          style={{
            color: "#ffffff",
            textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.25), 0 0 80px rgba(255,255,255,0.12)",
            fontFamily: "var(--font-syne), sans-serif",
          }}
        >
          {letter}
        </motion.span>
      ))}
      {/* AI Badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          delay: 1.2,
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="ml-2 sm:ml-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal"
        style={{
          background: "linear-gradient(135deg, #ffffff, #e0e0e0, #ffffff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))",
          fontFamily: "var(--font-syne), sans-serif",
        }}
      >
        AI
      </motion.span>
    </div>
  );
}

// ─── Glitch Line ───────────────────────────────────────────────────────────────
function GlitchBar({ delay }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="h-[1px] w-full max-w-md mx-auto origin-left"
      style={{
        background:
          "linear-gradient(90deg, transparent, #00ffc880, #00e5ff80, #39ff1480, transparent)",
      }}
    />
  );
}

// ─── Loading Bar ───────────────────────────────────────────────────────────────
function LoadingBar({ progress }) {
  return (
    <div className="w-48 sm:w-64 h-[2px] bg-white/5 rounded-full overflow-hidden mx-auto">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #00ffc8, #00e5ff, #39ff14)",
          boxShadow: "0 0 10px #00ffc860, 0 0 20px #00ffc830",
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Floating Orbs ─────────────────────────────────────────────────────────────
function FloatingOrbs() {
  const orbs = [
    { size: 300, x: "15%", y: "20%", color: "#00ffc8", delay: 0 },
    { size: 200, x: "75%", y: "60%", color: "#00e5ff", delay: 0.5 },
    { size: 250, x: "60%", y: "15%", color: "#39ff14", delay: 1 },
    { size: 180, x: "25%", y: "70%", color: "#00bfff", delay: 0.3 },
  ];

  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.08, 0.04, 0.08],
            scale: [0, 1, 0.9, 1],
          }}
          transition={{
            delay: orb.delay,
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}30, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
      ))}
    </>
  );
}

// ─── Scanning Line ─────────────────────────────────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 w-full h-[1px] pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent, #00ffc820, #00ffc840, #00ffc820, transparent)",
        boxShadow: "0 0 15px 2px #00ffc815",
      }}
      initial={{ top: "-5%" }}
      animate={{ top: "105%" }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// ─── Binary/Hex Rain Columns ──────────────────────────────────────────────────
function CodeRain() {
  const columns = Array.from({ length: 12 }, (_, i) => ({
    left: `${(i / 12) * 100 + Math.random() * 5}%`,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    chars: Array.from({ length: 8 }, () =>
      Math.random() > 0.5
        ? Math.floor(Math.random() * 2).toString()
        : Math.floor(Math.random() * 16).toString(16)
    ).join("\n"),
  }));

  return (
    <>
      {columns.map((col, i) => (
        <motion.pre
          key={i}
          className="absolute text-[10px] leading-tight font-mono pointer-events-none select-none"
          style={{
            left: col.left,
            color: "#00ffc8",
            opacity: 0,
          }}
          initial={{ top: "-10%", opacity: 0 }}
          animate={{ top: "110%", opacity: [0, 0.15, 0.15, 0] }}
          transition={{
            delay: col.delay,
            duration: col.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {col.chars}
        </motion.pre>
      ))}
    </>
  );
}

// ─── Main Splash Screen ───────────────────────────────────────────────────────
export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [show, setShow] = useState(true);

  // Simulate loading progress
  useEffect(() => {
    const steps = [
      { target: 25, delay: 300 },
      { target: 50, delay: 700 },
      { target: 75, delay: 1200 },
      { target: 90, delay: 1800 },
      { target: 100, delay: 2400 },
    ];

    const timeouts = steps.map(({ target, delay }) =>
      setTimeout(() => setProgress(target), delay)
    );

    // Trigger exit
    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    // Complete
    const completeTimeout = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 3800);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#050508" }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── Background layers ── */}
          <div className="absolute inset-0">
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(#00ffc810 1px, transparent 1px),
                  linear-gradient(90deg, #00ffc810 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
            <FloatingOrbs />
            <ParticleCanvas isExiting={isExiting} />
            <ScanLine />
            <CodeRain />

            {/* Vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, #050508 80%)",
              }}
            />
          </div>

          {/* ── Central Content ── */}
          <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-4">
            {/* Top accent line */}
            <GlitchBar delay={0.3} />

            {/* Logo */}
            <AnimatedLogo />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="text-sm sm:text-base tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/30 font-light text-center"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Creative Web Developers
            </motion.p>

            {/* Bottom accent line */}
            <GlitchBar delay={1.7} />

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.4 }}
            >
              <LoadingBar progress={progress} />
            </motion.div>

            {/* Status text */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isExiting ? 0 : 0.3 }}
              transition={{ delay: 2.2, duration: 0.4 }}
              className="text-[10px] sm:text-xs tracking-[0.2em] text-white/40 font-mono uppercase"
            >
              {progress < 100 ? "Initializing..." : "Ready"}
            </motion.span>
          </div>

          {/* ── Corner decorations ── */}
          {/* Top-left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.5 }}
            className="absolute top-6 left-6 sm:top-8 sm:left-8"
          >
            <div className="w-6 h-6 border-l border-t border-white/20" />
          </motion.div>
          {/* Top-right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.6 }}
            className="absolute top-6 right-6 sm:top-8 sm:right-8"
          >
            <div className="w-6 h-6 border-r border-t border-white/20" />
          </motion.div>
          {/* Bottom-left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8"
          >
            <div className="w-6 h-6 border-l border-b border-white/20" />
          </motion.div>
          {/* Bottom-right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8"
          >
            <div className="w-6 h-6 border-r border-b border-white/20" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
