"use client";
import { ProjectsSection } from "@/sections/ProjectsSection";
import SudokuSection from "@/sections/Sudoku";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ProjectsSection
        title="My Projects"
        image="/images/project.png"
        altText="Project Image"
        description="Site institucional da empresa Biológika, especializada em biotecnologia. O objetivo foi criar uma presença digital profissional, leve e responsiva, que refletisse os valores da empresa e sua atuação na área de soluções ambientais. Cuidei de toda a estrutura do front-end, priorizando a responsividade, performance e identidade visual que respeitasse a marca e seriedade da empresa."
        tags={["Web Development", "Design", "JavaScript", "React"]}
      />
      <SudokuSection />
    </div>
  );
}
