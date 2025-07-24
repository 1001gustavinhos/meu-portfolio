"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
}: {
  title: string;
  image: string;
  imageReveal: string;
  description: string;
  tags: string[];
  altText: string;
}) => {
  const revealRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [maskSize, setMaskSize] = useState(0);
  const [smoothMaskSize, setSmoothMaskSize] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0, scrollY: 0 });
  const lastPosition = useRef({ x: 0, y: 0, scrollY: 0 });
  const isScrolling = useRef(false);
  const hasMouseMoved = useRef(false);

  const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  };

  const animate = () => {
    if (!revealRef.current || !containerRef.current) return;

    const positionLerpFactor = 0.2;
    const sizeLerpFactor = 0.1;

    const smoothX = lerp(
      lastPosition.current.x,
      position.x,
      positionLerpFactor
    );
    const viewportY = lastPosition.current.y;
    const smoothY = lerp(
      viewportY,
      position.y + window.scrollY,
      positionLerpFactor
    );

    const targetSize = hasMouseMoved.current ? maskSize : 0;
    const newSmoothSize = lerp(smoothMaskSize, targetSize, sizeLerpFactor);
    setSmoothMaskSize(newSmoothSize);

    revealRef.current.style.setProperty("--x", `${smoothX}px`);
    revealRef.current.style.setProperty("--y", `${smoothY}px`);
    revealRef.current.style.setProperty("--size", `${newSmoothSize}px`);

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

      if (!hasMouseMoved.current) {
        hasMouseMoved.current = true;
        setMaskSize(20);
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top - window.scrollY;

      isScrolling.current = false;

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
          transition:
            "mask-position 0.1s linear, -webkit-mask-position 0.1s linear",
          willChange: "transform, mask-position, -webkit-mask-position",
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
