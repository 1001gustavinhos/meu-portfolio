"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProjectsProps {
  title: string;
  image: string;
  imageReveal: string;
  description: string;
  tags: string[];
  altText: string;
}

export const ProjectsSectionReveal = ({
  title,
  image,
  imageReveal,
  description,
  tags,
  altText,
}: ProjectsProps) => {
  const revealRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [maskSize, setMaskSize] = useState(100);
  const [position, setPosition] = useState({ x: 0, y: 0, scrollY: 0 });
  const lastPosition = useRef({ x: 0, y: 0, scrollY: 0 });
  const lastMouseMoveTime = useRef(0);
  const isScrolling = useRef(false);

  // Configuração da animação suave
  const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  };

  const animate = () => {
    if (!revealRef.current || !containerRef.current) return;

    // Suavização diferente baseada na atividade do mouse
    const lerpFactor = 0.2;

    // Calcula a posição suavizada
    const smoothX = lerp(lastPosition.current.x, position.x, lerpFactor);
    const viewportY = lastPosition.current.y;
    const smoothY = lerp(viewportY, position.y + window.scrollY, lerpFactor);

    revealRef.current.style.setProperty("--x", `${smoothX}px`);
    revealRef.current.style.setProperty("--y", `${smoothY}px`);
    revealRef.current.style.setProperty("--size", `${maskSize}px`);

    lastPosition.current = {
      x: smoothX,
      y: smoothY,
      scrollY: window.scrollY,
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [position, maskSize]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top - window.scrollY;

      isScrolling.current = false;

      // Verifica se está sobre texto para aumentar a máscara
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const isOverText = elements.some(
        (el) =>
          el.classList.contains("text-element") || el.closest(".text-element")
      );

      setMaskSize(isOverText ? 180 : 20);
      setPosition({
        x,
        y: y,
        scrollY: window.scrollY,
      });
    };

    const handleScroll = () => {
      isScrolling.current = true;
      // Durante o scroll, apenas atualiza a posição Y se o mouse não estiver ativo
      setPosition((prev) => ({
        ...prev,
        scrollY: window.scrollY,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Camada de fundo (base) */}
      <div className="absolute inset-0 bg-background z-0 flex items-center justify-center">
        <section className="flex flex-col gap-6 max-w-4xl p-8 text-element">
          {image && (
            <Image
              src={image}
              className="bg-foreground flex mx-auto shadow-md mb-4 transition-all duration-300 ease-out"
              alt={altText}
              width={600}
              height={500}
              objectFit="cover"
            />
          )}
          <h2 className="text-center text-4xl text-foreground font-pt-mono text-element transition-all duration-300 ease-out">
            {title}
          </h2>
          <p className="text-base text-foreground font-fira-mono text-element transition-all duration-300 ease-out">
            {description}
          </p>
          <div className="flex flex-wrap font-fira-mono gap-4 text-start text-element">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="border-foreground text-foreground gap-3 border-2 rounded-lg px-2.5 py-1.5 text-sm text-element transition-all duration-300 ease-out"
              >
                {tag}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Camada superior (reveal) com máscara */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-foreground z-10 flex items-center justify-center pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(circle var(--size, 100px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--size, 100px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          transition:
            "mask-size 0.4s cubic-bezier(0.16, 1, 0.3, 1), -webkit-mask-size 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, mask-position, -webkit-mask-position",
        }}
      >
        <section className="flex flex-col gap-6 max-w-4xl p-8">
          {imageReveal && (
            <Image
              src={imageReveal}
              className="bg-background flex mx-auto shadow-md mb-4"
              alt={altText}
              width={600}
              height={500}
              objectFit="cover"
            />
          )}
          <h2 className="text-center text-4xl text-background font-pt-mono">
            {title}
          </h2>
          <p className="text-base text-background font-fira-mono">
            {description}
          </p>
          <div className="flex flex-wrap font-fira-mono gap-4 text-start">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="border-background text-background gap-3 border-2 rounded-lg px-2.5 py-1.5 text-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
