"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useMask } from "@/context/MaskContext";

interface Project {
  title: string;
  image: string;
  imageReveal: string;
  description: string;
  tags: string[];
  altText: string;
}

interface ProjectsRevealProps {
  projects: Project[];
}

export const ProjectsReveal = ({ projects }: ProjectsRevealProps) => {
  return (
    <div className="w-full">
      {projects.map((project, index) => (
        <SingleProjectReveal
          key={index}
          title={project.title}
          image={project.image}
          imageReveal={project.imageReveal}
          description={project.description}
          tags={project.tags}
          altText={project.altText}
        />
      ))}
    </div>
  );
};

const SingleProjectReveal = ({
  title,
  image,
  imageReveal,
  description,
  tags,
  altText,
}: Project) => {
  const revealRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { position, smoothMaskSize, setMaskSize, hasMouseMoved } = useMask();

  // Atualiza a posição da máscara
  useEffect(() => {
    if (!revealRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeX = position.x - containerRect.left;
    const relativeY = position.y - containerRect.top;

    revealRef.current.style.setProperty("--x", `${relativeX}px`);
    revealRef.current.style.setProperty("--y", `${relativeY}px`);
    revealRef.current.style.setProperty("--size", `${smoothMaskSize}px`);
  }, [position, smoothMaskSize]);

  // Configura o tamanho da máscara quando o mouse entra no projeto
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
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Camada de fundo */}
      <div className="absolute inset-0 bg-background z-0 flex items-center justify-center">
        <section className="flex flex-col gap-6 max-w-4xl p-8 text-element">
          {image && (
            <Image
              src={image}
              className="bg-foreground flex mx-auto shadow-md mb-4 transition-all duration-300 ease-out"
              alt={altText}
              width={696 / 2}
              height={1000 / 2}
              objectFit="cover"
            />
          )}
          <h2 className="text-center text-4xl text-foreground font-pt-mono text-element">
            {title}
          </h2>
          <p className="text-base text-foreground font-fira-mono text-element">
            {description}
          </p>
          <div className="flex flex-wrap font-fira-mono gap-4 text-start text-element">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="border-foreground text-foreground gap-3 border-2 rounded-lg px-2.5 py-1.5 text-sm text-element"
              >
                {tag}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Camada de reveal */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-foreground z-10 flex items-center justify-center pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(circle var(--size, 0px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--size, 0px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <section className="flex flex-col gap-6 max-w-4xl p-8">
          {imageReveal && (
            <Image
              src={imageReveal}
              className="bg-background flex mx-auto shadow-md mb-4"
              alt={altText}
              width={696 / 2}
              height={1000 / 2}
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
