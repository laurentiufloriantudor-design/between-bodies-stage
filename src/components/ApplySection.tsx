import { useState } from "react";
import { Button } from "@/components/ui/button";

const ApplySection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    motivation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="apply" className="border-b border-foreground px-6 md:px-12 py-24">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl mb-6">Aplicație recepționată</h2>
          <p className="font-body text-base leading-relaxed text-muted-foreground">
            Mulțumim pentru interes. Te vom contacta în curând cu detalii suplimentare despre workshop-ul din Torino.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="border-b border-foreground">
      <div className="border-b border-foreground px-6 md:px-12 py-4">
        <span className="font-display uppercase text-sm tracking-tighter text-muted-foreground">
          [ Formular de aplicare ]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-foreground px-6 md:px-12 py-16">
          <h2 className="text-4xl md:text-5xl mb-6">Aplică pentru Torino Intensive</h2>
          <p className="font-body text-base leading-relaxed text-muted-foreground mb-4" style={{ textWrap: 'pretty' }}>
            Workshop-ul este deschis actorilor, performerilor, studenților la arte și tuturor celor 
            interesați de explorarea corpului în spațiul scenic.
          </p>
          <div className="font-display uppercase text-sm tracking-tighter">
            <p className="mb-1">* 12 locuri disponibile</p>
            <p className="mb-1">* Free of charge</p>
            <p>* 25.04 — 26.04.2025, Torino</p>
          </div>
        </div>

        <div className="md:col-span-7 px-6 md:px-12 py-16">
          <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
            <div>
              <label className="font-display uppercase text-sm tracking-tighter block mb-2">
                Nume complet *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-b-2 border-foreground bg-transparent py-2 font-body text-base outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="font-display uppercase text-sm tracking-tighter block mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b-2 border-foreground bg-transparent py-2 font-body text-base outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="font-display uppercase text-sm tracking-tighter block mb-2">
                Experiență teatrală
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full border-b-2 border-foreground bg-transparent py-2 font-body text-base outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="font-display uppercase text-sm tracking-tighter block mb-2">
                Motivație *
              </label>
              <textarea
                required
                rows={3}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                className="w-full border-b-2 border-foreground bg-transparent py-2 font-body text-base outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <Button variant="hero" size="lg" type="submit" className="mt-4">
              Trimite aplicația →
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplySection;
