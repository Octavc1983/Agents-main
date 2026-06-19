import React from 'react';
import './Skeleton.scss';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width, height, borderRadius, className, variant = 'rect', lines = 1,
}) => {
  const style: React.CSSProperties = {};
  if (width !== undefined) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height !== undefined) style.height = typeof height === 'number' ? `${height}px` : height;
  if (borderRadius !== undefined) style.borderRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  if (variant === 'text' && lines > 1) {
    return (
      <div className={['skeleton-text-block', className || ''].filter(Boolean).join(' ')}>
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className="skeleton skeleton--text"
            style={i === lines - 1 ? { ...style, width: '60%' } : style}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={['skeleton', `skeleton--${variant}`, className || ''].filter(Boolean).join(' ')}
      style={style}
      aria-hidden="true"
    />
  );
};
