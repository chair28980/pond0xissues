import { CircleDot, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusIconProps {
  status: 'open' | 'closed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusIcon({ status, size = 'md', className }: StatusIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  if (status === 'open') {
    return (
      <CircleDot
        className={cn(
          'text-primary-500',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <CheckCircle
      className={cn(
        'text-secondary-500',
        sizeClasses[size],
        className
      )}
    />
  );
}
