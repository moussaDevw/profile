import { Reveal, SectionLabel } from './Reveal';
import { PROJECTS } from '../constants/data';

const Work = () => {
  return (
    <section id="work">
      <SectionLabel number="02" label="Travaux sélectionnés" />

      <div className="work-intro">
        <Reveal>
          <h2 className="work-title">Projets <em>récents</em> &amp; <em>en cours</em></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="work-desc">Une sélection des plateformes sur lesquelles j'ai travaillé — des marketplaces double-sided aux applications temps réel critiques. Chaque projet, un contexte métier différent.</p>
        </Reveal>
      </div>

      <div>
        {PROJECTS.map((project, index) => (
          <Reveal key={index} delay={index * 0.05}>
            <article className="project">
              <div className="project-year">{project.year}</div>
              <div className="project-header">
                <div className="project-type">{project.type}</div>
                <h3 className="project-name">{project.name}</h3>
                <div className="project-client">{project.client}</div>
              </div>
              <div className="project-body">
                <p>{project.body}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Work;
