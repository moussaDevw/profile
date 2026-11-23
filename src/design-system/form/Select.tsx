import React, { forwardRef } from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, error = false, disabled = false, className = '', style, ...rest }, ref) => {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <select
          ref={ref}
          disabled={disabled}
          className={`mt-select ${error ? 'mt-select-error' : ''} ${className}`}
          style={{
            width: '100%',
            minHeight: '50px',
            padding: '0 42px 0 18px',
            borderRadius: '16px',
            border: error ? '1.5px solid #D9383A' : '1px solid #E2DDD5',
            backgroundColor: disabled ? '#FAF8F5' : '#FFFFFF',
            color: '#0B1730',
            fontSize: '15px',
            fontFamily: "'Inter', sans-serif",
            outline: 'none',
            boxSizing: 'border-box',
            appearance: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            ...style,
          }}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: '#465670',
            fontSize: '12px',
          }}
        >
          ▼
        </span>
      </div>
    );
  }
);

Select.displayName = 'Select';

