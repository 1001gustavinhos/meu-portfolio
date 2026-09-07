"use client";
import { useMask } from "@/context/MaskContext";
import { FileText, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
  className?: string;
}

export const SocialIcon = ({ icon, href, className = "" }: SocialIconProps) => {
  const { setMaskSize } = useMask();

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      data-social-icon='true'
      aria-label='Social Icon'
      className={`${className} group relative flex items-center justify-center md:size-12 size-10 rounded-full transition-all duration-300 
                  text-foreground bg-background hover:text-background hover:bg-foreground`}
      onMouseEnter={() => {
        setMaskSize(0);
      }}
      onMouseLeave={() => {
        setMaskSize(20);
      }}>
      {icon}
    </a>
  );
};

// GitHubIcon.tsx
export const GitHubIcon = ({ className = "" }: { className?: string }) => (
  <SocialIcon
    className={className}
    href='https://github.com/1001gustavinhos'
    icon={<Github className='md:w-6 md:h-6 w-5 h-5' />}
  />
);

// LinkedInIcon.tsx
export const LinkedInIcon = ({ className = "" }: { className?: string }) => (
  <SocialIcon
    className={className}
    href='https://www.linkedin.com/in/gustavo-alencar-silva-almeida-dantas-478148209/'
    icon={<Linkedin className='md:w-6 md:h-6 w-5 h-5' />}
  />
);

export const InstagramIcon = ({ className = "" }: { className?: string }) => {
  return (
    <SocialIcon
      className={className}
      href='https://www.instagram.com/1001passarinhos/'
      icon={<Instagram className='md:w-6 md:h-6 w-5 h-5' />}
    />
  );
};

export const CurriculoIcon = ({ className = "" }: { className?: string }) => {
  const { setMaskSize } = useMask();

  return (
    <Link
      href='/curriculo'
      aria-label='Abrir currículo'
      className={`${className} group relative flex items-center justify-center md:size-12 size-10 rounded-full transition-all duration-300 text-foreground bg-background hover:text-background hover:bg-foreground`}
      onMouseEnter={() => {
        setMaskSize(0);
      }}
      onMouseLeave={() => {
        setMaskSize(20);
      }}>
      <FileText className='md:w-6 md:h-6 w-5 h-5' />
    </Link>
  );
};

export const DownloadIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}>
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
    <polyline points='7 10 12 15 17 10'></polyline>
    <line x1='12' y1='15' x2='12' y2='3'></line>
  </svg>
);

export const SocialIcons = () => {
  return (
    <div className='fixed z-50 bottom-8 flex right-4'>
      <div className='flex flex-col items-center gap-2'>
        <CurriculoIcon />
        <GitHubIcon />
        <LinkedInIcon />
      </div>
    </div>
  );
};
