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
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
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
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-medium text-text-primary">{master.name}</h3>
          <p className="text-sm text-text-muted mt-0.5">{master.role}</p>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{master.bio}</p>
        <div className="flex flex-wrap gap-2" aria-label="Спеціалізація">
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
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Профіль майстра ${master.name}`}
        className="fixed right-0 top-0 h-full w-full sm:max-w-md md:max-w-lg bg-bg-card border-l border-border z-50 overflow-y-auto flex flex-col"
        style={{ animation: 'slideInRight 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-bg-card/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <p className="text-xs tracking-[0.2em] uppercase text-text-muted">Профіль майстра</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-card border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-light transition-all"
            aria-label="Закрити"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 pb-10">
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
          <div>
            <p className="text-xs tracking-widest uppercase text-text-muted mb-3">Про майстра</p>
            <p className="text-sm text-text-secondary leading-relaxed">{master.bio}</p>
          </div>

          {/* Traits */}
          {master.traits && master.traits.length > 0 && (
            <div>
              <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Особливості</p>
              <div className="flex flex-col gap-3">
                {master.traits.map((trait, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-border-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{trait}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specialization */}
          <div>
            <p className="text-xs tracking-widest uppercase text-text-muted mb-3">Спеціалізація</p>
            <div className="flex flex-wrap gap-2">
              {master.specialization.map((spec) => (
                <Badge key={spec} variant="outline" size="sm">{spec}</Badge>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          {master.portfolio && master.portfolio.length > 0 && (
            <div>
              <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Роботи</p>
              <div className="grid grid-cols-3 gap-3">
                {master.portfolio.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-card overflow-hidden bg-bg-elevated border border-border"
                  >
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

          {/* CTA */}
          <Button
            variant="primary"
            size="lg"
            className="w-full mt-2"
            id={`drawer-book-${master.id}`}
            onClick={scrollToBooking}
          >
            Записатися до {master.name.split(' ')[0]}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MASTERS.map((master) => (
            <MasterCard
              key={master.id}
              master={master}
              onClick={() => setSelected(master)}
            />
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
