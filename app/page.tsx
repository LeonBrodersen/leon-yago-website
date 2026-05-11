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
          imageAlt="Großzügig angerichteter Mix vietnamesischer Gerichte von oben — Phở, gegrillte Spezialitäten, Frühlingsrollen, Dim Sum, frische Kräuter."
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
