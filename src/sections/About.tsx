"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMask } from "@/context/MaskContext";
import { WHATSAPP_LINK_DEV } from "@/utils/utils";
import { ArrowRight } from "lucide-react";

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
        el.classList.contains("about-text"),
      );
      setMaskSize(isOverText ? 300 : 20);
      const isOverButton = elements.some((el) =>
        el.classList.contains("about-button"),
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
      className='relative w-full min-h-screen flex items-center justify-center bg-background'>
      {/* Camada de fundo */}
      <div className='relative w-full max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        {/* Container da imagem */}
        <div className='relative aspect-square rounded-2xl overflow-hidden shadow-xl'>
          <Image
            src='/sadabout.JPG'
            alt='Gustavo Asa Dantas'
            fill
            sizes='(min-width: 1024px) 50vw, 100vw'
            className='w-full h-full object-cover saturate-0 about-text'
          />
        </div>

        {/* Container do texto */}
        <div className='space-y-6 '>
          <h2 className='md:text-4xl text-2xl font-bold font-pt-mono text-foreground about-text'>
            Precisa de site ou app?
          </h2>

          <div className='space-y-4 text-foreground md:text-base text-sm font-fira-mono about-text'>
            <p>
              Meu nome é{" "}
              <span className='font-bold'>Gustavo Alencar S.A. Dantas</span>{" "}
              desenvolvedor Web/Mobile.
            </p>
            <p>
              Seja um site, um aplicativo ou um sistema, eu transformo o que
              você imagina em algo real, funcional e bonito. Não importa o
              tamanho da sua ideia ou o seu conhecimento técnico. Se faz sentido
              para o seu negócio, eu encontro o melhor caminho para executar.
            </p>
            <p>
              Está precisando colocar suas ideias em prática? Entre em contato!
            </p>
          </div>

          {/* Botões de ação */}
          <div className='flex flex-wrap gap-4 pt-4'>
            <a
              href={WHATSAPP_LINK_DEV}
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Entrar em Contato'
              className='px-6 py-3 md:border-2 border text-xs md:text-base border-foreground font-fira-mono text-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors about-button'>
              Entrar em Contato
            </a>

            <Link
              href='/curriculo'
              aria-label='Saiba mais sobre minha trajetória'
              className='flex items-center md:border-2 border text-xs md:text-base border-foreground font-fira-mono gap-2 px-6 py-3 bg-background text-foreground hover:bg-foreground hover:text-background rounded-lg transition-colors about-button'>
              Currículo
              <ArrowRight className='md:size-5 size-4' />
            </Link>
          </div>
        </div>
      </div>

      {/* Camada de reveal */}
      <div
        ref={revealRef}
        className='absolute inset-0 bg-foreground z-10 flex items-center justify-center pointer-events-none'
        style={{
          maskImage: isMobile
            ? "none"
            : "radial-gradient(circle var(--size, 0px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
          WebkitMaskImage: isMobile
            ? "none"
            : "radial-gradient(circle var(--size, 0px) at var(--x, 50%) var(--y, 50%), white 99%, transparent 100%)",
        }}>
        <div className='relative w-full max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Container da imagem reveal */}
          <div className='relative aspect-square rounded-2xl overflow-hidden shadow-xl'>
            <Image
              src='/about.JPG'
              alt='Gustavo Asa Dantas - Efeito'
              fill
              sizes='(min-width: 1024px) 50vw, 100vw'
              className='w-full h-full object-cover about-text'
            />
          </div>

          {/* Container do texto reveal */}
          <div className='space-y-6'>
            <h2 className='md:text-4xl text-2xl font-bold font-pt-mono text-background about-text'>
              Vamos trabalhar juntos!
            </h2>

            <div className='space-y-4 text-background/90 md:text-base text-sm font-fira-mono about-text'>
              <p>
                Meu nome é{" "}
                <span className='font-bold'>Gustavo Alencar S.A. Dantas</span>{" "}
                desenvolvedor Web/Mobile.
              </p>
              <p>
                Seja um site, um aplicativo ou um sistema, eu transformo o que
                você imagina em algo real, funcional e bonito. Não importa o
                tamanho da sua ideia ou o seu conhecimento técnico. Se faz
                sentido para o seu negócio, eu encontro o melhor caminho para
                executar.
              </p>
              <p>
                Está precisando colocar suas ideias em prática? Entre em
                contato!
              </p>
            </div>

            {/* Botões de ação reveal */}
            <div className='flex flex-wrap gap-4 pt-4'>
              <a
                href={WHATSAPP_LINK_DEV}
                rel='noopener noreferrer'
                target='_blank'
                aria-label='Entrar em Contato'
                onMouseEnter={() => !isMobile && setMaskSize(0)}
                onMouseLeave={() => !isMobile && setMaskSize(20)}
                className='px-6 py-3 md:border-2 border text-xs md:text-base border-foreground font-fira-mono bg-background text-foreground hover:bg-foreground hover:text-background rounded-lg about-button'>
                Entrar em Contato
              </a>

              <Link
                href='/curriculo'
                aria-label='Saiba mais sobre minha trajetória'
                onMouseEnter={() => !isMobile && setMaskSize(0)}
                onMouseLeave={() => !isMobile && setMaskSize(20)}
                className='flex items-center md:border-2 border text-xs md:text-base border-foreground font-fira-mono gap-2 px-6 py-3 bg-background text-foreground rounded-lg transition-colors about-button'>
                Currículo
                <ArrowRight className='md:size-5 size-4' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
