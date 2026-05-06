import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'matched' | 'fulfilled' | 'cancelled' | 'available' | 'unavailable';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = {
    pending: {
      label: 'Pending',
      classes: 'bg-warning/10 text-warning border border-warning/20',
    },
    matched: {
      label: 'Matched',
      classes: 'bg-accent/10 text-accent border border-accent/20',
    },
    fulfilled: {
      label: 'Fulfilled',
      classes: 'bg-success/10 text-success border border-success/20',
    },
    cancelled: {
      label: 'Cancelled',
      classes: 'bg-muted text-muted-foreground border border-border',
    },
    available: {
      label: 'Available',
      classes: 'bg-success/10 text-success border border-success/20',
    },
    unavailable: {
      label: 'Unavailable',
      classes: 'bg-muted text-muted-foreground border border-border',
    },
    accepted: {
      label: 'Accepted',
      classes: 'bg-success/10 text-success border border-success/20',
    },
    rejected: {
      label: 'Rejected',
      classes: 'bg-destructive/10 text-destructive border border-destructive/20',
    },
  };

  const statusConfig = config[status as keyof typeof config] || {
    label: status,
    classes: 'bg-muted text-muted-foreground border border-border',
  };

  const { label, classes } = statusConfig;

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
