import { cn } from '@/lib/utils';

interface BloodGroupBadgeProps {
  group: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'soft';
  className?: string;
}

export function BloodGroupBadge({ group, size = 'md', variant = 'default', className }: BloodGroupBadgeProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
  };

  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    outline: 'border-2 border-primary text-primary bg-transparent',
    soft: 'bg-primary-soft text-primary',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full font-bold',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {group}
    </div>
  );
}
