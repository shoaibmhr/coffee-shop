import PageHero from "../common/PageHero";
import ReserveSection from "../components/reserve/ReserveSection";

const Reserve = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <PageHero
        title="Reserve a Table"
        subtitle="Save your seat ahead of time and let us take care of the rest."
        breadcrumb="Reserve"
        bgImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?fm=jpg&q=80&w=1600&auto=format&fit=crop"
      />
      <ReserveSection />
    </main>
  );
};

export default Reserve;
