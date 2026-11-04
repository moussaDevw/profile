import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Reveal, SectionLabel } from './Reveal';
import { TIMELINE } from '../constants/data';

const Experience = () => {
  const { t } = useTranslation();

  const getRoleKey = (role) => {
    const r = role.toLowerCase();
    if (r.includes('covoiturage')) return 'roles.covoiturage';
    if (r.includes('stage')) return 'roles.stage';
    if (r.includes('web/mobile')) return 'roles.web_mobile';
    if (r.includes('freelance')) return 'roles.frontend_freelance';
    if (r.includes('front-end') && r.includes('consultant')) return 'roles.frontend_consultant';
    if (r.includes('front-end')) return 'roles.frontend';
    if (r.includes('fullstack')) return 'roles.fullstack';
    if (r.includes('web')) return 'roles.web';
    return null;
  };

  return (
    <section id="experience" className="experience-section">
      <SectionLabel number="04" label={t('sections.experience')} />

      <Reveal>
        <h2 className="work-title">
          Parcours <em>Professionnel</em> &amp; Expériences.
        </h2>
      </Reveal>

      <div className="timeline-container">
        {TIMELINE.map((item, index) => {
          const roleKey = getRoleKey(item.role);
          return (
            <Reveal key={index} delay={index * 0.04}>
              <motion.div 
                className="timeline-row-card"
                whileHover={{ x: 4, backgroundColor: 'var(--paper)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="tl-year-col">
                  <span className="year-pill">{item.year}</span>
                </div>
                <div className="tl-company-col">
                  <span className="company-name">{item.company}</span>
                </div>
                <div className="tl-role-col">
                  <span className="role-title">{roleKey ? t(roleKey) : item.role}</span>
                </div>
                <div className="tl-stack-col">
                  <span className="stack-text">{item.stack}</span>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;