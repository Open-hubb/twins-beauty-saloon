"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, select"
      );
      if (interactive) {
        setIsHovering(true);
        const cursorLabel =
          interactive.getAttribute("data-cursor") || "";
        setLabel(cursorLabel);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, select"
      );
      if (interactive) {
        setIsHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    let rafId: number;
    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      followerPos.current.x +=
        (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y +=
        (pos.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px) scale(${isHovering ? 2.5 : 1})`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(rafId);
    };
  }, [isHovering]);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-300 ${isHovering ? "h-2 w-2 opacity-0" : "h-2 w-2 opacity-100"}`}
        />
      </div>
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`flex items-center justify-center rounded-full border border-white/30 transition-all duration-500 ${isHovering ? "h-16 w-16 bg-white/10 backdrop-blur-sm" : "h-8 w-8 bg-transparent"}`}
        >
          {label && isHovering && (
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
