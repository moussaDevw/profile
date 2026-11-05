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
        maxWidth: '820px',
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
              borderRadius: '14px',
              border: isOpen ? '1.5px solid #19B8CD' : '1px solid #DAE3ED',
              overflow: 'hidden',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              boxShadow: isOpen
                ? '0 4px 20px -2px rgba(25, 184, 205, 0.12)'
                : '0 2px 6px rgba(11, 23, 48, 0.02)',
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
                padding: 'clamp(14px, 3.5vw, 20px) clamp(14px, 3vw, 24px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
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
                  fontSize: 'clamp(15px, 3.5vw, 17px)',
                  fontWeight: 700,
                  color: isOpen ? '#0B1730' : '#172A46',
                  lineHeight: 1.4,
                  transition: 'color 0.15s ease',
                }}
              >
                {questionText}
              </span>

              <div
                style={{
                  width: '32px',
                  height: '32px',
                  minWidth: '32px',
                  minHeight: '32px',
                  borderRadius: '50%',
                  backgroundColor: isOpen ? 'rgba(25, 184, 205, 0.12)' : '#F4F7FB',
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
                  color={isOpen ? '#19B8CD' : '#465670'}
                  strokeWidth={2.2}
                />
              </div>
            </button>

            {isOpen && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                style={{
                  padding: '0 clamp(14px, 3vw, 24px) clamp(16px, 4vw, 22px) clamp(14px, 3vw, 24px)',
                  borderTop: '1px solid #F1F5F9',
                }}
              >
                <div
                  className="mt-body mt-muted"
                  style={{
                    margin: 0,
                    paddingTop: '16px',
                    lineHeight: 1.65,
                    fontSize: 'clamp(14px, 2.5vw, 15px)',
                    color: '#465670',
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

