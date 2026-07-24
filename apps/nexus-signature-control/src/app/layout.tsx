import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexus-rbac-135-signatures.vercel.app"),
  title: {
    default: "Nexus Signature Control | RBAC 135",
    template: "%s | Nexus Signature Control",
  },
  description:
    "Central institucional para criação e validação de assinaturas de e-mail do ecossistema Nexus, com governança RBAC 135.",
  applicationName: "Nexus Signature Control",
  authors: [{ name: "Nexus Global Group" }],
  keywords: [
    "Nexus Global Group",
    "RBAC 135",
    "assinatura de e-mail",
    "aviação",
    "governança",
  ],
  openGraph: {
    title: "Nexus Signature Control",
    description:
      "Assinaturas institucionais com precisão regulatória e identidade Nexus.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
