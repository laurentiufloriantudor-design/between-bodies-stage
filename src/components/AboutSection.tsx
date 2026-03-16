const AboutSection = () => {
  return (
    <section id="about" className="border-b border-foreground">
      <div className="border-b border-foreground px-6 md:px-12 py-4">
        <span className="font-display uppercase text-sm tracking-tighter text-muted-foreground">
          [ Despre proiect ]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        <div className="md:col-span-2" />
        <div className="md:col-span-8 px-6 md:px-12 py-16 md:py-24">
          <div className="columns-1 md:columns-2 gap-12">
            <p className="font-body text-base leading-relaxed mb-6" style={{ textWrap: 'pretty' }}>
              BetweenBodies explorează limitele fizice și intersecția dintre performeri 
              în spațiul teatral contemporan. Proiectul reunește artiști din diverse medii 
              culturale pentru a investiga cum corpul devine un instrument de comunicare 
              dincolo de limbaj.
            </p>
            <p className="font-body text-base leading-relaxed mb-6" style={{ textWrap: 'pretty' }}>
              Prin workshop-uri intensive, BetweenBodies creează un spațiu de experimentare 
              unde participanții descoperă noi modalități de expresie fizică, construind 
              punți între tradițiile teatrale europene și practicile contemporane de mișcare.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ textWrap: 'pretty' }}>
              Fiecare workshop este o oportunitate unică de a lucra în comunitate, 
              de a-ți provoca propriile limite și de a redescoperi relația dintre 
              corp și spațiu într-un context internațional.
            </p>
          </div>
        </div>
        <div className="md:col-span-2" />
      </div>
    </section>
  );
};

export default AboutSection;
