import { cn } from '@/lib/utils';
import { getContrastColor } from '@/lib/utils';

interface LabelBadgeProps {
  label: {
    name: string;
    color: string;
    description?: string | null;
  };
  size?: 'sm' | 'md';
  className?: string;
}

export function LabelBadge({ label, size = 'sm', className }: LabelBadgeProps) {
  const textColor = getContrastColor(`#${label.color}`);
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-all hover:scale-105',
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: `#${label.color}`,
        color: textColor,
      }}
      title={label.description || label.name}
    >
      {label.name}
    </span>
  );
}

