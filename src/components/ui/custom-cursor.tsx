"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "hover">("default");
  const cursorX = useSpring(-100, { damping: 25, stiffness: 200, mass: 0.5 });
  const cursorY = useSpring(-100, { damping: 25, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          body {
            cursor: none;
          }
          a, button {
            cursor: none;
          }
        }
      `}} />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 items-center justify-center rounded-full border-2 border-[#C9983C] mix-blend-difference md:flex"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: cursorState === "hover" ? 1.5 : 1,
          backgroundColor: cursorState === "hover" ? "rgba(201, 152, 60, 0.2)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div 
          className="h-1 w-1 rounded-full bg-[#C9983C]" 
          animate={{ scale: cursorState === "hover" ? 0 : 1 }}
        />
      </motion.div>
    </>
  );
}
