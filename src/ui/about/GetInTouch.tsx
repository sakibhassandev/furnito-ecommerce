import GetInTouchVideo from "@/ui/about/GetInTouchVideo";
import GetInTouchFaqAccordion from "@/ui/about/GetInTouchAccordion";

const GetInTouchSection = () => {
  return (
    <section className="pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Our Craftsmanship
          </h2>
          <p className="text-gray-600">
            Experience the perfect blend of traditional artistry and modern
            design in every piece of furniture we create.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <GetInTouchVideo />
          <GetInTouchFaqAccordion />
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
