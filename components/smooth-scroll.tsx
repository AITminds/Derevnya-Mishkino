"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });

    const stopLenis = () => lenis.stop();
    const startLenis = () => lenis.start();

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);
    window.addEventListener("lightbox:open", stopLenis);
    window.addEventListener("lightbox:close", startLenis);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("lightbox:open", stopLenis);
      window.removeEventListener("lightbox:close", startLenis);
      lenis.destroy();
    };
  }, []);

  return null;
}
