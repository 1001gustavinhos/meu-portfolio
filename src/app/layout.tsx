import { Fira_Mono, PT_Mono, Fascinate } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const firaMono = Fira_Mono({
  subsets: ["latin"],
  variable: "--font-fira-mono",
  weight: "400",
});

const ptMono = PT_Mono({
  subsets: ["latin"],
  variable: "--font-pt-mono",
  weight: "400",
});

const fascinate = Fascinate({
  subsets: ["latin"],
  variable: "--font-fascinate",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "gAsaD | Desenvolvedor Web/Mobile",
    template: "%s | gAsaD",
  },
  description:
    "Gustavo A.S.A. Dantas - Desenvolvedor Web/Mobile. Precisando de site ou app? Posso te ajudar!",
  keywords: [
    "desenvolvedor web",
    "desenvolvedor mobile",
    "portfolio",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
  ],
  authors: [
    { name: "Gustavo Alencar S.A. Dantas", url: "https://gasad.com.br" },
  ],
  creator: "Gustavo Alencar S.A. Dantas",
  publisher: "Gustavo Alencar S.A. Dantas",
  metadataBase: new URL("https://gasad.com.br"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/pt-BR",
    },
  },
  openGraph: {
    title: "gAsaD | Desenvolvedor Web/Mobile",
    description:
      "Gustavo A.S.A. Dantas - Desenvolvedor Web/Mobile. Precisando de site ou app? Posso te ajudar!",
    url: "https://gasad.com.br",
    siteName: "gAsaD Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "gAsaD Portfolio",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "gAsaD | Desenvolvedor Web/Mobile",
    description:
      "Portfólio de Gustavo A.S.A. Dantas - Desenvolvedor Web/Mobile. Precisando de site ou app? Posso te ajudar!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${firaMono.variable} ${ptMono.variable} ${fascinate.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="gAsaD | Desenvolvedor Web/Mobile" />
        <meta
          property="og:description"
          content="Gustavo A.S.A. Dantas - Desenvolvedor Web/Mobile. Precisando de site ou app? Posso te ajudar!"
        />
        <meta property="og:image" content="https://gasad.com.br/og-image.jpg" />
        <meta property="og:url" content="https://gasad.com.br" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="gAsaD | Desenvolvedor Web/Mobile" />
        <meta
          name="twitter:description"
          content="Portfólio de Gustavo A.S.A. Dantas - Desenvolvedor Web/Mobile"
        />
        <meta
          name="twitter:image"
          content="https://gasad.com.br/og-image.jpg"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
