import { useTranslation } from 'react-i18next';
import { Reveal, SectionLabel } from './Reveal';
import { EXPERTISE } from '../constants/data';

const Expertise = () => {
  const { t } = useTranslation();

  const getTitleKey = (title) => {
    if (title.includes('Framework')) return 'expertise_titles.frameworks';
    if (title.includes('Données')) return 'expertise_titles.state';
    if (title.includes('UI')) return 'expertise_titles.ui';
    return title;
  };

  return (
    <section id="expertise" style={{ marginTop: '4rem' }}>
      <SectionLabel number="03" label={t('sections.expertise')} />

      <Reveal>
        <h2 className="work-title" style={{ marginBottom: '1rem' }}>
          {t('nav.expertise')}.
        </h2>
      </Reveal>

      <div className="expertise-grid">
        {EXPERTISE.map((block, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <div className="expertise-block">
              <div className="num">{block.id}</div>
              <h3>{t(getTitleKey(block.title), block.title)}</h3>
              <ul>
                {block.skills.map((skill, i) => (
                  <li key={i}>
                    {skill.name}{' '}
                    <span className="level">
                      {skill.level === 'Expert' ? t('levels.expert') : t('levels.solid')}
                    </span>
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
