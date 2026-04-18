import { Reveal, SectionLabel } from './Reveal';
import { TIMELINE } from '../constants/data';

const Experience = () => {
  return (
    <section id="experience">
      <SectionLabel number="04" label="Parcours" />

      <Reveal>
        <h2 className="work-title" style={{ marginBottom: '1rem' }}>Sept ans, <em>chronologie</em>.</h2>
      </Reveal>

      <div className="timeline">
        {TIMELINE.map((item, index) => (
          <Reveal key={index} delay={index * 0.05}>
            <div className="timeline-row">
              <div className="tl-year">{item.year}</div>
              <div className="tl-company">{item.company}</div>
              <div className="tl-role">{item.role}</div>
              <div className="tl-stack">{item.stack}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Experience;
