'use client';

import { Button } from '@/components/ui/Button';
import { BARBERSHOP_NAME, BARBERSHOP_TAGLINE } from '@/lib/constants';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-4"
      aria-label="Головний екран"
    >
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 sm:gap-8">
        {/* Eyebrow */}
        <div className="animate-fade-in delay-100 opacity-0">
          <span className="inline-flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-text-muted">
            <span className="w-6 sm:w-8 h-px bg-text-muted inline-block" aria-hidden="true" />
            Барбершоп · Миколаїв
            <span className="w-6 sm:w-8 h-px bg-text-muted inline-block" aria-hidden="true" />
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-light text-text-primary tracking-[-0.02em] text-balance leading-none animate-fade-up delay-200 opacity-0"
          aria-label={`${BARBERSHOP_NAME} — ${BARBERSHOP_TAGLINE}`}
        >
          {BARBERSHOP_NAME}
        </h1>

        {/* Tagline */}
        <p className="font-display text-xl sm:text-2xl md:text-3xl font-light italic text-text-secondary tracking-wide animate-fade-up delay-300 opacity-0">
          {BARBERSHOP_TAGLINE}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-text-secondary max-w-sm sm:max-w-lg leading-relaxed animate-fade-up delay-400 opacity-0 px-2">
          Ми створюємо не просто стрижки — ми створюємо образи.
          Кожна деталь продумана, кожен візит незабутній.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-4 w-full sm:w-auto animate-fade-up delay-500 opacity-0">
          <Button
            variant="primary"
            size="xl"
            id="hero-cta-book"
            onClick={() =>
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
            }
            aria-label="Записатися на стрижку онлайн"
            className="w-full sm:w-auto"
          >
            Записатися
          </Button>
          <Button
            variant="outline"
            size="xl"
            id="hero-cta-services"
            onClick={() =>
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="w-full sm:w-auto"
          >
            Наші послуги
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16 animate-fade-up delay-700 opacity-0 w-full max-w-xs sm:max-w-none">
          {[
            { value: '12+', label: 'Років досвіду' },
            { value: '4 000+', label: 'Клієнтів' },
            { value: '4', label: 'Майстри' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-text-primary">
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-xs tracking-wide text-text-muted uppercase text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — hide on very small screens */}
      <div
        className="hidden sm:flex absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-fade-in delay-700 opacity-0"
        aria-hidden="true"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-text-muted">Прокрутити</span>
        <div className="w-px h-12 bg-gradient-to-b from-text-muted to-transparent" />
      </div>
    </section>
  );
}
