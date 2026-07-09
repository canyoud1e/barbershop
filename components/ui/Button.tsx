import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium tracking-wide',
    'transition-all duration-300 ease-smooth',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    'select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-accent text-bg',
          'hover:bg-accent-dim hover:scale-[1.02]',
          'active:scale-[0.98]',
          'shadow-glow hover:shadow-none',
        ],
        outline: [
          'border border-border-light text-text-primary',
          'hover:border-accent hover:text-accent hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
        ghost: [
          'text-text-secondary',
          'hover:text-text-primary hover:bg-bg-elevated',
        ],
        danger: [
          'bg-red-900/20 border border-red-800 text-red-400',
          'hover:bg-red-900/40',
        ],
      },
      size: {
        sm: ['h-9 px-4 text-sm rounded-card'],
        md: ['h-12 px-6 text-sm rounded-card'],
        lg: ['h-14 px-8 text-base rounded-card'],
        xl: ['h-16 px-10 text-base tracking-widest rounded-card-lg'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
