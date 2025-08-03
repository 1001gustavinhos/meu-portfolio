"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface MaskPosition {
  x: number;
  y: number;
  scrollY: number;
}

interface MaskContextType {
  position: MaskPosition;
  maskSize: number;
  smoothMaskSize: number;
  hasMouseMoved: React.MutableRefObject<boolean>;
  setMaskSize: (size: number) => void;
  setPosition: (position: MaskPosition) => void;
  getRelativePosition: (
    element: HTMLElement,
    x: number,
    y: number
  ) => MaskPosition;
}

const MaskContext = createContext<MaskContextType | undefined>(undefined);

export const MaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [maskSize, setMaskSize] = useState(0);
  const [smoothMaskSize, setSmoothMaskSize] = useState(0);
  const [position, setPosition] = useState<MaskPosition>({
    x: 0,
    y: 0,
    scrollY: 0,
  });

  const lastPosition = useRef<MaskPosition>({ x: 0, y: 0, scrollY: 0 });
  const hasMouseMoved = useRef(false);
  const animationRef = useRef<number | null>(null);
  const mouseMoveTimeout = useRef<NodeJS.Timeout | null>(null);

  const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  };

  const getRelativePosition = (
    element: HTMLElement,
    x: number,
    y: number
  ): MaskPosition => {
    const rect = element.getBoundingClientRect();
    return {
      x: x - rect.left,
      y: y - rect.top,
      scrollY: window.scrollY,
    };
  };

  // Animação suave da máscara
  useEffect(() => {
    const animate = () => {
      const positionLerpFactor = 0.2; // Fator de suavização para posição
      const sizeLerpFactor = 0.1; // Fator de suavização para tamanho

      // Interpolação para movimento suave
      const smoothX = lerp(
        lastPosition.current.x,
        position.x,
        positionLerpFactor
      );

      const smoothY = lerp(
        lastPosition.current.y,
        position.y + window.scrollY,
        positionLerpFactor
      );

      // Tamanho da máscara com suavização
      const targetSize = hasMouseMoved.current ? maskSize : 0;
      const newSmoothSize = lerp(smoothMaskSize, targetSize, sizeLerpFactor);
      setSmoothMaskSize(newSmoothSize);

      // Atualiza a posição de referência
      lastPosition.current = {
        x: smoothX,
        y: smoothY,
        scrollY: window.scrollY,
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position, maskSize]);

  // Configura listeners de mouse e scroll
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Debounce para melhor performance
      if (mouseMoveTimeout.current) {
        clearTimeout(mouseMoveTimeout.current);
      }

      mouseMoveTimeout.current = setTimeout(() => {
        if (!hasMouseMoved.current) {
          hasMouseMoved.current = true;
          setMaskSize(20); // Tamanho inicial
        }

        setPosition({
          x: e.clientX,
          y: e.clientY,
          scrollY: window.scrollY,
        });
      });
    };

    const handleScroll = () => {
      setPosition((prev) => ({
        ...prev,
        scrollY: window.scrollY,
      }));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (!hasMouseMoved.current) {
          hasMouseMoved.current = true;
          setMaskSize(20);
        }

        setPosition({
          x: touch.clientX,
          y: touch.clientY,
          scrollY: window.scrollY,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleTouchMove);
      if (mouseMoveTimeout.current) {
        clearTimeout(mouseMoveTimeout.current);
      }
    };
  }, []);

  return (
    <MaskContext.Provider
      value={{
        position,
        maskSize,
        smoothMaskSize,
        hasMouseMoved,
        setMaskSize,
        setPosition,
        getRelativePosition,
      }}
    >
      {children}
    </MaskContext.Provider>
  );
};

export const useMask = () => {
  const context = useContext(MaskContext);
  if (context === undefined) {
    throw new Error("useMask must be used within a MaskProvider");
  }
  return context;
};
