import { Reveal, SectionLabel } from './Reveal';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <SectionLabel number="05" label="Me contacter" />

        <Reveal>
          <h2 className="contact-title">
            Un projet <em>en tête</em>?<br />
            Parlons-en.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <a href="mailto:musadevweb@gmail.com" className="contact-email">musadevweb@gmail.com →</a>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={0.2}>
            <div className="col">
              <h4>Disponibilité</h4>
              <p>Ouvert aux missions freelance, collaborations startups ambitieuses et environnements techniques exigeants. Remote ou sur Dakar.</p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="col">
              <h4>Réseaux</h4>
              <a href="https://www.linkedin.com/in/moussa-diagne-b81226107/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href="https://tagg-group.com" target="_blank" rel="noopener noreferrer">Tàgg Group ↗</a>
              <a href="mailto:musadevweb@gmail.com">Email ↗</a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="col">
              <h4>Téléphone</h4>
              <a href="tel:+221780105426">+221 78 010 54 26</a>
            </div>
          </Reveal>
        </div>

        <footer>
          <Reveal delay={0.5}>
            <div>© 2026 Moussa Diagne — Tous droits réservés</div>
          </Reveal>
          <Reveal delay={0.5}>
            <div>Conçu &amp; développé à Dakar 🇸🇳</div>
          </Reveal>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
