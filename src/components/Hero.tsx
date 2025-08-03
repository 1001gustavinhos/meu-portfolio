"use client";
import { useEffect, useRef } from "react";
import { useMask } from "@/context/MaskContext";

export const HeroReveal = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { position, smoothMaskSize, setMaskSize, getRelativePosition } =
    useMask();

  // Atualiza a posição da máscara
  useEffect(() => {
    if (!revealRef.current || !containerRef.current) return;

    const relativePos = getRelativePosition(
      containerRef.current,
      position.x,
      position.y
    );

    revealRef.current.style.setProperty("--x", `${relativePos.x}px`);
    revealRef.current.style.setProperty("--y", `${relativePos.y}px`);
    revealRef.current.style.setProperty("--size", `${smoothMaskSize}px`);
  }, [position, smoothMaskSize, getRelativePosition]);

  // Configura o tamanho da máscara quando o mouse entra no hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;
      // Verifica se está sobre texto para aumentar a máscara
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const isOverText = elements.some(
        (el) =>
          el.classList.contains("text-element") || el.closest(".text-element")
      );

      setMaskSize(isOverText ? 180 : 20);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [setMaskSize]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-background"
    >
      {/* Camada de fundo (texto normal) */}
      <h1 className="absolute text-9xl font-fascinate text-element select-none text-foreground">
        gAsaD
      </h1>

      {/* Camada de reveal (texto com efeito) */}
      <div
        ref={revealRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none bg-foreground"
        style={{
          maskImage:
            "radial-gradient(circle var(--size, 0px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--size, 0px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          willChange: "transform, mask-position, -webkit-mask-position",
        }}
      >
        <h1 className="text-9xl font-fascinate  text-element select-none text-background">
          gAsaD
        </h1>
      </div>
    </div>
  );
};
