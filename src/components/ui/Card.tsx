import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'solid' | 'purple' | 'cyan' | 'green' | 'glass';
  interactive?: boolean;
}

export function Card({ children, variant = 'default', interactive = false, className = '', ...props }: CardProps) {
  const baseStyles = 'rounded-card border transition-all duration-250 ease-in-out overflow-hidden shadow-neon';
  
  const variants = {
    default: 'glass-panel text-text border-border',
    glass: 'bg-white/10 backdrop-blur-[20px] text-text border-white/10',
    solid: 'bg-bg-2 border-border text-text',
    purple: 'bg-gradient-purple text-text border-white/10 shadow-glow',
    cyan: 'bg-gradient-cyan text-text border-white/10 shadow-glow',
    green: 'bg-gradient-green text-background border-white/10 text-bg-1 shadow-glow',
  };

  const hoverStyles = interactive 
    ? 'hover:scale-[1.02] hover:border-white/15 hover:bg-white/12 hover:shadow-glow-strong cursor-pointer' 
    : '';

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 border-b border-border/40 flex flex-col gap-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-card-title font-bold text-text tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-caption text-muted ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 border-t border-border/40 bg-white/2 flex items-center justify-end gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
}
