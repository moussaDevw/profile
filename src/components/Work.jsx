import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Layers, Sparkles, Code2, Globe } from 'lucide-react';
import { Reveal, SectionLabel } from './Reveal';
import { PROJECTS } from '../constants/data';

const Work = () => {
  const { t } = useTranslation();
  const [expandedProject, setExpandedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'edtech', label: 'EdTech & Mentoring' },
    { id: 'healthtech', label: 'HealthTech & Services' },
    { id: 'data', label: 'Data & Enterprise' },
  ];

  const filterProject = (project) => {
    if (activeCategory === 'all') return true;
    const typeLower = project.type.toLowerCase();
    if (activeCategory === 'edtech') return typeLower.includes('edtech') || typeLower.includes('mentoring') || typeLower.includes('marketplace');
    if (activeCategory === 'healthtech') return typeLower.includes('healthtech') || typeLower.includes('services') || typeLower.includes('logistique');
    if (activeCategory === 'data') return typeLower.includes('data') || typeLower.includes('dashboard') || typeLower.includes('crm');
    return true;
  };

  const filteredProjects = PROJECTS.filter(filterProject);

  const toggleProject = (index) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section id="work" className="work-section">
      <SectionLabel number="02" label={t('sections.work')} />

      <div className="work-intro">
        <Reveal>
          <h2 className="work-title">
            <Trans i18nKey="sections.work_title">
              Projets <em>récents</em> &amp; <em>en cours</em>
            </Trans>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="work-desc">{t('sections.work_desc')}</p>
        </Reveal>
      </div>

      {/* Category Filter Tabs */}
      <Reveal delay={0.15}>
        <div className="work-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
              {activeCategory === cat.id && (
                <motion.div
                  className="filter-active-bg"
                  layoutId="filterActive"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Projects Grid Container */}
      <div className="projects-container">
        {filteredProjects.map((project, index) => {
          const projectKey = project.name.toLowerCase();
          const isExpanded = expandedProject === index;
          const projectBody = t(`projects.bodies.${projectKey}`, { returnObjects: true });
          const hasDetails = typeof projectBody === 'object';

          return (
            <Reveal key={project.name} delay={index * 0.05}>
              <motion.article 
                className={`project-card ${isExpanded ? 'is-expanded' : ''}`}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="project-card-header" onClick={() => hasDetails && toggleProject(index)}>
                  <div className="project-year-badge">{project.year}</div>
                  
                  <div className="project-meta-info">
                    <div className="project-type-tag">
                      {project.type.split(' · ').map((part, i) => (
                        <span key={i}>
                          {part.replace('En cours', t('projects.in_progress'))
                              .replace('Marketplace', t('projects.marketplace'))
                              .replace('Consultant', t('projects.consultant'))
                              .replace('HealthTech', t('projects.healthtech'))
                              .replace('Data', t('projects.data'))
                              .replace('Recherche scientifique', t('projects.research'))
                              .replace('Dashboard', t('projects.dashboard'))
                              .replace('Centre d\'appels', t('projects.call_center'))
                              .replace('P2P', t('projects.p2p'))}
                          {i < project.type.split(' · ').length - 1 && ' · '}
                        </span>
                      ))}
                    </div>
                    <h3 className="project-name">
                      {project.name}
                      <span className="project-client-name">— {t(`projects.client_labels.${projectKey}`, project.client)}</span>
                    </h3>
                  </div>

                  {hasDetails && (
                    <button className="project-expand-btn" aria-label="Toggle Details">
                      <ChevronDown size={20} className={`chevron-icon ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                <div className="project-card-body">
                  <p className="project-summary-text">{hasDetails ? projectBody.context : projectBody}</p>
                  
                  <div className="project-tags-list">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag-pill">{tag}</span>
                    ))}
                  </div>

                  {hasDetails && (
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          className="project-details-drawer"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="details-grid">
                            {[
                              { key: 'goal', icon: '🎯' },
                              { key: 'role', icon: '👤' },
                              { key: 'achievements', icon: '✨' },
                              { key: 'challenges', icon: '🛠️' },
                              { key: 'impact', icon: '🚀' }
                            ].map(({ key, icon }) => (
                              <div className="detail-item-box" key={key}>
                                <h4 className="detail-label-title">
                                  <span className="detail-icon-emoji">{icon}</span>
                                  {t(`projects.detail_labels.${key}`)}
                                </h4>
                                <div className="detail-content-body">
                                  {projectBody[key].split('\n').map((line, i) => {
                                    if (line.trim().startsWith('•')) {
                                      return (
                                        <div key={i} className="list-item-bullet">
                                          <span className="bullet-point"></span>
                                          <span>{line.trim().substring(1).trim()}</span>
                                        </div>
                                      );
                                    }
                                    return <p key={i}>{line}</p>;
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Work;