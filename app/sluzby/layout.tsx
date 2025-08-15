import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Služby",
  description: "Ponúkame komplexné riešenia digitálneho marketingu, ktoré prinášajú reálne výsledky. Od stratégie až po realizáciu - postaráme sa o všetko.",
};

export default function SluzbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
