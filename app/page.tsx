import FeaturesSection from "@/components/layout/featureSection";
import Hero from "@/components/layout/heroSection";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <FeaturesSection />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
