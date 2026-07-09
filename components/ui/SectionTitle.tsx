interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionTitleProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-display-md text-text-primary font-light text-balance leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary max-w-xl leading-relaxed mt-1">{subtitle}</p>
      )}
    </div>
  );
}
