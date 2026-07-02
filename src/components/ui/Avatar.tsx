import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, alt = '', fallback, size = 'md', className = '', ...props }: AvatarProps) {
  const baseStyles = 'relative flex-shrink-0 rounded-full flex items-center justify-center font-bold text-text bg-gradient-cyan border border-white/10 select-none overflow-hidden';
  
  const sizes = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-11 h-11 text-xs',
    lg: 'w-14 h-14 text-sm',
  };

  return (
    <div className={`${baseStyles} ${sizes[size]} ${className}`} {...props}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <span>{fallback.substring(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}
