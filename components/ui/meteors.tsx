"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteors, setMeteors] = useState<Array<{
    left: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  useEffect(() => {
    const meteorCount = number || 20;
    const meteorArray = Array.from({ length: meteorCount }, () => ({
      left: Math.floor(Math.random() * (400 - -400) + -400),
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2,
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2),
    }));
    setMeteors(meteorArray);
  }, [number]);

  return (
    <>
      {meteors.map((meteor, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-purple-500 shadow-[0_0_0_1px_#8b5cf6] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-purple-500 before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: meteor.left + "px",
            animationDelay: meteor.animationDelay + "s",
            animationDuration: meteor.animationDuration + "s",
          }}
        ></span>
      ))}
    </>
  );
};