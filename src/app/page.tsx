"use client";
import { ProjectsReveal } from "@/sections/ProjectsSectionReveal";
import { MaskProvider } from "@/context/MaskContext";
import { HeroReveal } from "@/components/Hero";

const projects = [
  {
    title: "Biológika",
    image: "/1984.jpg",
    imageReveal: "/alienista.jpg",
    altText: "Site institucional da Biológika",
    description:
      "Site institucional da empresa Biológika, especializada em biotecnologia. O objetivo foi criar uma presença digital profissional, leve e responsiva.",
    tags: ["React", "Vite", "Tailwind", "Figma"],
  },
  {
    title: "Dantas & Dantas",
    image: "/1984.jpg",
    imageReveal: "/alienista.jpg",
    altText: "E-commerce Dantas & Dantas",
    description:
      "Desenvolvimento do site e-commerce da loja Dantas & Dantas, especializada em empanadas argentinas congeladas e castanhas brasileiras.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Psi. Janine Correa",
    image: "/1984.jpg",
    imageReveal: "/alienista.jpg",
    altText: "Site institucional da psicóloga",
    description:
      "Desenvolvimento do site institucional da psicóloga Janine Correa, com foco em apresentar seus serviços de psicologia clínica.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  },
];

export default function Home() {
  return (
    <MaskProvider>
      <main className="flex flex-col items-center justify-center">
        <HeroReveal />
        <ProjectsReveal projects={projects} />
      </main>
    </MaskProvider>
  );
}
