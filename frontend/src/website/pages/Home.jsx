import AboutPreview from "../components/home/AboutPreview";
import FreshBrewBanner from "../components/home/FreshBrewBanner";
import Hero from "../components/home/Hero";
import OurBlogs from "../components/home/OurBlogs";
import SignatureSelections from "../components/home/SignatureSelections";
import StatsBar from "../components/home/StatsBar";
import Testimonials from "../components/home/Testimonials";
import NewsletterBanner from "../components/home/NewsletterBanner";
import TrendingCategories from "../components/home/TrendingCategories";

const Home = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <AboutPreview />
      <SignatureSelections />
      <StatsBar />
      <FreshBrewBanner />
      <TrendingCategories />
      <OurBlogs />
      <Testimonials />
      <NewsletterBanner />
    </main>
  );
};

export default Home;
