import { Reveal, SectionLabel } from './Reveal';
import { EXPERTISE } from '../constants/data';

const Expertise = () => {
  return (
    <section id="expertise">
      <SectionLabel number="03" label="Expertise technique" />

      <Reveal>
        <h2 className="work-title" style={{ marginBottom: '1rem' }}>Ce que je <em>maîtrise</em>.</h2>
      </Reveal>

      <div className="expertise-grid">
        {EXPERTISE.map((block, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <div className="expertise-block">
              <div className="num">{block.id}</div>
              <h3>{block.title}</h3>
              <ul>
                {block.skills.map((skill, i) => (
                  <li key={i}>
                    {skill.name} <span className="level">{skill.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Expertise;
