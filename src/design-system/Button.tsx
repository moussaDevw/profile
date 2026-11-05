import React from 'react';
import { useRouter } from '../lib/router';

export type ButtonVariant = 'primary' | 'cyan' | 'secondary' | 'outline' | 'outline-light' | 'ghost';
export type ButtonSize = 'default' | 'sm' | 'lg';

interface BaseButtonStylesProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
}

const getButtonStyles = ({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  disabled = false,
}: BaseButtonStylesProps): React.CSSProperties => {
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      minHeight: '40px',
      padding: '0 16px',
      fontSize: '14px',
    },
    default: {
      minHeight: '48px',
      padding: '0 24px',
      fontSize: '15px',
    },
    lg: {
      minHeight: '54px',
      padding: '0 32px',
      fontSize: '16px',
    },
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: '#0B1730',
      color: '#FFFFFF',
      border: '1px solid #0B1730',
    },
    cyan: {
      backgroundColor: '#19B8CD',
      color: '#0B1730', // High contrast WCAG AA 7.5:1
      border: '1px solid #19B8CD',
      fontWeight: 600,
    },
    secondary: {
      backgroundColor: '#E9F1F7',
      color: '#172A46',
      border: '1px solid #DAE3ED',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#0B1730',
      border: '1px solid #DAE3ED',
    },
    'outline-light': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#FFFFFF',
      border: '1px solid rgba(218, 227, 237, 0.4)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#172A46',
      border: '1px solid transparent',
    },
  };

  return {
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto',
    borderRadius: '10px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    lineHeight: 1,
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    boxSizing: 'border-box',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  disabled = false,
  className = '',
  style,
  ...rest
}) => {
  const computedStyle = {
    ...getButtonStyles({ variant, size, fullWidth, disabled }),
    ...style,
  };

  return (
    <button
      className={`mt-btn mt-btn-${variant} ${className}`}
      style={computedStyle}
      disabled={disabled}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className="mt-btn-icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="mt-btn-icon">{icon}</span>}
    </button>
  );
};

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  className = '',
  style,
  onClick,
  href,
  ...rest
}) => {
  const { navigate } = useRouter();
  const computedStyle = {
    ...getButtonStyles({ variant, size, fullWidth, disabled: false }),
    ...style,
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && href) {
      if (href.startsWith('/') || href.startsWith('#')) {
        e.preventDefault();
        navigate(href);
      }
    }
  };

  return (
    <a
      href={href}
      className={`mt-btn mt-btn-${variant} ${className}`}
      style={computedStyle}
      onClick={handleClick}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className="mt-btn-icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="mt-btn-icon">{icon}</span>}
    </a>
  );
};

