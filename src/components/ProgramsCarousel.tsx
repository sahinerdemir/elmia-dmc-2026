"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  title: string;
  category: string;
  image: string;
  slug: string;
}

interface Props {
  items: CarouselItem[];
  visibleCount?: number;
  linkPrefix?: string;
}

export default function ProgramsCarousel({ items, visibleCount = 4, linkPrefix = "" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [effectiveVisibleCount, setEffectiveVisibleCount] = useState(visibleCount);
  const [currentGap, setCurrentGap] = useState(24);
  const [isMobileView, setIsMobileView] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const updateLayout = useCallback(() => {
    if (!trackRef.current) return;
    const containerWidth = trackRef.current.parentElement?.clientWidth ?? 0;
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;

    const isMob = windowWidth < 640;
    setIsMobileView(isMob);

    let count = visibleCount;
    let g = 24;

    if (isMob) {
      // 1 full card + 2nd card half-visible touching right edge
      count = 1.5;
      g = 14;
    } else if (windowWidth < 1024) {
      count = Math.min(visibleCount, 3);
      g = 16;
    } else {
      count = visibleCount;
      g = 24;
    }

    setEffectiveVisibleCount(count);
    setCurrentGap(g);

    if (containerWidth > 0) {
      // On mobile: 1.5 * cardWidth + g = containerWidth => cardWidth = (containerWidth - g) / 1.5
      const width = isMob
        ? (containerWidth - g) / 1.5
        : (containerWidth - g * (count - 1)) / count;
      setCardWidth(width);
    }
  }, [visibleCount]);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  const maxIndex = isMobileView
    ? items.length - 1
    : Math.max(0, items.length - effectiveVisibleCount);

  const scrollTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clamped);
    },
    [maxIndex]
  );

  useEffect(() => {
    if (currentIndex > maxIndex) {
      scrollTo(maxIndex);
    }
  }, [maxIndex, currentIndex, scrollTo]);

  useEffect(() => {
    if (!trackRef.current || cardWidth <= 0) return;
    const containerWidth = trackRef.current.parentElement?.clientWidth ?? 0;

    if (isMobileView) {
      const totalWidth = items.length * cardWidth + (items.length - 1) * currentGap;
      const maxScrollX = Math.max(0, totalWidth - containerWidth);
      const targetX = Math.min(currentIndex * (cardWidth + currentGap), maxScrollX);
      trackRef.current.style.transform = `translateX(-${targetX}px)`;
    } else {
      trackRef.current.style.transform = `translateX(-${currentIndex * (cardWidth + currentGap)}px)`;
    }
  }, [currentIndex, cardWidth, currentGap, items.length, isMobileView]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      scrollTo(currentIndex + 1);
    } else if (distance < -40) {
      scrollTo(currentIndex - 1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div>
      {/* Overflow container: extends to right edge on mobile (-mr-4 sm:mr-0) so 2nd card touches screen edge */}
      <div
        className="overflow-hidden touch-pan-y -mr-4 sm:mr-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ gap: `${currentGap}px` }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-[16px] sm:rounded-[20px] overflow-hidden group bg-[#111111] flex flex-col justify-end shadow-sm shrink-0 min-h-[300px] sm:min-h-[380px] lg:min-h-[420px] w-[calc((100%-14px)/1.5)] sm:w-[calc((100%-32px)/3)] lg:w-[calc((100%-72px)/4)]"
              style={{
                width: cardWidth > 0 ? `${cardWidth}px` : undefined,
              }}
            >
              {/* Full Featured Image */}
              <Image
                src={item.image}
                alt={`${item.title} - ${item.category} by ELMIA DMC`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-[2] transition-opacity duration-300 group-hover:opacity-95" />

              {/* Text Content at Bottom Left */}
              <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/75 font-normal mb-1 sm:mb-2 font-heading">
                  {item.category}
                </div>
                <h3 className="font-heading text-base sm:text-xl lg:text-2xl font-normal text-white leading-tight tracking-tight group-hover:text-[#61CE70] transition-colors line-clamp-2 sm:line-clamp-none">
                  {item.title}
                </h3>
              </div>

              {/* Clickable Overlay Link */}
              <Link
                href={linkPrefix ? `/${linkPrefix}/${item.slug}` : `/${item.slug}`}
                className="absolute inset-0 z-20"
                aria-label={item.title}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls: aligned with section margins */}
      {items.length > 1 && (
        <div className="flex items-center justify-between sm:justify-end gap-3 mt-6">
          {/* Dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[200px] sm:max-w-none">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`rounded-full transition-all duration-300 shrink-0 cursor-pointer ${
                  i === currentIndex
                    ? "w-6 h-2 bg-[#285735]"
                    : "w-2 h-2 bg-[#cccccc] hover:bg-[#285735]/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#444444] hover:border-[#285735] hover:text-[#285735] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => scrollTo(currentIndex + 1)}
              disabled={currentIndex >= maxIndex}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#444444] hover:border-[#285735] hover:text-[#285735] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
