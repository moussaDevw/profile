import React from 'react';

export interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  required = false,
  error,
  hint,
  children,
  className = '',
}) => {
  return (
    <div className={`mt-form-field ${className}`} style={{ marginBottom: '20px' }}>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: 600,
          color: '#172A46',
          marginBottom: '8px',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
        {required && <span style={{ color: '#19B8CD', marginLeft: '4px' }}>*</span>}
      </label>

      {children}

      {hint && !error && (
        <span style={{ display: 'block', fontSize: '13px', color: '#465670', marginTop: '6px' }}>
          {hint}
        </span>
      )}

      {error && (
        <span
          role="alert"
          style={{
            display: 'block',
            fontSize: '13px',
            color: '#D9383A',
            fontWeight: 500,
            marginTop: '6px',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

