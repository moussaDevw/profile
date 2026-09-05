import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Sparkles } from 'lucide-react';
import { Reveal, SectionLabel } from './Reveal';
import { TIMELINE } from '../constants/data';

const Experience = () => {
  const { t } = useTranslation();

  const getRoleKey = (role) => {
    if (role.toLowerCase().includes('front-end') && role.toLowerCase().includes('freelance')) return 'roles.frontend_freelance';
    if (role.toLowerCase().includes('front-end')) return 'roles.frontend';
    if (role.toLowerCase().includes('fullstack')) return 'roles.fullstack';
    if (role.toLowerCase().includes('web/mobile')) return 'roles.web_mobile';
    if (role.toLowerCase().includes('web') && role.toLowerCase().includes('stage')) return 'roles.stage';
    if (role.toLowerCase().includes('web')) return 'roles.web';
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