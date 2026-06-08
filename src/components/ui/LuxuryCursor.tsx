"use client";

import { useEffect, useRef, useState } from "react";

export default function LuxuryCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const scale = useRef(1);
  const hasMoved = useRef(false);
  const isHoveringRef = useRef(false);

  // Sync state with ref so animation loop can access it without restarting the effect
  useEffect(() => {
    isHoveringRef.current = isHovering;
  }, [isHovering]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!hasMoved.current) {
        hasMoved.current = true;
        pos.current = { x: e.clientX, y: e.clientY };
        dotPos.current = { x: e.clientX, y: e.clientY };
        cursorPos.current = { x: e.clientX, y: e.clientY };
      } else {
        pos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleHoverEnter = () => setIsHovering(true);
    const handleHoverLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", moveCursor);

    const interactables = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverEnter);
      el.addEventListener("mouseleave", handleHoverLeave);
    });

    let animationId: number;
    const animate = () => {
      // Dot follows immediately for maximum precision
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 1.0;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 1.0;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px)`;
      }

      // Outer cursor follows with a fast, smooth LERP
      cursorPos.current.x += (pos.current.x - cursorPos.current.x) * 0.35;
      cursorPos.current.y += (pos.current.y - cursorPos.current.y) * 0.35;

      // Smoothly interpolate the scale for a luxury hover effect
      const targetScale = isHoveringRef.current ? 1.8 : 1.0;
      scale.current += (targetScale - scale.current) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x - 10}px, ${cursorPos.current.y - 10}px) scale(${scale.current})`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="luxury-cursor"
        style={{
          background: isHovering ? "rgba(217,137,166,0.15)" : "transparent",
          borderColor: isHovering ? "#C89B63" : "#D989A6",
        }}
      />
      <div ref={dotRef} className="luxury-cursor-dot" />
    </>
  );
}
