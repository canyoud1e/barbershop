'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { GALLERY_ITEMS } from '@/lib/constants';
import { GalleryItem } from '@/lib/types';

const GALLERY_CATEGORIES: Array<{ value: GalleryItem['category'] | 'all'; label: string }> = [
  { value: 'all', label: 'Усі роботи' },
  { value: 'haircut', label: 'Стрижки' },
  { value: 'beard', label: 'Борода' },
  { value: 'style', label: 'Стиль' },
];

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Перегляд: ${item.alt}`}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
        onClick={onClose}
        aria-label="Закрити перегляд"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M18 6L6 18M6 6l12 12" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-3"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Попереднє зображення"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M15 18l-6-6 6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative w-full max-w-3xl aspect-square mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.imageUrl}
          alt={item.alt}
          fill
          className="object-cover rounded-card"
          sizes="(max-width: 1024px) 90vw, 800px"
          priority
        />
        <p className="absolute bottom-4 left-4 right-4 text-center text-sm text-white/80 bg-black/40 backdrop-blur-sm rounded-pill py-2">
          {item.alt}
        </p>
      </div>

      {/* Next */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-3"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Наступне зображення"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 18l6-6-6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryItem['category'] | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null)),
    [filtered.length]
  );
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null)),
    [filtered.length]
  );

  return (
    <section
      id="gallery"
      className="py-section-lg"
      aria-label="Галерея наших робіт"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionTitle
            eyebrow="Галерея"
            title="Наші роботи"
            subtitle="Кожен знімок — результат уваги до деталей та пристрасті до майстерності."
          />

          {/* Filter */}
          <div className="flex gap-2 flex-wrap" role="group" aria-label="Фільтр галереї">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                id={`gallery-filter-${cat.value}`}
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

        {/* Masonry-like grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          role="list"
          aria-label="Фотографии работ"
        >
          {filtered.map((item, index) => (
            <button
              key={item.id}
              role="listitem"
              className="group relative aspect-square overflow-hidden rounded-card bg-bg-elevated cursor-pointer"
              onClick={() => openLightbox(index)}
              aria-label={`Открыть фото: ${item.alt}`}
            >
              <Image
                src={item.imageUrl}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"
                aria-hidden="true"
              />
              {/* Expand icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" aria-hidden="true">
                    <path d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          item={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
