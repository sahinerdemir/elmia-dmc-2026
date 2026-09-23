"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Milliseconds
  duration?: number; // Milliseconds
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number; // Pixels
  as?: React.ElementType;
}

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  duration = 650,
  direction = "up",
  distance = 24,
  as: Component = "div"
}: RevealOnScrollProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);

    // If user prefers reduced motion, or IntersectionObserver is not supported, reveal immediately
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return;
    }

    const currentEl = domRef.current;
    if (!currentEl) return;

    // Check if element is already within viewport on mount
    const rect = currentEl.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top <= windowHeight - 40) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.08
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTransform = () => {
    if (!mounted || isVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      case "none":
      default:
        return "none";
    }
  };

  const style: React.CSSProperties = mounted
    ? {
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform"
      }
    : {};

  return (
    <Component ref={domRef} className={className} style={style}>
      {children}
    </Component>
  );
}
