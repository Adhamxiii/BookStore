import Hero from "@/components/Home/Hero";
import Highlights from "@/components/Home/Highlights";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Newsletter from "@/components/Home/Newsletter";
import Testimonials from "@/components/Home/Testimonials";
import Footer from "@/components/Home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 md:px-0">
        <Highlights />
        <FeaturedProducts />
      </div>
      <Newsletter />
      <Testimonials />
      <Footer />
    </>
  );
}
