"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SPLASH_DURATION = 1500;

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(() => setVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [exiting]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-xl"
      style={{
        opacity: exiting ? 0 : 1,
        transition: "opacity 1.0s linear",
        willChange: "opacity",
        transform: "translateZ(0)",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
        className="font-brand font-serif text-2xl tracking-[0.16em] text-stone/70 sm:text-3xl"
      >
        Деревня Мишкино
      </motion.p>
    </div>
  );
}
