import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { Menu } from "@/components/sections/Menu";
import { Chef } from "@/components/sections/Chef";
import { Awards } from "@/components/sections/Awards";
import { Reservation } from "@/components/sections/Reservation";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero
          imageSrc="/images/hero.jpg"
          imageAlt="Vietnamesisches Mahl mit Reis, geschmortem Fleisch, Kräutern und Dip-Saucen, von oben auf einem schwarzen Gittertisch."
        />
        <SignatureDishes />
        <Menu />
        <Chef />
        <Awards />
        <Reservation />
      </main>

      <Footer />
    </>
  );
}
