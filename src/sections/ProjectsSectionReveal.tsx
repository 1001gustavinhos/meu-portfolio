"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useMask } from "@/context/MaskContext";
import { ExternalLink } from "lucide-react";

interface Project {
  title: string;
  image: string;
  imageReveal: string;
  externalLink: string;
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
          externalLink={project.externalLink}
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
  externalLink,
  tags,
  altText,
}: Project) => {
  const revealRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { smoothPosition, smoothMaskSize, setMaskSize } = useMask();

  // Atualiza a posição da máscara
  useEffect(() => {
    if (!revealRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeX = smoothPosition.x - containerRect.left;
    const relativeY = smoothPosition.y - containerRect.top;

    revealRef.current.style.setProperty("--x", `${relativeX}px`);
    revealRef.current.style.setProperty("--y", `${relativeY}px`);
    revealRef.current.style.setProperty("--size", `${smoothMaskSize}px`);
  }, [smoothPosition, smoothMaskSize]);

  // Configura o tamanho da máscara quando o mouse entra no projeto
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Verifica se está sobre texto para aumentar a máscara
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const isOverText = elements.some(
        (el) =>
          el.classList.contains("text-element") || el.closest(".text-element")
      );

      setMaskSize(isOverText ? 220 : 20);
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
      {/* Camada de fundo */}
      <div className="relative w-full h-full bg-background z-0 flex items-center justify-center">
        <section className="flex flex-col gap-6 max-w-4xl p-8 text-element">
          {image && (
            <Image
              src={image}
              className="bg-foreground flex mx-auto shadow-md mb-4 saturate-0 object-cover"
              alt={altText}
              width={1920}
              height={1080}
            />
          )}
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-center font-bold md:text-4xl text-2xl text-foreground font-pt-mono text-element">
              {title}
            </h2>
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-foreground hover:underline hover:text-primary transition-colors"
            >
              <ExternalLink
                strokeWidth={2.5}
                className="size-6 md:size-7 text-foreground ml-2"
              />
            </a>
          </div>
          <p className="md:text-base text-sm text-foreground text-justify  font-fira-mono text-element">
            {description}
          </p>
          <div className="flex flex-wrap font-fira-mono gap-4 text-start text-element">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="border-foreground text-foreground gap-3 md:border-2 border-1 rounded-lg px-2.5 py-1.5 md:text-sm  text-xs text-element"
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
        className="absolute w-full h-full bg-foreground z-10 flex items-center justify-center pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(circle var(--size, 0px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--size, 0px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <section className="flex flex-col gap-6 max-w-4xl  p-8 text-element">
          {imageReveal && (
            <video
              width="1920"
              height="1080"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover mx-auto shadow-md mb-4"
            >
              <source src={imageReveal} type="video/webm" />
            </video>
          )}
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-center font-bold md:text-4xl text-2xl text-background font-pt-mono">
              {title}
            </h2>
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-foreground hover:underline hover:text-primary transition-colors"
            >
              <ExternalLink
                strokeWidth={2.5}
                className="size-6 md:size-7 text-background ml-2"
              />
            </a>
          </div>
          <p className="md:text-base text-sm text-justify text-background font-fira-mono">
            {description}
          </p>
          <div className="flex flex-wrap font-fira-mono gap-4 text-start">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="border-background text-background gap-3 md:border-2 border-1 md:text-sm  text-xs rounded-lg px-2.5 py-1.5"
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
