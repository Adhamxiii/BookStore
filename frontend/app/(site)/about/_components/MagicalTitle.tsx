"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MagicalTitleProps {
  children: React.ReactNode;
  className?: string;
}

const MagicalTitle = ({ children, className = "" }: MagicalTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const text = titleRef.current.textContent || "";
        titleRef.current.innerHTML = text
          .split("")
          .map((char, i) => 
            `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(50px) rotateX(90deg);">${char === " " ? "&nbsp;" : char}</span>`
          )
          .join("");

        const chars = titleRef.current.querySelectorAll(".char");
        
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(chars, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              stagger: 0.05,
            });
          }
        });
      }
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <h2 ref={titleRef} className={className}>
      {children}
    </h2>
  );
};

export default MagicalTitle;
