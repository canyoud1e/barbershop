'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MASTERS } from '@/lib/constants';
import { Master } from '@/lib/types';

/* ──────────────────────────────────────────── */
/*  Experience label helper                     */
/* ──────────────────────────────────────────── */
function expLabel(years: number) {
  if (years % 10 === 1 && years % 100 !== 11) return 'рік';
  if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) return 'роки';
  return 'років';
}

/* ──────────────────────────────────────────── */
/*  Master Card                                 */
/* ──────────────────────────────────────────── */
function MasterCard({ master, onClick }: { master: Master; onClick: () => void }) {
  return (
    <article
      className="group bg-bg-card border border-border rounded-card-lg overflow-hidden hover:border-border-light hover:shadow-card-hover transition-all duration-500 cursor-pointer"
      aria-label={`Майстер: ${master.name}`}
      onClick={onClick}
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-elevated">
        <Image
          src={master.imageUrl}
          alt={`Фото майстра ${master.name}`}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent"
          aria-hidden="true"
        />
        {/* Experience badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="default" size="sm">
            {master.experience} {expLabel(master.experience)}
          </Badge>
        </div>
        {/* "View profile" hint */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs tracking-widest uppercase text-text-muted bg-bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-pill border border-border">
            Переглянути профіль
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-lg font-medium text-text-primary">{master.name}</h3>
          <p className="text-sm text-text-muted mt-0.5">{master.role}</p>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed flex-1">{master.bio}</p>
        <div className="flex flex-wrap gap-2 mt-auto" aria-label="Спеціалізація">
          {master.specialization.map((spec) => (
            <Badge key={spec} variant="outline" size="sm">{spec}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────── */
/*  Master Drawer                               */
/* ──────────────────────────────────────────── */
function MasterDrawer({ master, onClose }: { master: Master; onClose: () => void }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const scrollToBooking = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in cursor-pointer touch-none"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Профіль майстра ${master.name}`}
        className="fixed right-0 top-0 h-[100dvh] w-full sm:max-w-md md:max-w-lg bg-bg-card border-l border-border z-50 flex flex-col shadow-2xl"
        style={{ animation: 'slideInRight 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Header - Fixed */}
        <div className="flex-none bg-bg-card/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between z-10 touch-none">
          <p className="text-xs tracking-[0.2em] uppercase text-text-muted">Профіль майстра</p>
          <button
            onClick={onClose}
            className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-all"
            aria-label="Закрити"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 pb-8" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Master identity */}
          <div className="flex gap-5 items-start">
            <div className="relative w-20 h-20 rounded-card-lg overflow-hidden bg-bg-elevated flex-shrink-0 border border-border">
              <Image
                src={master.imageUrl}
                alt={master.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div>
                <h2 className="text-xl font-medium text-text-primary">{master.name}</h2>
                <p className="text-sm text-text-muted">{master.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" size="sm">
                  {master.experience} {expLabel(master.experience)} досвіду
                </Badge>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-text-secondary mb-3">
              Про майстра
            </h3>
            <p className="text-text-secondary leading-relaxed">{master.bio}</p>
          </div>

          {/* Traits */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-text-secondary mb-3">
              Ключові навички
            </h3>
            <ul className="flex flex-col gap-2">
              {master.traits?.map((trait, i) => (
                <li key={i} className="flex items-center gap-3 text-text-secondary">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-accent flex-shrink-0">
                    <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm">{trait}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          {master.portfolio && master.portfolio.length > 0 && (
            <div className="mt-8 mb-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-text-secondary mb-3">
                Роботи
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {master.portfolio.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-card overflow-hidden bg-bg-elevated border border-border">
                    <Image
                      src={src}
                      alt={`Робота майстра ${master.name} №${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 33vw, 160px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer - Fixed */}
        <div className="flex-none border-t border-border p-4 sm:p-6 bg-bg-card/95 backdrop-blur-md">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            id={`drawer-book-${master.id}`}
            onClick={scrollToBooking}
          >
            Записатися до {master.name.split(' ')[0]}
          </Button>

          {/* Fallback close button for mobile */}
          <Button
            variant="outline"
            size="lg"
            className="w-full mt-2 sm:hidden text-text-secondary border-border hover:bg-bg-elevated"
            onClick={onClose}
          >
            Закрити профіль
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}

/* ──────────────────────────────────────────── */
/*  Section                                     */
/* ──────────────────────────────────────────── */
export function Masters() {
  const [selected, setSelected] = useState<Master | null>(null);

  return (
    <section
      id="masters"
      className="py-section-lg"
      aria-label="Наша команда"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          eyebrow="Команда"
          title="Наші майстри"
          subtitle="Кожен з нас пройшов навчання у найкращих у світі. Натисніть на майстра, щоб дізнатися більше."
          className="mb-12"
        />

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
          {MASTERS.map((master) => (
            <div key={master.id} className="min-w-[280px] w-[85vw] sm:w-auto sm:min-w-0 snap-center shrink-0">
              <MasterCard
                master={master}
                onClick={() => setSelected(master)}
              />
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <MasterDrawer
          master={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
