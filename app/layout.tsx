import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://sao-restaurant.com";
const SITE_NAME = "Sao";
const SITE_DESCRIPTION =
  "Modernes vietnamesisches Restaurant von Köchin Linh Tran. Phở, Bún Chả, Chè Sao — drei Regionen Vietnams, in jeder Schüssel respektiert.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Modernes vietnamesisches Restaurant`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Modernes vietnamesisches Restaurant`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE_NAME,
  description:
    "Modernes vietnamesisches Restaurant von Köchin Linh Tran. Drei Regionen Vietnams — Hanoi, Huế, Saigon — in jedem Gericht respektiert.",
  servesCuisine: ["Vietnamese", "Asian"],
  priceRange: "$$$",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "797 Renner Land",
    addressLocality: "Lake Kylesburg",
    postalCode: "27395",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "11:00",
      closes: "22:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema),
          }}
        />
      </body>
    </html>
  );
}
