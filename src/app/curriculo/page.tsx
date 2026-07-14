import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Currículo",
  description:
    "Currículo online de Gustavo Alencar S.A. Dantas, com resumo profissional, habilidades, projetos e formação.",
};

const technicalAreas = [
  {
    title: "Front-End:",
    text: "React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Motion, Shadcn/ui, APIs REST e next-intl (i18n).",
  },
  {
    title: "Mobile:",
    text: "React Native e Expo para produtos mobile com foco em performance e entrega rápida.",
  },
  {
    title: "Ferramentas:",
    text: "Git, GitHub, Vite, Vercel, Orval, Zod e Figma.",
  },
  {
    title: "Idiomas:",
    text: "Inglês fluente em leitura, escrita e conversação.",
  },
];

const projects = [
  {
    title: "Audiozz - App de Audiobooks",
    stack: "React Native, Expo, TypeScript, NativeWind",
    text: "Produto do zero à primeira versão, com front-end desenvolvido do zero para viabilizar o piloto e o lançamento de um app mobile de saúde e bem-estar.",
  },
  {
    title: "Stetsom - Catálogo Global + CMS",
    stack: "Next.js, Tailwind, Shadcn/ui, TypeScript, i18n",
    text: "Substituição de plataforma legada por um novo site com CMS e internacionalização em 3 idiomas, melhorando o suporte pós-venda em mais de 60 países.",
  },
  {
    title: "Clicktalk Escola de Idiomas",
    stack: "Next.js, Tailwind CSS, Motion, Figma",
    text: "SPA completa, do branding ao código, com protótipo no Figma e site pensado para converter visitantes em leads qualificados.",
  },
];

const experiences = [
  {
    role: "Desenvolvedor Front-End",
    company: "Plaza Creative Collective, Bauru/SP",
    period: "2024 - 2026",
    text: "Desenvolvo soluções web e mobile em parceria direta com designers e devs, garantindo fidelidade ao protótipo e entregas dentro do prazo.",
  },
  {
    role: "Diretor de Marketing",
    company: "Lotus Jr. (UNESP Bauru)",
    period: "2021 - 2022",
    text: "Gerenciei o site institucional em WordPress e conduzi o branding da empresa júnior, criando materiais gráficos com Canva.",
  },
];

export default function CurriculoPage() {
  return (
    <main className='min-h-screen bg-[#f6efe7] text-[#1c1712]'>
      <div className='mx-auto w-full max-w-4xl px-5 py-6 sm:px-8 lg:px-10 lg:py-8'>
        <div className='flex items-center justify-between gap-4'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 rounded-full border border-[#1c171218] bg-white px-4 py-2 text-sm font-medium text-[#1c1712] shadow-sm transition hover:bg-[#f4ebe1]'>
            <ArrowLeft className='size-4' />
            Voltar
          </Link>
        </div>

        <section className='mt-6 rounded-3xl border border-[#1c171214] bg-white p-6 shadow-sm sm:p-8'>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-start'>
            <div className='relative mx-auto aspect-square w-36 shrink-0 overflow-hidden rounded-full border border-[#1c171218] bg-[#efe6dc] sm:mx-0'>
              <Image
                src='/about.JPG'
                alt='Foto de Gustavo Alencar S.A. Dantas'
                fill
                priority
                sizes='176px'
                className='object-cover object-center'
              />
            </div>

            <div className='space-y-4 text-center sm:text-left'>
              <div className='space-y-2'>
                <p className='text-sm font-semibold uppercase tracking-[0.24em] text-[#8a6d56]'>
                  Perfil profissional
                </p>
                <h1 className='text-3xl font-bold tracking-tight sm:text-5xl'>
                  Gustavo Alencar S.A. Dantas
                </h1>
                <p className='max-w-2xl text-sm leading-6 text-[#4f433c] sm:text-base'>
                  Desenvolvedor front-end com foco em produtos web e mobile,
                  priorizando interface clara, performance e responsividade.
                </p>
              </div>

              <div className='flex flex-wrap items-center justify-center gap-3 sm:justify-start'>
                <a
                  href='mailto:gustavo.asa.dantas@gmail.com'
                  className='inline-flex items-center gap-2 rounded-full border border-[#1c171218] bg-[#1c1712] px-4 py-2 text-sm text-[#f6efe7] transition hover:opacity-90'>
                  <Mail className='size-4' />
                  gustavo.asa.dantas@gmail.com
                </a>
                <span className='inline-flex items-center gap-2 rounded-full border border-[#1c171218] bg-[#f4ebe1] px-4 py-2 text-sm text-[#4f433c]'>
                  <MapPin className='size-4' />
                  Bauru/SP
                </span>
                <Link
                  href='https://github.com/1001gustavinhos'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 rounded-full border border-[#1c171218] bg-white px-4 py-2 text-sm text-[#4f433c] transition hover:bg-[#f4ebe1]'>
                  <ExternalLink className='size-4' />
                  GitHub
                </Link>
              </div>
            </div>
          </div>

          <div className='mt-6 border-t border-[#1c171214] pt-6'>
            <p className='text-lg font-semibold text-[#1c1712]'>Habilidades</p>
            <div className='mt-3 space-y-2 pl-4 text-sm leading-6 text-[#4f433c]'>
              {technicalAreas.map((area) => (
                <div key={area.title} className='flex flex-wrap gap-x-1'>
                  <span className='font-semibold text-[#1c1712]'>
                    {area.title}
                  </span>
                  <span>{area.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-6 border-t border-[#1c171214] pt-6'>
            <p className='text-lg font-semibold text-[#1c1712]'>
              Projetos relevantes
            </p>
            <div className='mt-3 space-y-2 pl-4 text-sm leading-6 text-[#4f433c]'>
              {projects.map((project) => (
                <div key={project.title} className='space-y-1'>
                  <p className='font-semibold text-[#1c1712]'>
                    {project.title}
                  </p>
                  <p className='text-xs uppercase tracking-[0.16em] text-[#8a6d56]'>
                    {project.stack}
                  </p>
                  <p>{project.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-6 border-t border-[#1c171214] pt-6'>
            <p className='text-lg font-semibold text-[#1c1712]'>Experiência</p>
            <div className='mt-3 space-y-2 pl-4 text-sm leading-6 text-[#4f433c]'>
              {experiences.map((item) => (
                <div key={`${item.role}-${item.company}`} className='space-y-1'>
                  <p className='font-semibold text-[#1c1712]'>{item.role}</p>
                  <p className='text-xs uppercase tracking-[0.16em] text-[#8a6d56]'>
                    {item.company} - {item.period}
                  </p>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-6 border-t border-[#1c171214] pt-6'>
            <p className='text-lg font-semibold text-[#1c1712]'>Formação</p>
            <div className='mt-3 space-y-2 pl-4 text-sm leading-6 text-[#4f433c]'>
              <div className='space-y-1'>
                <p className='font-semibold text-[#1c1712]'>
                  Bacharelado em Sistemas de Informação
                </p>
                <p>UNESP Bauru - em andamento</p>
              </div>
              <div className='space-y-1'>
                <p className='font-semibold text-[#1c1712]'>
                  Licenciatura em Ciências Biológicas
                </p>
                <p>UNESP Bauru - 2018 a 2022</p>
              </div>
              <div className='space-y-1'>
                <p className='font-semibold text-[#1c1712]'>
                  Cursos complementares
                </p>
                <p>
                  Formação Front-End, Git/GitHub, UI/UX e Acessibilidade -
                  Alura.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
