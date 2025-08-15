import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bezplatný Kurz | HubHigh - Digitálna Agentúra",
  description: "Získajte bezplatný kurz digitálneho marketingu. Naučte sa, ako získať klientov a zvýšiť predaje cez sociálne siete. Praktické tipy a stratégie.",
  keywords: [
    "bezplatný kurz",
    "digitálny marketing",
    "sociálne siete",
    "vzdelávanie",
    "hubhigh",
    "slovensko"
  ],
  openGraph: {
    title: "Bezplatný Kurz | HubHigh - Digitálna Agentúra",
    description: "Získajte bezplatný kurz digitálneho marketingu. Naučte sa, ako získať klientov a zvýšiť predaje cez sociálne siete.",
    url: "https://hubhigh.sk/freeKurz",
    images: ["/HubHigh Logo Transparent (1).jpeg"],
  },
  alternates: {
    canonical: "https://hubhigh.sk/freeKurz",
  },
};

export default function FreeKurzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
