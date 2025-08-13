"use client";
import { ProjectsReveal } from "@/sections/ProjectsSectionReveal";
import { MaskProvider } from "@/context/MaskContext";
import { HeroReveal } from "@/components/Hero";

const projects = [
  {
    title: "Biológika",
    image: "/capabiologika.png",
    imageReveal: "/biologikasc.webm",
    altText: "Site institucional da Biológika",
    description:
      "Site institucional da empresa Biológika, especializada em biotecnologia. O objetivo foi criar uma presença digital profissional, leve e responsiva, que refletisse os valores da empresa e sua atuação na área de soluções ambientais. Cuidei de toda a estrutura do front-end, priorizando a responsividade, performance e identidade visual que respeitasse a marca e seriedade da empresa e compromisso com o meio ambiente.",
    tags: ["React", "Vite", "Tailwind", "Figma"],
  },
  {
    title: "Psi. Janine Correa",
    image: "/capajanine.png",
    imageReveal: "/janinesitesc.webm",
    altText: "Site institucional da psicóloga",
    description:
      "Desenvolvimento do site institucional da psicóloga Janine Correa, com foco em apresentar seus serviços de psicologia clínica de forma profissional, acolhedora e informativa. O projeto priorizou um design limpo e confortável, garantindo uma experiência intuitiva e acessível. Utilizando boas práticas de SEO e pensando no compartilhamento em redes sociais: esse site é um cartão de visita poderoso e está preparado para ser encontrado e divulgado.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    title: "Dantas & Dantas",
    image: "/capadantas.png",
    imageReveal: "/dantassc.webm",
    altText: "E-commerce Dantas & Dantas",
    description:
      "Desenvolvimento do site e-commerce da loja Dantas & Dantas, especializada em empanadas argentinas congeladas e castanhas brasileiras. O projeto priorizou um design impactante alinhado a personalidade do cliente, utilizando tecnologias modernas com uma solução simples que atende a sua dor sem depender da sua capacitação tecnológica. O site consiste em um cardápio que organiza os pedidos em uma mensagem dinâmica que é direcionada ao dono da loja. As informações do cliente (endereço e telefone) são salvas em localstorage, sem depender de um banco de dados. Simples, útil e seguro.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
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
