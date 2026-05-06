"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type HeroParallaxSceneProps = {
  estateImage: string;
  estateImageAlt: string;
  oakFrameImage: string;
  estateSpeed: number;
  oakFrameSpeed: number;
  hazeSpeed: number;
};

export function HeroParallaxScene({
  estateImage,
  estateImageAlt,
  oakFrameImage,
  estateSpeed,
  oakFrameSpeed,
  hazeSpeed,
}: HeroParallaxSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const update = () => setIsMobile(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const intensity = prefersReducedMotion ? 0 : isMobile ? 0.3 : 1;

  const estateY = useTransform(scrollY, [0, 900], [0, estateSpeed * intensity]);
  const oakFrameY = useTransform(scrollY, [0, 900], [0, oakFrameSpeed * intensity]);
  const hazeY = useTransform(scrollY, [0, 900], [0, hazeSpeed * intensity]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,247,240,0.94),rgba(228,233,222,0.78)_34%,rgba(199,210,194,0.26)_62%,rgba(233,238,228,0.96)_100%)]" />
      <motion.div style={{ y: hazeY }} className="absolute left-[-8%] top-[5%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(244,247,237,0.68),rgba(244,247,237,0.04)_70%)] blur-3xl" />
      <motion.div style={{ y: useTransform(hazeY, (value) => value * 0.8) }} className="absolute right-[-10%] top-[14%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(110,128,92,0.24),rgba(110,128,92,0.02)_72%)] blur-3xl" />

      <motion.div style={{ y: estateY }} className="absolute inset-x-0 bottom-[8%] top-[8%] sm:inset-x-[2%] sm:bottom-[5%] sm:top-[6%] lg:inset-x-[3%] lg:bottom-[4%] lg:top-[7%]">
        <div className="relative h-full overflow-hidden rounded-[42px] shadow-[0_40px_120px_rgba(88,64,41,0.18)]">
          <Image src={estateImage} alt={estateImageAlt} fill priority className="object-cover object-center scale-[1.04] sm:scale-[1.02]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(48,60,40,0.10),rgba(59,75,48,0.26))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,251,244,0.16),rgba(250,251,244,0)_38%),linear-gradient(180deg,rgba(246,248,242,0.02),rgba(215,223,208,0.14))]" />
          <div className="absolute inset-x-0 bottom-[-6%] h-[22%] bg-[linear-gradient(180deg,rgba(234,239,229,0),rgba(234,239,229,0.88)_58%,rgba(234,239,229,1)_100%)] blur-2xl sm:h-[18%]" />
        </div>
      </motion.div>

      <motion.div style={{ y: oakFrameY }} className="absolute inset-0 opacity-[0.74] sm:opacity-90 lg:opacity-[0.96]">
        <Image src={oakFrameImage} alt="Дубовая рамка перед домом" fill className="object-cover object-center" />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,247,239,0.04),rgba(226,232,220,0.14)_56%,rgba(232,237,226,0.76)_100%)]" />
    </div>
  );
}
