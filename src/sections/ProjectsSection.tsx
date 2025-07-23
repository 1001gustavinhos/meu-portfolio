"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import React from "react";
import gsap from "gsap";
import Image from "next/image";
import { title } from "process";

const project = [
  {
    title: "Projects",
    image: "/images/project.png",
    altText: "Project Image",
    description:
      "Site institucional da empresa Biológika, especializada em biotecnologia. O objetivo foi criar uma presença digital profissional, leve e responsiva, que refletisse os valores da empresa e sua atuação na área de soluções ambientais. Cuidei de toda a estrutura do front-end, priorizando a responsividade, performance e identidade visual que respeitasse a marca e seriedade da empresa.",
    tags: ["React", "Tailwind", "Vite", "Figma"],
  },
];

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
  return (
    <section className="flex bg-background flex-col gap-6 max-w-4xl p-8">
      <Image
        src={image}
        className="bg-foreground flex mx-auto shadow-md mb-4"
        alt={altText}
        width={600}
        height={500}
        objectFit="cover"
      />
      <h2 className="text-center text-4xl font-pt-mono">{title}</h2>
      <p className="text-base font-fira-mono">{description}</p>
      <div className="flex flex-wrap font-fira-mono gap-4 text-start">
        {tags.map((tag, i) => (
          <div
            key={i}
            className="border-foreground xgap-3 border-2 rounded-lg px-2.5 py-1.5 text-sm"
          >
            {tag}
          </div>
        ))}
      </div>
    </section>
  );
};
