import PageHero from "../common/PageHero";
import Container from "../common/Container";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import MapSection from "../components/contact/MapSection";

const Contact = () => {
  return (
    <>
      <PageHero
        title="Get In Touch"
        breadcrumb="Contact"
        subtitle="We'd love to hear from you — visit, call, or drop us a message."
        bgImage="https://images.unsplash.com/photo-1521017432531-fbd92d768814?fm=jpg&q=80&w=1600&auto=format&fit=crop"
      />

      <ContactInfo />

      <section className="w-full bg-white py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            <ContactForm />
            <MapSection />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
