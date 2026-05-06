import { cn } from '@/lib/utils';

interface UrgencyBadgeProps {
  urgency: 'normal' | 'urgent' | 'emergency';
  className?: string;
}

export function UrgencyBadge({ urgency, className }: UrgencyBadgeProps) {
  const config = {
    normal: {
      label: 'Normal',
      classes: 'bg-muted text-muted-foreground',
    },
    urgent: {
      label: 'Urgent',
      classes: 'bg-warning/10 text-warning border border-warning/20',
    },
    emergency: {
      label: 'Emergency',
      classes: 'bg-primary/10 text-primary border border-primary/20 animate-pulse-soft',
    },
  };

  const { label, classes } = config[urgency];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        classes,
        className
      )}
    >
      {label}
    </span>
  );
}
