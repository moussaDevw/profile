import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CareerLogs = () => {
  const { t } = useTranslation();
  const [visibleLines, setVisibleLines] = useState([]);

  const getRoleKey = (role) => {
    if (role.toLowerCase().includes('front-end') && role.toLowerCase().includes('consultant')) return 'roles.frontend_consultant';
    if (role.toLowerCase().includes('front-end')) return 'roles.frontend';
    if (role.toLowerCase().includes('fullstack')) return 'roles.fullstack';
    if (role.toLowerCase().includes('web/mobile')) return 'roles.web_mobile';
    if (role.toLowerCase().includes('web') && role.toLowerCase().includes('stage')) return 'roles.stage';
    if (role.toLowerCase().includes('web')) return 'roles.web';
    return null;
  };

  const logs = [
    { text: t('terminal.starting'), type: "system" },
    { text: t('terminal.initializing'), type: "system" },
    { text: "[2024 — 2026] Loaded node: Yello - Développeur front-end", type: "entry", company: "Yello", year: "2024 — 2026", role: "Développeur front-end" },
    { text: "[2025 — 2026] Loaded node: Sapiow - Développeur front-end · Consultant", type: "entry", company: "Sapiow", year: "2025 — 2026", role: "Développeur front-end · Consultant" },
    { text: "[2025 — 2026] Loaded node: Soveur - Développeur front-end · Consultant", type: "entry", company: "Soveur", year: "2025 — 2026", role: "Développeur front-end · Consultant" },
    { text: "[2025] Loaded node: eDaktarii - Développeur front-end · Consultant", type: "entry", company: "eDaktarii", year: "2025", role: "Développeur front-end · Consultant" },
    { text: t('terminal.ready'), type: "system", cursor: true },
  ];

  useEffect(() => {
    let timeout;
    const addLine = (index) => {
      if (index < logs.length) {
        setVisibleLines((prev) => [...prev, logs[index]]);
        timeout = setTimeout(() => addLine(index + 1), 150 + Math.random() * 200);
      }
    };
    addLine(0);
    return () => clearTimeout(timeout);
  }, [t]);

  return (
    <section className="terminal-section">
      <div className="terminal-container">
        <div className="terminal-header">
          <span>{t('terminal.header')}</span>
        </div>
        <div className="terminal-body">
          {visibleLines.map((log, i) => (
            <div key={i} className={`log-line ${log.type}`}>
              <span className="prompt">{'>'}</span>
              <span className="content">
                {log.type === 'entry' ? (
                  <>
                    <span className="dim">[{log.year}]</span>
                    <span> {t('terminal.loaded')}</span>
                    <span className="highlight-blue">{log.company}</span>
                    <span> - </span>
                    <span className="highlight-yellow">
                      {getRoleKey(log.role) ? t(getRoleKey(log.role)) : log.role}
                    </span>
                  </>
                ) : (
                  <span>{log.text}</span>
                )}
                {log.cursor && <span className="cursor">_</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerLogs;
