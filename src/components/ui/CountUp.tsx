"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
}

export function CountUp({ end, duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}
