import PageHero from "../common/PageHero";
import OurStory from "../components/about/OurStory";
import WhoWeAre from "../components/about/WhoWeAre";
import TeamSection from "../components/about/TeamSection";
import OurValues from "../components/about/OurValues";

const About = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <PageHero
        title="About Us"
        subtitle="Blended flavors, brewed to perfection — the story behind every cup we serve."
        breadcrumb="About Us"
        bgImage="https://images.unsplash.com/photo-1442512595331-e89e73853f31?fm=jpg&q=80&w=1600&auto=format&fit=crop"
      />
      <OurStory />
      <WhoWeAre />
      <OurValues />
      <TeamSection />
    </main>
  );
};

export default About;
