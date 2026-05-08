import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://wirtshaus-zum-mitterhofer.com";
const SITE_NAME = "Wirtshaus zum Mitterhofer";
const SITE_DESCRIPTION =
  "Schnitzel, Knödel, eigenes Bier vom Fass. Stammlokal in Berlin-Kreuzberg seit Jahren.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Südtirol mitten in Kreuzberg`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Südtirol mitten in Kreuzberg`,
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
    "Südtiroler Wirtshaus in Berlin-Kreuzberg. Schnitzel, Knödel, eigenes Bier vom Fass.",
  servesCuisine: ["Südtirolerisch", "Alpenländisch", "Österreichisch"],
  priceRange: "€€",
  url: SITE_URL,
  telephone: "+49 30 69566909",
  email: "hannes@wirtshaus-zum-mitterhofer.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fichtestraße 1",
    addressLocality: "Berlin",
    addressRegion: "Berlin",
    postalCode: "10967",
    addressCountry: "DE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "16:00",
      closes: "24:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "PublicHolidays"],
      opens: "17:00",
      closes: "24:00",
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
      className={`${fraunces.variable} ${inter.variable} antialiased`}
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
