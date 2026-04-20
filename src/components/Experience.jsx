import { useTranslation } from 'react-i18next';
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
    <section id="experience">
      <SectionLabel number="04" label={t('sections.experience')} />

      <Reveal>
        <h2 className="work-title" style={{ marginBottom: '1rem' }}>
          {t('sections.experience')}
        </h2>
      </Reveal>

      <div className="timeline">
        {TIMELINE.map((item, index) => {
          const roleKey = getRoleKey(item.role);
          return (
            <Reveal key={index} delay={index * 0.05}>
              <div className="timeline-row">
                <div className="tl-year">{item.year}</div>
                <div className="tl-company">{item.company}</div>
                <div className="tl-role">{roleKey ? t(roleKey) : item.role}</div>
                <div className="tl-stack">{item.stack}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
