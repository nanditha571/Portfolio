import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const Magnetic = ({ children, strength = 0.3, className }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      setPosition({ x: x * strength, y: y * strength });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={cn('inline-block', className)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {children}
    </div>
  );
};
