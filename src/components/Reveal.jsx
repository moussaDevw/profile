import { motion } from 'framer-motion';

export const Reveal = ({ children, delay = 0, width = "100%" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ 
        duration: 0.9, 
        delay, 
        ease: [0.2, 0.8, 0.2, 1] 
      }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export const SectionLabel = ({ number, label }) => {
  return (
    <Reveal>
      <div className="section-label">
        <span className="section-num">{number}</span>
        <span>{label}</span>
      </div>
    </Reveal>
  );
};
