const AboutSection = () => {
  return (
    <section id="about" className="border-b border-foreground">
      <div className="border-b border-foreground px-6 md:px-12 py-4">
        <span className="font-display uppercase text-sm tracking-tighter text-muted-foreground">
          [ About the project ]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        <div className="md:col-span-2" />
        <div className="md:col-span-8 px-6 md:px-12 py-16 md:py-24">
          <div className="columns-1 md:columns-2 gap-12">
            <p className="font-body text-base leading-relaxed mb-6" style={{ textWrap: 'pretty' }}>
              BetweenBodies explores the physical boundaries and the intersection between performers 
              in contemporary theatrical space. The project brings together artists from diverse cultural 
              backgrounds to investigate how the body becomes a tool for communication beyond language.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ textWrap: 'pretty' }}>
              Through intensive workshops, BetweenBodies creates a space for experimentation 
              where participants discover new modes of physical expression, building bridges 
              between European theatrical traditions and contemporary movement practices.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ textWrap: 'pretty' }}>
              Each workshop is a unique opportunity to work in community, 
              to challenge your own limits, and to rediscover the relationship between 
              body and space in an international context.
            </p>
          </div>
        </div>
        <div className="md:col-span-2" />
      </div>
    </section>
  );
};

export default AboutSection;
