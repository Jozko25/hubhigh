import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | HubHigh - Digitálna Agentúra",
  description: "Kontaktujte nás pre bezplatnú konzultáciu. Pomôžeme vám získať klientov a zvýšiť predaje cez digitálny marketing. Odpoveď do 24 hodín.",
  keywords: [
    "kontakt",
    "konzultácia",
    "digitálna agentúra",
    "hubhigh",
    "slovensko",
    "digitálny marketing"
  ],
  openGraph: {
    title: "Kontakt | HubHigh - Digitálna Agentúra",
    description: "Kontaktujte nás pre bezplatnú konzultáciu. Pomôžeme vám získať klientov a zvýšiť predaje cez digitálny marketing.",
    url: "https://hubhigh.sk/kontakt",
    images: ["/HubHigh Logo Transparent (1).jpeg"],
  },
  alternates: {
    canonical: "https://hubhigh.sk/kontakt",
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
