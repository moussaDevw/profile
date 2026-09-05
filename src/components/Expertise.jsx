import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Cpu, Database, Layout, Sparkles } from 'lucide-react';
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

  const getCategoryIcon = (index) => {
    if (index === 0) return <Cpu size={22} className="cat-icon-svg" />;
    if (index === 1) return <Database size={22} className="cat-icon-svg" />;
    return <Layout size={22} className="cat-icon-svg" />;
  };

  return (
    <section id="expertise" className="expertise-section">
      <SectionLabel number="03" label={t('sections.expertise')} />

      <Reveal>
        <h2 className="work-title">
          Stack Technique &amp; <em>Compétences Clés</em>.
        </h2>
      </Reveal>

      <div className="expertise-grid">
        {EXPERTISE.map((block, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <motion.div 
              className="expertise-card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <div className="expertise-card-header">
                <div className={`expertise-icon-badge badge-cat-${index}`}>
                  {getCategoryIcon(index)}
                </div>
                <div className="num-tag">{block.id}</div>
              </div>

              <h3 className="expertise-card-title">
                {t(getTitleKey(block.title), block.title)}
              </h3>

              <ul className="expertise-skills-list">
                {block.skills.map((skill, i) => {
                  const isExpert = skill.level === 'Expert';
                  return (
                    <li key={i} className="skill-item">
                      <div className="skill-name-row">
                        <span className="skill-name">{skill.name}</span>
                        <span className={`skill-level-badge ${isExpert ? 'is-expert' : 'is-solid'}`}>
                          {isExpert ? t('levels.expert') : t('levels.solid')}
                        </span>
                      </div>
                      <div className="skill-progress-bar">
                        <motion.div 
                          className={`progress-fill ${isExpert ? 'fill-expert' : 'fill-solid'}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: isExpert ? '92%' : '78%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Expertise;