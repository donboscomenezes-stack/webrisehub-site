import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Games from "@/components/Games";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Games />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
