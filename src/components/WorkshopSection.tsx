import { Button } from "@/components/ui/button";

const WorkshopSection = () => {
  const spotsLeft = 12;

  return (
    <section id="workshop" className="border-b border-foreground">
      {/* Section title */}
      <div className="border-b border-foreground px-6 md:px-12 py-4">
        <span className="font-display uppercase text-sm tracking-tighter text-muted-foreground">
          [ Upcoming Workshop ]
        </span>
      </div>

      {/* Workshop grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left: Location & Date */}
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-foreground px-6 md:px-12 py-10">
          <h3 className="text-2xl mb-2">Torino</h3>
          <p className="font-body tabular-nums text-base text-muted-foreground">
            25.04 — 26.04.2025
          </p>
        </div>

        {/* Center: Workshop details */}
        <div className="md:col-span-6 border-b md:border-b-0 md:border-r border-foreground px-6 md:px-12 py-10">
          <h2 className="text-4xl md:text-5xl mb-6">Intensive Workshop</h2>
          <p className="font-body text-base leading-relaxed text-muted-foreground max-w-lg" style={{ textWrap: 'pretty' }}>
            Un workshop intensiv de două zile dedicat explorării relației dintre corp, spațiu și prezență scenică. 
            Lucrăm cu tehnici de mișcare, improvizație și compoziție în grup.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 font-display uppercase text-sm tracking-tighter">
            <span className="border border-foreground px-3 py-1">Free of charge</span>
            <span className="border border-foreground px-3 py-1">2 zile</span>
            <span className="border border-foreground px-3 py-1">Torino, Italia</span>
          </div>
        </div>

        {/* Right: Spots & CTA */}
        <div className="md:col-span-3 px-6 md:px-12 py-10 flex flex-col justify-between items-start">
          <div>
            <p className="font-display uppercase text-sm tracking-tighter text-muted-foreground mb-2">
              Locuri disponibile
            </p>
            <p className="font-display tabular-nums text-5xl">
              {spotsLeft}<span className="text-muted-foreground text-2xl">/12</span>
            </p>
          </div>
          <a href="#apply">
            <Button variant="hero" size="lg" className="mt-8 w-full">
              Aplică acum →
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkshopSection;
