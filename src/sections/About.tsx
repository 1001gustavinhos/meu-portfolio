"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useMask } from "@/context/MaskContext";
import { DownloadIcon } from "@/components/SocialIcon";

export const AboutSection = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { smoothPosition, smoothMaskSize, setMaskSize, isMobile } = useMask();

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

  // Configura o comportamento da máscara
  useEffect(() => {
    if (isMobile) {
      setMaskSize(10000); // Mostra tudo em mobile
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const isOverText = elements.some((el) =>
        el.classList.contains("about-text")
      );
      setMaskSize(isOverText ? 300 : 20);
      const isOverButton = elements.some((el) =>
        el.classList.contains("about-button")
      );
      if (isOverButton) {
        setMaskSize(0);
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
  }, [setMaskSize, isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-background"
    >
      {/* Camada de fundo */}
      <div className="relative w-full max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Container da imagem */}
        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/sadabout.jpg"
            alt="Gustavo Asa Dantas"
            fill
            className="object-cover saturate-0 about-text"
          />
        </div>

        {/* Container do texto */}
        <div className="space-y-6 ">
          <h2 className="text-4xl font-bold font-pt-mono text-foreground">
            Sobre mim
          </h2>

          <div className="space-y-4 text-foreground/90 font-fira-mono about-text">
            <p>
              Desenvolvedor fullstack com formação em Biologia, combinando
              pensamento científico com habilidades técnicas para criar soluções
              inovadoras.
            </p>
            <p>
              Minha jornada me levou de laboratórios de pesquisa ao
              desenvolvimento de software, onde encontrei minha paixão por
              resolver problemas complexos através da tecnologia.
            </p>
            <p>
              Especializado em React, Node.js e arquitetura de sistemas, busco
              sempre aliar eficiência técnica com design intuitivo.
            </p>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/docs/curriculo-gustavo-asa-dantas.pdf"
              download
              className="flex items-center border-2 border-foreground font-fira-mono gap-2 px-6 py-3 bg-background text-foreground hover:bg-foreground hover:text-background rounded-lg transition-colors about-button"
            >
              <DownloadIcon className="w-5 h-5" />
              Baixar CV
            </a>

            <a
              href="https://wa.me/11981071231"
              className="px-6 py-3 border-2 border-foreground font-fira-mono text-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors about-button"
            >
              Entrar em Contato
            </a>
          </div>
        </div>
      </div>

      {/* Camada de reveal */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-foreground z-10 flex items-center justify-center pointer-events-none"
        style={{
          maskImage: isMobile
            ? "none"
            : "radial-gradient(circle var(--size, 0px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          WebkitMaskImage: isMobile
            ? "none"
            : "radial-gradient(circle var(--size, 0px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
        }}
      >
        <div className="relative w-full max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Container da imagem reveal */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/about.jpg"
              alt="Gustavo Asa Dantas - Efeito"
              fill
              className="object-cover"
            />
          </div>

          {/* Container do texto reveal */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold font-pt-mono text-background">
              mim erboS
            </h2>

            <div className="space-y-4 text-background/90 font-fira-mono about-text">
              <p>
                Desenvolvedor fullstack com formação em Biologia, combinando
                pensamento científico com habilidades técnicas para criar
                soluções inovadoras.
              </p>
              <p>
                Minha jornada me levou de laboratórios de pesquisa ao
                desenvolvimento de software, onde encontrei minha paixão por
                resolver problemas complexos através da tecnologia.
              </p>
              <p>
                Especializado em React, Node.js e arquitetura de sistemas, busco
                sempre aliar eficiência técnica com design intuitivo.
              </p>
            </div>

            {/* Botões de ação reveal */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div
                onMouseEnter={() => !isMobile && setMaskSize(0)}
                onMouseLeave={() => !isMobile && setMaskSize(20)}
                className="flex items-center border-2 border-foreground font-fira-mono gap-2 px-6 py-3 bg-background text-foreground rounded-lg transition-colors about-button"
              >
                <DownloadIcon className="w-5 h-5" />
                Baixar CV
              </div>

              <div
                onMouseEnter={() => !isMobile && setMaskSize(0)}
                onMouseLeave={() => !isMobile && setMaskSize(20)}
                className="px-6 py-3 border-2 border-foreground font-fira-mono bg-background text-foreground hover:bg-foreground hover:text-background rounded-lg about-button"
              >
                Entrar em Contato
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
