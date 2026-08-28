import { useState, useMemo } from "react";
import PageHero from "../common/PageHero";
import Container from "../common/Container";
import GalleryFilters from "../components/gallery/GalleryFilters";
import GalleryGrid from "../components/gallery/GalleryGrid";
import { galleryImages } from "../constants/galleryData";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <PageHero
        title="Our Gallery"
        breadcrumb="Gallery"
        subtitle="A glimpse into our space, our craft, and the moments we share."
        bgImage="https://images.unsplash.com/photo-1453614512568-c4024d13c247?fm=jpg&q=80&w=1600&auto=format&fit=crop"
      />

      <section className="w-full bg-coffee-cream py-14 sm:py-20">
        <Container>
          <GalleryFilters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <div className="mt-10 sm:mt-14">
            <GalleryGrid images={filteredImages} />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Gallery;
