import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, disabled = false, rows = 4, className = '', style, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={`mt-textarea ${error ? 'mt-textarea-error' : ''} ${className}`}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: '10px',
          border: error ? '1.5px solid #D9383A' : '1px solid #DAE3ED',
          backgroundColor: disabled ? '#F4F7FB' : '#FFFFFF',
          color: '#0B1730',
          fontSize: '15px',
          fontFamily: "'Inter', sans-serif",
          outline: 'none',
          boxSizing: 'border-box',
          resize: 'vertical',
          minHeight: '110px',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          ...style,
        }}
        {...rest}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

