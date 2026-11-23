import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItemInput {
  question?: string;
  q?: string;
  answer?: string | React.ReactNode;
  a?: string | React.ReactNode;
}

export interface FaqAccordionProps {
  items: FaqItemInput[];
  defaultOpenIndex?: number | null;
  openIndex?: number | null;
  onToggle?: (index: number) => void;
  idPrefix?: string;
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  defaultOpenIndex = 0,
  openIndex: controlledOpenIndex,
  onToggle: controlledOnToggle,
  idPrefix = 'faq',
  className = '',
}) => {
  const [internalOpenIndex, setInternalOpenIndex] = useState<number | null>(defaultOpenIndex);

  const isControlled = controlledOpenIndex !== undefined;
  const activeIndex = isControlled ? controlledOpenIndex : internalOpenIndex;

  const handleToggle = (index: number) => {
    if (controlledOnToggle) {
      controlledOnToggle(index);
    }
    if (!isControlled) {
      setInternalOpenIndex((prev) => (prev === index ? null : index));
    }
  };

  return (
    <div
      className={`mt-faq-accordion ${className}`}
      style={{
        maxWidth: '840px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {items.map((item, index) => {
        const questionText = item.question || item.q || '';
        const answerContent = item.answer || item.a || '';
        const isOpen = activeIndex === index;
        const headerId = `${idPrefix}-header-${index}`;
        const contentId = `${idPrefix}-content-${index}`;

        return (
          <div
            key={index}
            className={`mt-faq-item ${isOpen ? 'mt-faq-item-open' : ''}`}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '26px',
              border: isOpen ? '1.5px solid #0E6049' : '1px solid rgba(11, 23, 48, 0.06)',
              overflow: 'hidden',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: isOpen
                ? '0 20px 44px -10px rgba(11, 23, 48, 0.1)'
                : '0 8px 24px -6px rgba(11, 23, 48, 0.05)',
            }}
          >
            <button
              id={headerId}
              type="button"
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              style={{
                width: '100%',
                padding: 'clamp(18px, 3.5vw, 24px) clamp(18px, 3vw, 28px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                outline: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 'clamp(15.5px, 3.5vw, 17.5px)',
                  fontWeight: 800,
                  color: '#0B1730',
                  lineHeight: 1.38,
                  transition: 'color 0.15s ease',
                }}
              >
                {questionText}
              </span>

              <div
                style={{
                  width: '36px',
                  height: '36px',
                  minWidth: '36px',
                  minHeight: '36px',
                  borderRadius: '50%',
                  backgroundColor: isOpen ? '#D9F2EE' : '#FAF8F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <ChevronDown
                  size={18}
                  color={isOpen ? '#0E6049' : '#465670'}
                  strokeWidth={2.5}
                />
              </div>
            </button>

            {isOpen && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                style={{
                  padding: '0 clamp(18px, 3vw, 28px) clamp(20px, 4vw, 26px) clamp(18px, 3vw, 28px)',
                  borderTop: '1px solid #F1EFEA',
                }}
              >
                <div
                  className="mt-body mt-muted"
                  style={{
                    margin: 0,
                    paddingTop: '16px',
                    lineHeight: 1.65,
                    fontSize: 'clamp(14.5px, 2.5vw, 15.5px)',
                    color: '#334155',
                  }}
                >
                  {typeof answerContent === 'string' ? (
                    <p style={{ margin: 0, lineHeight: 1.65 }}>{answerContent}</p>
                  ) : (
                    answerContent
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
