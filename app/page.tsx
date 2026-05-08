import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Menu } from "@/components/sections/Menu";
import { Beer } from "@/components/sections/Beer";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <Story />
        <Menu />
        <Beer />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
