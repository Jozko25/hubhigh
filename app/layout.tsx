import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hubhigh.sk'),
  title: {
    default: "HubHigh - Digitálna Agentúra | Získavanie Klientov cez Sociálne Siete",
    template: "%s | HubHigh"
  },
  description: "Získajte klientov a dopyty vďaka videám, ktoré budujú dôveru a predávajú. Pre majiteľov firiem, ktorí nechcú len sledovať trendy, ale z nich reálne profitovať. Výkonnostný marketing, tvorba obsahu, správa sociálnych sietí.",
  keywords: [
    "digitálna agentúra",
    "výkonnostný marketing",
    "sociálne siete",
    "video marketing",
    "lead generation",
    "digitálny marketing",
    "slovensko",
    "reklama",
    "konverzie",
    "ROI",
    "predaj",
    "klienti",
    "firmy",
    "online marketing"
  ],
  authors: [{ name: "HubHigh Team" }],
  creator: "HubHigh",
  publisher: "HubHigh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "https://hubhigh.sk",
    siteName: "HubHigh",
    title: "HubHigh - Digitálna Agentúra | Získavanie Klientov cez Sociálne Siete",
    description: "Získajte klientov a dopyty vďaka videám, ktoré budujú dôveru a predávajú. Pre majiteľov firiem, ktorí nechcú len sledovať trendy, ale z nich reálne profitovať.",
    images: [
      {
        url: "/HubHigh Logo Transparent (1).jpeg",
        width: 1200,
        height: 630,
        alt: "HubHigh - Digitálna Agentúra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HubHigh - Digitálna Agentúra | Získavanie Klientov cez Sociálne Siete",
    description: "Získajte klientov a dopyty vďaka videám, ktoré budujú dôveru a predávajú. Pre majiteľov firiem, ktorí nechcú len sledovať trendy, ale z nich reálne profitovať.",
    images: ["/HubHigh Logo Transparent (1).jpeg"],
    creator: "@hubhigh",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://hubhigh.sk",
    languages: {
      "sk-SK": "https://hubhigh.sk",
      "en-US": "https://hubhigh.sk/en",
    },
  },
  category: "business",
  classification: "Digital Marketing Agency",
  other: {
    "geo.region": "SK",
    "geo.placename": "Slovakia",
    "geo.position": "48.6690;19.6990",
    "ICBM": "48.6690, 19.6990",
    "DC.title": "HubHigh - Digitálna Agentúra",
    "DC.description": "Digitálna agentúra špecializujúca sa na výkonnostný marketing a tvorbu obsahu",
    "DC.subject": "digitálny marketing, sociálne siete, video marketing, lead generation",
    "DC.creator": "HubHigh Team",
    "DC.publisher": "HubHigh",
    "DC.date.created": "2022",
    "DC.language": "sk",
    "DC.coverage": "Slovakia",
    "DC.rights": "© 2024 HubHigh. Všetky práva vyhradené.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <head>
        {/* Favicon will be automatically handled by Next.js App Router from /app/favicon.ico */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Additional SEO meta tags */}
        <meta name="application-name" content="HubHigh" />
        <meta name="apple-mobile-web-app-title" content="HubHigh" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HubHigh",
              "url": "https://hubhigh.sk",
              "logo": "https://hubhigh.sk/HubHigh%20Logo%20Transparent%20(1).jpeg",
              "description": "Digitálna agentúra špecializujúca sa na výkonnostný marketing, tvorbu obsahu a správu sociálnych sietí pre firmy na Slovensku.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SK",
                "addressRegion": "Slovakia"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["Slovak", "English"]
              },
              "sameAs": [
                "https://www.facebook.com/hubhigh",
                "https://www.instagram.com/hubhigh",
                "https://www.linkedin.com/company/hubhigh"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 48.6690,
                  "longitude": 19.6990
                },
                "geoRadius": "500000"
              },
              "foundingDate": "2022",
              "numberOfEmployees": "5-10",
              "serviceType": [
                "Digital Marketing",
                "Performance Marketing", 
                "Social Media Management",
                "Content Creation",
                "Video Marketing",
                "Lead Generation"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Digitálne Marketingové Služby",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Výkonnostný Marketing",
                      "description": "Zameranie na konverzie a ROI cez platené reklamy"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Tvorba Obsahu",
                      "description": "Videá a obsah pre sociálne siete"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Správa Sociálnych Sietí",
                      "description": "Kompletná správa a stratégia pre sociálne siete"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${raleway.variable} antialiased font-normal`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
