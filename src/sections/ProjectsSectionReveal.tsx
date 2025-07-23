"use client";

import { useEffect, useRef } from "react";
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
  const maskSizeRef = useRef(100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (revealRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        // Verifica se o mouse está sobre algum elemento de texto
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const isOverText = elements.some(
          (el) =>
            el.classList.contains("text-element") || el.closest(".text-element")
        );

        // Atualiza o tamanho com transição suave
        const targetSize = isOverText ? 150 : 50;
        if (Math.abs(maskSizeRef.current - targetSize) > 5) {
          maskSizeRef.current += (targetSize - maskSizeRef.current) * 0.2;
        } else {
          maskSizeRef.current = targetSize;
        }

        revealRef.current.style.setProperty("--x", `${x}px`);
        revealRef.current.style.setProperty("--y", `${y}px`);
        revealRef.current.style.setProperty(
          "--size",
          `${maskSizeRef.current}px`
        );

        // Força repaint para garantir a animação
        revealRef.current.style.willChange = "mask-image, -webkit-mask-image";
      }
    };

    const animationFrame = requestAnimationFrame(() => {
      window.addEventListener("mousemove", handleMouseMove);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
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
              className="bg-foreground flex mx-auto shadow-md mb-4 transition-all duration-300"
              alt={altText}
              width={600}
              height={500}
              objectFit="cover"
            />
          )}
          <h2 className="text-center text-4xl text-foreground font-pt-mono text-element transition-all duration-300">
            {title}
          </h2>
          <p className="text-base text-foreground font-fira-mono text-element transition-all duration-300">
            {description}
          </p>
          <div className="flex flex-wrap font-fira-mono gap-4 text-start text-element">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="border-foreground text-foreground gap-3 border-2 rounded-lg px-2.5 py-1.5 text-sm text-element transition-all duration-300"
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
        className="absolute inset-0 bg-foreground z-10 flex items-center justify-center pointer-events-none transition-mask duration-300 ease-out"
        style={{
          maskImage:
            "radial-gradient(circle var(--size, 100px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--size, 100px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          transitionProperty: "mask-image, -webkit-mask-image",
          transitionDuration: "300ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <section className="flex flex-col gap-6 max-w-4xl p-8">
          {image && (
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
