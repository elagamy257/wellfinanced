import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, alt = '', fallback, size = 'md', className = '', ...props }: AvatarProps) {
  const baseStyles = 'relative flex-shrink-0 rounded-full flex items-center justify-center font-bold text-background bg-gradient-to-tr from-primary to-secondary select-none overflow-hidden';
  
  const sizes = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-10 h-10 text-xs',
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
