import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, disabled = false, className = '', style, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        className={`mt-input ${error ? 'mt-input-error' : ''} ${className}`}
        style={{
          width: '100%',
          minHeight: '48px',
          padding: '0 16px',
          borderRadius: '10px',
          border: error ? '1.5px solid #D9383A' : '1px solid #DAE3ED',
          backgroundColor: disabled ? '#F4F7FB' : '#FFFFFF',
          color: '#0B1730',
          fontSize: '15px',
          fontFamily: "'Inter', sans-serif",
          outline: 'none',
          boxSizing: 'border-box',
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

Input.displayName = 'Input';

