import { Reveal, SectionLabel } from './Reveal';

export const About = () => {
  return (
    <section className="about" id="about">
      <SectionLabel number="01" label="À propos" />
      <Reveal delay={0.1}>
        <div className="about-text">
          <p>
            <span className="drop">I</span>ntéressé par les produits <em>utiles</em>, les startups <em>ambitieuses</em> et les environnements techniques <em>exigeants</em>. Co-fondateur de <em>Tàgg Group</em>, j'interviens sur des architectures React / Next.js / TypeScript avec une gestion d'état avancée et une attention particulière portée à la performance, l'UX et la maintenabilité.
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export const PullQuote = () => {
  return (
    <div className="pullquote">
      <Reveal>
        <blockquote>
          Construire des interfaces qui respectent à la fois <em>l'utilisateur final</em> et <em>le développeur suivant</em>.
        </blockquote>
      </Reveal>
    </div>
  );
};
