"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryShowcaseProps = {
  images: readonly GalleryImage[];
};

type Point = {
  x: number;
  y: number;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_DELAY = 260;
const DOUBLE_TAP_SCALE = 2.4;

export function GalleryShowcase({ images }: GalleryShowcaseProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  const pinchDistanceRef = useRef<number | null>(null);
  const pinchStartScaleRef = useRef(1);
  const panStartPointRef = useRef<Point | null>(null);
  const panStartOffsetRef = useRef<Point>({ x: 0, y: 0 });
  const lastTapTimeRef = useRef(0);
  const lastTapPointRef = useRef<Point>({ x: 0, y: 0 });

  const lightboxImage = lightboxIndex === null ? null : images[lightboxIndex];

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("lightbox:close"));
      resetZoom();
      return;
    }

    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("lightbox:open"));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current === null ? current : (current + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("lightbox:close"));
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, lightboxIndex]);

  useEffect(() => {
    resetZoom();
  }, [lightboxIndex]);

  const resetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    pinchDistanceRef.current = null;
    pinchStartScaleRef.current = 1;
    panStartPointRef.current = null;
    panStartOffsetRef.current = { x: 0, y: 0 };
    lastTapTimeRef.current = 0;
  };

  const clampScale = (value: number) => Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);

  const getTouchDistance = (touches: React.TouchList) => {
    const first = touches[0];
    const second = touches[1];
    return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const movePrev = () => {
    setLightboxIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
  };

  const moveNext = () => {
    setLightboxIndex((current) => (current === null ? current : (current + 1) % images.length));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      pinchDistanceRef.current = getTouchDistance(event.touches);
      pinchStartScaleRef.current = scale;
      panStartPointRef.current = null;
      return;
    }

    if (event.touches.length === 1 && scale > 1) {
      const touch = event.touches[0];
      panStartPointRef.current = { x: touch.clientX, y: touch.clientY };
      panStartOffsetRef.current = offset;
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2 && pinchDistanceRef.current !== null) {
      event.preventDefault();
      const nextDistance = getTouchDistance(event.touches);
      const nextScale = clampScale(pinchStartScaleRef.current * (nextDistance / pinchDistanceRef.current));
      setScale(nextScale);

      if (nextScale <= 1.02) {
        setOffset({ x: 0, y: 0 });
      }
      return;
    }

    if (event.touches.length === 1 && panStartPointRef.current && scale > 1) {
      event.preventDefault();
      const touch = event.touches[0];
      setOffset({
        x: panStartOffsetRef.current.x + (touch.clientX - panStartPointRef.current.x),
        y: panStartOffsetRef.current.y + (touch.clientY - panStartPointRef.current.y),
      });
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 0) {
      pinchDistanceRef.current = null;
      panStartPointRef.current = null;
    }

    if (event.changedTouches.length !== 1 || pinchDistanceRef.current !== null) {
      return;
    }

    const touch = event.changedTouches[0];
    const now = Date.now();
    const isDoubleTap =
      now - lastTapTimeRef.current < DOUBLE_TAP_DELAY &&
      Math.abs(lastTapPointRef.current.x - touch.clientX) < 24 &&
      Math.abs(lastTapPointRef.current.y - touch.clientY) < 24;

    if (isDoubleTap) {
      if (scale > 1) {
        setScale(1);
        setOffset({ x: 0, y: 0 });
      } else {
        setScale(DOUBLE_TAP_SCALE);
      }
      lastTapTimeRef.current = 0;
      return;
    }

    lastTapTimeRef.current = now;
    lastTapPointRef.current = { x: touch.clientX, y: touch.clientY };
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative overflow-hidden rounded-[22px] text-left shadow-[0_18px_50px_rgba(68,85,58,0.12)] sm:rounded-[28px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,62,41,0.02),rgba(61,78,50,0.16))]" />
            </div>
            <div className="liquid-glass organic-wash absolute inset-x-3 bottom-3 rounded-[18px] p-3 sm:inset-x-4 sm:bottom-4 sm:rounded-[20px]">
              <p className="text-sm leading-5 text-stone">{image.alt}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(34,29,25,0.56)] p-0 backdrop-blur-md sm:p-4"
            onWheel={(event) => event.preventDefault()}
          >
            <button type="button" aria-label="Закрыть просмотр изображения" onClick={() => setLightboxIndex(null)} className="absolute inset-0" />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex h-full w-full max-w-[98vw] flex-col overflow-hidden bg-[linear-gradient(180deg,rgba(247,248,242,0.98),rgba(232,237,226,0.96))] shadow-[0_28px_90px_rgba(50,63,42,0.24)] sm:h-auto sm:max-h-[96vh] sm:max-w-[94vw] sm:rounded-[28px] lg:max-w-[92vw]"
            >
              <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
                <div className="liquid-glass organic-wash rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone">
                  Галерея
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="liquid-glass inline-flex h-11 w-11 items-center justify-center rounded-full text-stone"
                >
                  ×
                </button>
              </div>

              <div
                className="relative h-[72vh] min-h-[320px] flex-1 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(243,246,237,0.94),rgba(223,232,214,0.86)_46%,rgba(205,217,196,0.88)_100%)] sm:h-[78vh] sm:min-h-[520px] sm:max-h-[calc(96vh-10rem)]"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                    transformOrigin: "center center",
                    transition: pinchDistanceRef.current ? "none" : "transform 180ms ease-out",
                    touchAction: "none",
                  }}
                >
                  <img src={lightboxImage.src} alt={lightboxImage.alt} className="h-full w-full object-contain" draggable={false} />
                </div>
              </div>

              <div className="relative z-10 border-t border-pine/10 bg-[linear-gradient(180deg,rgba(241,245,236,0.96),rgba(228,235,221,0.98))] px-4 py-3 text-stone sm:px-6 sm:py-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{(lightboxIndex ?? 0) + 1} / {images.length}</p>
                    <p className="mt-2 text-sm leading-6 text-stone sm:text-base">{lightboxImage.alt}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={movePrev}
                      className="rounded-full border border-pine/12 bg-white/65 px-4 py-2 text-sm font-medium text-stone transition hover:bg-white"
                    >
                      Назад
                    </button>
                    <button
                      type="button"
                      onClick={moveNext}
                      className="rounded-full border border-pine/12 bg-white/65 px-4 py-2 text-sm font-medium text-stone transition hover:bg-white"
                    >
                      Далее
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
