import React, { useEffect, useState } from 'react';

const CareerLogs = () => {
  const [visibleLines, setVisibleLines] = useState([]);
  const logs = [
    { text: "Starting career analysis segment...", type: "system" },
    { text: "Initializing background checks for 11 roles found.", type: "system" },
    { text: "[2024 — 2026] Loaded node: Yello - Développeur front-end", type: "entry", company: "Yello" },
    { text: "[2025 — 2026] Loaded node: Sapiow - Développeur front-end · Freelance", type: "entry", company: "Sapiow" },
    { text: "[2025 — 2026] Loaded node: Soveur - Développeur front-end · Freelance", type: "entry", company: "Soveur" },
    { text: "[2025] Loaded node: eDaktarii - Développeur front-end · Freelance", type: "entry", company: "eDaktarii" },
    { text: "Ready to eject career history module...", type: "system", cursor: true },
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
  }, []);

  return (
    <section className="terminal-section">
      <div className="terminal-container">
        <div className="terminal-header">
          <span>SYSTEM LOGS / OUTPUT</span>
        </div>
        <div className="terminal-body">
          {visibleLines.map((log, i) => (
            <div key={i} className={`log-line ${log.type}`}>
              <span className="prompt">{'>'}</span>
              <span className="content">
                {log.type === 'entry' ? (
                  <>
                    <span className="dim">[{log.text.match(/\[(.*?)\]/)[1]}]</span>
                    <span> Loaded node: </span>
                    <span className="highlight-blue">{log.company}</span>
                    <span> - </span>
                    <span className="highlight-yellow">{log.text.split(': ')[1].split(' - ')[1] || log.text.split(': ')[1].split(' · ')[1]}</span>
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
