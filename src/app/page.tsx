"use client";
import { ProjectsReveal } from "@/sections/ProjectsSectionReveal";

const projects = [
  {
    title: "Projeto 1",
    image: "/1984.jpg",
    imageReveal: "/alienista.jpg",
    altText: "Descrição 1",
    description: "Descrição detalhada 1...",
    tags: ["Web", "Design"],
  },
  {
    title: "Projeto 2",
    image: "/1984.jpg",
    imageReveal: "/alienista.jpg",
    altText: "Descrição 2",
    description: "Descrição detalhada 2...",
    tags: ["React", "JS"],
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ProjectsReveal projects={projects} />
      {/* Outros componentes como SudokuSection */}
    </div>
  );
}
