"use client";
import { useEffect, useRef } from "react";
import { useMask } from "@/context/MaskContext";
import { AutoType } from "@/components/AutoType";

export const HeroReveal = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    smoothPosition,
    smoothMaskSize,
    setMaskSize,
    getRelativePosition,
    hasMouseMoved,
  } = useMask();

  // Atualiza a posição da máscara
  useEffect(() => {
    if (!revealRef.current || !containerRef.current) return;

    const relativePos = getRelativePosition(
      containerRef.current,
      smoothPosition.x,
      smoothPosition.y
    );

    revealRef.current.style.setProperty("--x", `${relativePos.x}px`);
    revealRef.current.style.setProperty("--y", `${relativePos.y}px`);
    revealRef.current.style.setProperty("--size", `${smoothMaskSize}px`);
  }, [smoothPosition, smoothMaskSize, getRelativePosition]);

  // Configura o comportamento padrão da máscara
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const isOverIcon = elements.some((el) =>
        el.closest("[data-social-icon]")
      );
      const isOverText = elements.some((el) =>
        el.classList.contains("text-element")
      );

      // Não faz nada se estiver sobre um ícone (o ícone controla seu próprio estado)
      if (isOverIcon) return;

      setMaskSize(isOverText ? 220 : 20);

      if (!hasMouseMoved.current) {
        hasMouseMoved.current = true;
      }
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
  }, [setMaskSize, hasMouseMoved]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen max-h-[1200px] flex items-center justify-center bg-background"
    >
      {/* Camada de fundo (texto normal) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="absolute md:text-9xl text-8xl font-fascinate text-element select-none text-foreground">
          gAsaD
        </h1>
        <div className="size-2 md:size-3 rounded-full bg-background absolute" />
      </div>
      <h2 className="md:mt-55 mt-40 text-foreground md:text-2xl text-xl font-pt-mono text-element">
        Gustavo Alencar S.A. Dantas
      </h2>

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
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="absolute md:text-9xl text-8xl font-fascinate text-element select-none text-background">
            gAsaD
          </h1>

          <div className="size-2 md:size-3 rounded-full bg-foreground absolute" />
        </div>
        <AutoType
          className="md:mt-55 mt-40 text-background md:text-2xl text-xl font-fira-mono"
          cursorColor="bg-background"
        />
      </div>
    </div>
  );
};
