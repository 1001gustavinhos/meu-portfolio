"use client";

import { Mail, Phone } from "lucide-react";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/SocialIcon";

export const Footer = () => {
  return (
    <footer className="relative w-full py-16 bg-background border-t border-foreground/10 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-6">
              <h2 className="absolute text-5xl font-fascinate text-foreground">
                gAsaD
              </h2>
              <div className="size-[5px] rounded-full bg-background relative" />
            </div>
            <p className="text-foreground/80 font-fira-mono mt-2">
              Desenvolvedor Web/Mobile | Biólogo
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 w-full max-w-md">
            {/* Email - Já está funcionando */}
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <a
                href="mailto:gustavo.asa.dantas@gmail.com"
                className="text-foreground hover:underline hover:text-primary transition-colors"
              >
                gustavo.asa.dantas@gmail.com
              </a>
            </div>

            {/* Telefone - Corrigido */}
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <a
                href="https://wa.me/5511981071231"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-foreground hover:underline hover:text-primary transition-colors"
              >
                (11) 98107-1231
              </a>
            </div>

            {/* Ícones Sociais - Corrigido */}
            <div className="flex space-x-6 pt-4">
              <GitHubIcon />
              <LinkedInIcon />
              <WhatsAppIcon />
              <InstagramIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
