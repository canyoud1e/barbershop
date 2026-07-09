'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookingRequest } from '@/lib/types';
import { SERVICES, MASTERS, BARBERSHOP_NAME } from '@/lib/constants';
import { formatPhone, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'confirmed' | 'rejected'>('all');

  // Load bookings and auth state from storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('noir_admin_auth') === 'true') {
        setIsAuthenticated(true);
      }
      const stored = localStorage.getItem('noir_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    }
  }, []);

  // Handle password submit
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('noir_admin_auth', 'true');
    } else {
      setAuthError('Невірний пароль. Спробуйте "admin"');
    }
  };

  // Update booking status
  const updateStatus = (id: string, status: BookingRequest['status']) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    localStorage.setItem('noir_bookings', JSON.stringify(updated));
  };

  // Delete booking
  const deleteBooking = (id: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem('noir_bookings', JSON.stringify(updated));
    }
  };

  // Delete all bookings
  const deleteAllBookings = () => {
    if (window.confirm('Ви впевнені, що хочете видалити ВСІ записи? Цю дію неможливо скасувати.')) {
      setBookings([]);
      localStorage.setItem('noir_bookings', JSON.stringify([]));
    }
  };

  // Lookups
  const getServiceName = (id: string) => {
    const service = SERVICES.find((s) => s.id === id);
    return service ? service.name : 'Невідома послуга';
  };

  const getServicePrice = (id: string) => {
    const service = SERVICES.find((s) => s.id === id);
    return service ? formatPrice(service.price) : '';
  };

  const getMasterName = (id: string) => {
    const master = MASTERS.find((m) => m.id === id);
    return master ? master.name : 'Невідомий майстер';
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  // Login Form Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-bg-card border border-border rounded-card-lg p-8">
          <div className="text-center mb-8">
            <Link href="/" className="font-display text-3xl font-light tracking-[0.3em] text-text-primary">
              {BARBERSHOP_NAME}
            </Link>
            <p className="text-text-muted text-sm mt-2">Панель керування записами</p>
          </div>
          <form onSubmit={handleAuth} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="admin-password" className="text-sm font-medium text-text-secondary">
                Пароль адміністратора
              </label>
              <input
                id="admin-password"
                type="password"
                placeholder="Введіть admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-card bg-bg-elevated border border-border text-text-primary focus:outline-none focus:border-accent/60 placeholder:text-text-muted"
                required
              />
              {authError && <p className="text-xs text-red-400 mt-1">{authError}</p>}
            </div>
            <Button type="submit" variant="primary" className="w-full h-12 mt-2">
              Увійти
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-text-muted hover:text-text-primary transition-colors">
              ← На головну
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Screen
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* Admin Header */}
      <header className="bg-bg-surface border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl font-light tracking-[0.3em]">
              {BARBERSHOP_NAME}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-pill bg-white/10 text-text-secondary uppercase tracking-widest font-semibold">
              ADMIN
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => {
            setIsAuthenticated(false);
            sessionStorage.removeItem('noir_admin_auth');
          }}>
            Вийти
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Список бронювань</h1>
            <p className="text-text-muted text-sm mt-1">
              Керування замовленнями та записами клієнтів у Миколаєві
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={deleteAllBookings} className="text-red-400 border-red-900/50 hover:bg-red-900/20">
              Видалити всі
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm">
                Перейти на сайт →
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap border-b border-border pb-6 mb-6">
          {[
            { value: 'all', label: `Усі (${bookings.length})` },
            { value: 'new', label: `Нові (${bookings.filter((b) => b.status === 'new').length})` },
            { value: 'confirmed', label: `Підтверджені (${bookings.filter((b) => b.status === 'confirmed').length})` },
            { value: 'rejected', label: `Відхилені (${bookings.filter((b) => b.status === 'rejected').length})` },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value as any)}
              className={[
                'px-4 py-2 text-sm rounded-pill border transition-all',
                filter === btn.value
                  ? 'bg-accent text-bg border-accent font-medium'
                  : 'bg-transparent border-border text-text-secondary hover:border-border-light hover:text-text-primary',
              ].join(' ')}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Bookings Table / Cards */}
        {filteredBookings.length === 0 ? (
          <div className="bg-bg-card border border-border rounded-card p-12 text-center">
            <p className="text-text-muted">Записи не знайдені</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className={[
                  'bg-bg-card border rounded-card p-6 flex flex-col md:flex-row justify-between gap-6 transition-colors',
                  booking.status === 'new'
                    ? 'border-border-light shadow-glow'
                    : 'border-border',
                ].join(' ')}
              >
                {/* Info block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                  {/* Client Info */}
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Клієнт</span>
                    <p className="font-semibold text-text-primary">{booking.name}</p>
                    <a
                      href={`tel:${booking.phone}`}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors block mt-0.5"
                    >
                      {formatPhone(booking.phone)}
                    </a>
                  </div>

                  {/* Booking details */}
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Дата та Час</span>
                    <p className="font-medium text-text-primary">{booking.date}</p>
                    <p className="text-sm text-text-secondary mt-0.5">{booking.time}</p>
                  </div>

                  {/* Service */}
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Послуга</span>
                    <p className="font-medium text-text-primary line-clamp-1">{getServiceName(booking.serviceId)}</p>
                    <p className="text-sm text-accent mt-0.5">{getServicePrice(booking.serviceId)}</p>
                  </div>

                  {/* Master */}
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Майстер</span>
                    <p className="font-medium text-text-primary">{getMasterName(booking.masterId)}</p>
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-pill bg-bg-elevated border border-border mt-1 font-medium text-text-muted">
                      {booking.id}
                    </span>
                  </div>
                </div>

                {/* Actions & Status */}
                <div className="flex flex-row md:flex-col items-end justify-between md:justify-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-border">
                  {/* Status Badge */}
                  <div>
                    {booking.status === 'new' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-semibold bg-white/5 border border-white/10 text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Новий
                      </span>
                    )}
                    {booking.status === 'confirmed' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-semibold bg-green-500/10 border border-green-500/20 text-green-400">
                        Підтверджено
                      </span>
                    )}
                    {booking.status === 'rejected' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
                        Відхилено
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {booking.status === 'new' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStatus(booking.id, 'confirmed')}
                          className="h-8 text-xs border-green-800 hover:border-green-600 hover:text-green-400"
                        >
                          Підтвердити
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateStatus(booking.id, 'rejected')}
                          className="h-8 text-xs text-red-400 hover:text-red-300"
                        >
                          Відхилити
                        </Button>
                      </>
                    )}
                    {booking.status !== 'new' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateStatus(booking.id, 'new')}
                        className="h-8 text-xs text-text-muted hover:text-text-primary"
                      >
                        В нові
                      </Button>
                    )}
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="p-2 text-text-muted hover:text-red-400 transition-colors"
                      aria-label="Видалити запис"
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
