import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-white/20 border-t-primary-500',
          sizeClasses[size]
        )}
        style={{
          borderTopColor: '#3b82f6',
          borderRightColor: '#8b5cf6',
          borderBottomColor: '#ec4899',
          borderLeftColor: 'transparent',
        }}
      />
    </div>
  );
}

