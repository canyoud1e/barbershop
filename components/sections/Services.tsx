'use client';

import { useState } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SERVICES, SERVICE_CATEGORY_LABELS } from '@/lib/constants';
import { formatPrice, formatDuration } from '@/lib/utils';
import { Service, ServiceCategory } from '@/lib/types';

const CATEGORIES: Array<{ value: ServiceCategory | 'all'; label: string }> = [
  { value: 'all', label: 'Усі' },
  { value: 'haircut', label: SERVICE_CATEGORY_LABELS.haircut },
  { value: 'beard', label: SERVICE_CATEGORY_LABELS.beard },
  { value: 'combo', label: SERVICE_CATEGORY_LABELS.combo },
  { value: 'care', label: SERVICE_CATEGORY_LABELS.care },
];

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <article
      className="group relative bg-bg-card border border-border rounded-card p-6 flex flex-col gap-4 h-full hover:border-border-light hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
      aria-label={`Послуга: ${service.name}`}
    >
      {/* Category badge */}
      <Badge variant="default" size="sm" className="self-start">
        {SERVICE_CATEGORY_LABELS[service.category]}
      </Badge>

      {/* Name & description */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-medium text-text-primary">{service.name}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{service.description}</p>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-1.5 text-text-muted text-sm">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {formatDuration(service.duration)}
      </div>

      {/* Price & CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="font-sans text-xl font-semibold tabular-nums tracking-tight text-text-primary">
          {formatPrice(service.price)}
        </span>
        <Button
          variant="outline"
          size="sm"
          id={`service-book-${service.id}`}
          onClick={() => onBook(service.id)}
          aria-label={`Записатися на ${service.name}`}
        >
          Записатися
        </Button>
      </div>
    </article>
  );
}

export function Services() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

  const filtered =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  const handleBook = (serviceId: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('select-service', { detail: serviceId }));
    }
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="py-section-lg"
      aria-label="Послуги барбершопа"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionTitle
            eyebrow="Послуги"
            title="Що ми робимо"
            subtitle="Від класичної стрижки до повного догляду — кожна процедура виконується з увагою до деталей."
          />

          {/* Category filter */}
          <div
            className="flex gap-2 flex-wrap sm:flex-nowrap overflow-x-auto pb-1 scrollbar-none"
            role="group"
            aria-label="Фільтр за категоріями"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                id={`filter-${cat.value}`}
                onClick={() => setActiveCategory(cat.value)}
                className={[
                  'px-4 py-2 text-sm rounded-pill border transition-all duration-200',
                  activeCategory === cat.value
                    ? 'bg-accent text-bg border-accent'
                    : 'bg-transparent border-border text-text-secondary hover:border-border-light hover:text-text-primary',
                ].join(' ')}
                aria-pressed={activeCategory === cat.value}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0"
          role="list"
          aria-label="Список послуг"
        >
          {filtered.map((service) => (
            <div key={service.id} role="listitem" className="h-full min-w-[280px] w-[85vw] sm:w-auto sm:min-w-0 snap-center shrink-0">
              <ServiceCard service={service} onBook={handleBook} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
