import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Terminal as TerminalIcon, RotateCcw, Play } from 'lucide-react';
import { Reveal } from './Reveal';

const CareerLogs = () => {
  const { t } = useTranslation();
  const [visibleLines, setVisibleLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

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
    { text: "[2024 — 2026] Loaded node: Yello - Senior Frontend Developer", type: "entry", company: "Yello", year: "2024 — 2026", role: "Senior Frontend Developer" },
    { text: "[2025 — 2026] Loaded node: Sapiow - Consultant Développeur Full Stack", type: "entry", company: "Sapiow", year: "2025 — 2026", role: "Consultant Développeur Full Stack" },
    { text: "[2024 — 2026] Loaded node: Istamco - Consultant Développeur Full Stack", type: "entry", company: "Istamco", year: "2024 — 2026", role: "Consultant Développeur Full Stack" },
    { text: "[2025] Loaded node: eDaktarii - Consultant Software Engineer", type: "entry", company: "eDaktarii", year: "2025", role: "Consultant Software Engineer" },
    { text: "[2025] Loaded node: Assure Express - Full Stack Engine (NestJS / React Native)", type: "entry", company: "Assure Express", year: "2025", role: "Full Stack (NestJS / React Native)" },
    { text: t('terminal.ready'), type: "system", cursor: true },
  ];

  const startTypingSequence = () => {
    setVisibleLines([]);
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < logs.length) {
        const currentLog = logs[index];
        setVisibleLines((prev) => [...prev, currentLog]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 180);
  };

  useEffect(() => {
    startTypingSequence();
  }, [t]);

  return (
    <section className="terminal-section">
      <Reveal>
        <div className="terminal-container">
          {/* macOS Style Window Bar */}
          <div className="terminal-header">
            <div className="window-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="terminal-title">
              <TerminalIcon size={14} className="term-icon" />
              <span>{t('terminal.header')}</span>
            </div>
            <button 
              className="replay-btn" 
              onClick={startTypingSequence} 
              disabled={isTyping}
              title="Rejouer la séquence"
            >
              <RotateCcw size={14} className={isTyping ? 'spin' : ''} />
              <span>Replay</span>
            </button>
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
      </Reveal>
    </section>
  );
};

export default CareerLogs;