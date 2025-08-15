import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Výsledky | HubHigh - Digitálna Agentúra",
  description: "Pozrite si reálne výsledky našich klientov: zvýšenie tržieb o 180%, generovanie 600+ leadov, návratnosť investície 4.7x. Konkrétne čísla, nie sľuby.",
  keywords: [
    "výsledky",
    "prípadové štúdie",
    "ROI",
    "zvýšenie tržieb",
    "lead generation",
    "digitálna agentúra",
    "slovensko"
  ],
  openGraph: {
    title: "Výsledky | HubHigh - Digitálna Agentúra",
    description: "Pozrite si reálne výsledky našich klientov: zvýšenie tržieb o 180%, generovanie 600+ leadov, návratnosť investície 4.7x.",
    url: "https://hubhigh.sk/vysledky",
    images: ["/HubHigh Logo Transparent (1).jpeg"],
  },
  alternates: {
    canonical: "https://hubhigh.sk/vysledky",
  },
};

export default function VysledkyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
