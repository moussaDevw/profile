import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  fluid?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  as: Component = 'div',
  className = '',
  fluid = false,
  style,
  ...rest
}) => {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: fluid ? '100%' : '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 'clamp(10px, 2.5vw, 32px)',
    paddingRight: 'clamp(10px, 2.5vw, 32px)',
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <Component className={`mt-container ${className}`} style={containerStyle} {...rest}>
      {children}
    </Component>
  );
};

