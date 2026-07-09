'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_ITEMS, BARBERSHOP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function Header() {
  const scrollY = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isScrolled = scrollY > 60;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500',
          isScrolled
            ? 'bg-bg/95 backdrop-blur-xl border-b border-border'
            : 'bg-transparent',
        ].join(' ')}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between"
          aria-label="Основна навігація"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl font-light tracking-[0.3em] text-text-primary hover:text-accent transition-colors duration-300"
            aria-label={`${BARBERSHOP_NAME} — повернутися на головну`}
          >
            {BARBERSHOP_NAME}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 list-none" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-text-secondary hover:text-text-primary link-underline transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Записатися на стрижку"
            >
              Записатися
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
            aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={[
                'w-6 h-px bg-text-primary transition-all duration-300',
                isMenuOpen ? 'rotate-45 translate-y-2' : '',
              ].join(' ')}
            />
            <span
              className={[
                'w-6 h-px bg-text-primary transition-all duration-300',
                isMenuOpen ? 'opacity-0 scale-x-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'w-6 h-px bg-text-primary transition-all duration-300',
                isMenuOpen ? '-rotate-45 -translate-y-2' : '',
              ].join(' ')}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        className={[
          'fixed top-20 left-0 right-0 z-40 md:hidden',
          'bg-bg/98 backdrop-blur-xl border-b border-border',
          'transition-all duration-300',
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none',
        ].join(' ')}
        aria-hidden={!isMenuOpen}
      >
        <nav className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
          <ul className="flex flex-col gap-4 list-none" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              closeMenu();
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="self-start"
          >
            Записатися
          </Button>
        </nav>
      </div>
    </>
  );
}
