import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center gap-1 text-xs font-medium tracking-wide rounded-pill border transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-bg-card border-border text-text-secondary',
        accent: 'bg-accent/10 border-accent/20 text-accent',
        outline: 'bg-transparent border-border-light text-text-muted',
      },
      size: {
        sm: 'px-2 py-0.5',
        md: 'px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, variant, size, className = '' }: BadgeProps) {
  return (
    <span className={badgeVariants({ variant, size, className })}>
      {children}
    </span>
  );
}
