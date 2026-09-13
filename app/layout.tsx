import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoLucro IA — 7 operações, uma experiência inteligente",
  description: "Conheça o AutoLucro IA: análise automatizada de pares, ciclo guiado e acompanhamento direto no Telegram.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-PT"><body>{children}</body></html>;
}
