"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface ProjectsProps {
  title: string;
  image: string;
  description: string;
  tags: string[];
  altText: string;
}

export const ProjectsSection = ({
  title,
  image,
  description,
  tags,
  altText,
}: ProjectsProps) => {
  const maskRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Camada superior escura com máscara */}
      <div className="absolute inset-0 z-10 bg-background text-white pointer-events-none">
        {/* Máscara circular dinâmica */}
        <div
          ref={maskRef}
          className="absolute w-64 h-64 rounded-full"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle 32% at center, transparent 40%, black 41%)",
            maskImage:
              "radial-gradient(circle 32% at center, transparent 40%, black 41%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            backgroundColor: "inherit",
            pointerEvents: "none",
          }}
        />

        {/* Conteúdo com a máscara aplicada */}
        <div className="relative z-20 max-w-4xl p-8 mx-auto pt-40">
          <Image
            src={image}
            className="mx-auto shadow-md mb-4"
            alt={altText}
            width={600}
            height={500}
          />
          <h2 className="text-center text-4xl font-pt-mono">{title}</h2>
          <p className="text-base font-fira-mono">{description}</p>
          <div className="flex flex-wrap font-fira-mono gap-4 text-start mt-4">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="border-white border-2 rounded-lg px-2.5 py-1.5 text-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
