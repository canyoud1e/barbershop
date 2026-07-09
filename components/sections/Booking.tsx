'use client';

import { useRef } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { SERVICES, MASTERS } from '@/lib/constants';
import { useBookingForm } from '@/hooks/useBookingForm';
import { generateTimeSlots, getTodayDateString, formatPrice } from '@/lib/utils';

const TIME_SLOTS = generateTimeSlots(9, 21);

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ label, id, error, required, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-text-secondary"
      >
        {label}
        {required && (
          <span className="text-text-muted ml-1" aria-hidden="true">*</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = [
  'w-full h-12 px-4 rounded-card',
  'bg-bg-elevated border border-border',
  'text-text-primary text-sm',
  'placeholder:text-text-muted',
  'transition-all duration-200',
  'focus:outline-none focus:border-accent/60 focus:bg-bg-card',
  'hover:border-border-light',
].join(' ');

const selectClass = [
  inputClass,
  'appearance-none cursor-pointer',
].join(' ');

export function Booking() {
  const { formData, errors, status, handleChange, handleSubmit, reset, isValid } = useBookingForm();
  const today = getTodayDateString();
  const dateInputRef = useRef<HTMLInputElement>(null);

  return (
    <section
      id="booking"
      className="py-section-lg"
      aria-label="Онлайн-запис"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: title + info */}
          <div className="flex flex-col gap-8">
            <SectionTitle
              eyebrow="Запис"
              title="Запишіться онлайн"
              subtitle="Оберіть зручний час, майстра та послугу — ми підтвердимо запис протягом 15 хвилин."
            />

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                      <path d="M12 7v5l3 3" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                  title: 'Швидке підтвердження',
                  desc: 'Протягом 15 хвилин після запису.',
                },
                {
                  icon: (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M9 12l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                    </svg>
                  ),
                  title: 'Без передоплати',
                  desc: 'Запишіться безкоштовно, скасувати можна за 2 години.',
                },
                {
                  icon: (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: 'Вибір майстра',
                  desc: 'Запишіться до конкретного барбера.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-card bg-bg-elevated border border-border flex items-center justify-center flex-shrink-0 text-text-secondary">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-text-primary">{item.title}</p>
                    <p className="text-sm text-text-muted mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-bg-card border border-border rounded-card-lg p-4 sm:p-6 lg:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-text-primary">
                    <path d="M5 13l4 4L19 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-text-primary mb-2">Запис прийнято!</h3>
                  <p className="text-text-secondary text-sm">
                    Ми зв’яжемося з вами найближчим часом для підтвердження.
                  </p>
                </div>
                <Button variant="outline" size="md" onClick={reset}>
                  Записатися ще раз
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                className="flex flex-col gap-5"
                aria-label="Форма запису на стрижку"
                noValidate
              >
                <h3 className="text-lg font-medium text-text-primary mb-1">Заповніть форму</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <FormField label="Ваше ім’я" id="booking-name" error={errors.name} required>
                    <input
                      id="booking-name"
                      type="text"
                      className={inputClass}
                      placeholder="Іван Іванов"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'booking-name-error' : undefined}
                    />
                  </FormField>

                  {/* Phone */}
                  <FormField label="Телефон" id="booking-phone" error={errors.phone} required>
                    <input
                      id="booking-phone"
                      type="tel"
                      className={inputClass}
                      placeholder="+380 (99) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        const prevVal = formData.phone;

                        let newDigits = newVal.replace(/\D/g, '');
                        const prevDigits = prevVal.replace(/\D/g, '');

                        // Backspace through a separator: same digit count but shorter string
                        // → remove the last digit from previous value
                        if (newDigits.length === prevDigits.length && newVal.length < prevVal.length) {
                          newDigits = prevDigits.slice(0, -1);
                        }

                        // Reset to prefix if fewer than 4 digits (380 + nothing)
                        if (newDigits.length <= 3) {
                          handleChange('phone', '+380');
                          return;
                        }

                        // Normalise prefix
                        let digits = newDigits;
                        if (digits.startsWith('0')) {
                          digits = '380' + digits.slice(1);
                        } else if (digits.startsWith('80')) {
                          digits = '38' + digits;
                        } else if (!digits.startsWith('380')) {
                          digits = '380' + digits;
                        }

                        // Limit to 12 digits
                        digits = digits.slice(0, 12);

                        // Format: +380 (XX) XXX-XX-XX
                        let formatted = '+380';
                        if (digits.length > 3) formatted += ` (${digits.slice(3, 5)}`;
                        if (digits.length >= 5) formatted += ')';
                        if (digits.length > 5) formatted += ` ${digits.slice(5, 8)}`;
                        if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`;
                        if (digits.length > 10) formatted += `-${digits.slice(10, 12)}`;

                        handleChange('phone', formatted);
                      }}
                      autoComplete="tel"
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                    />
                  </FormField>
                </div>

                {/* Service */}
                <FormField label="Послуга" id="booking-service" error={errors.serviceId} required>
                  <div className="relative">
                    <select
                      id="booking-service"
                      className={selectClass}
                      value={formData.serviceId}
                      onChange={(e) => handleChange('serviceId', e.target.value)}
                      aria-required="true"
                      aria-invalid={!!errors.serviceId}
                    >
                      <option value="">Оберіть послугу</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {formatPrice(s.price)}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                      width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 9l-7 7-7-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </FormField>

                {/* Master */}
                <FormField label="Майстер" id="booking-master" error={errors.masterId} required>
                  <div className="relative">
                    <select
                      id="booking-master"
                      className={selectClass}
                      value={formData.masterId}
                      onChange={(e) => handleChange('masterId', e.target.value)}
                      aria-required="true"
                      aria-invalid={!!errors.masterId}
                    >
                      <option value="">Оберіть майстра</option>
                      {MASTERS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} — {m.role}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                      width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 9l-7 7-7-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Date */}
                  <FormField label="Дата" id="booking-date" error={errors.date} required>
                    <div className="relative">
                      {/* Visually hidden native date input — triggered via ref */}
                      <input
                        ref={dateInputRef}
                        id="booking-date"
                        type="date"
                        className="sr-only"
                        value={formData.date}
                        min={today}
                        onChange={(e) => handleChange('date', e.target.value)}
                        aria-required="true"
                        aria-invalid={!!errors.date}
                        tabIndex={-1}
                      />
                      {/* Styled button — full click area */}
                      <button
                        type="button"
                        className={`${inputClass} flex items-center justify-between w-full`}
                        onClick={() => {
                          try {
                            dateInputRef.current?.showPicker();
                          } catch {
                            dateInputRef.current?.focus();
                          }
                        }}
                        aria-label="Оберіть дату"
                      >
                        <span className={formData.date ? 'text-text-primary' : 'text-text-muted'}>
                          {formData.date
                            ? new Date(formData.date).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })
                            : 'дд.мм.рррр'}
                        </span>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-text-muted flex-shrink-0" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" />
                          <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </FormField>

                  {/* Time */}
                  <FormField label="Час" id="booking-time" error={errors.time} required>
                    <div className="relative">
                      <select
                        id="booking-time"
                        className={selectClass}
                        value={formData.time}
                        onChange={(e) => handleChange('time', e.target.value)}
                        aria-required="true"
                        aria-invalid={!!errors.time}
                      >
                        <option value="">Оберіть час</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                        width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M19 9l-7 7-7-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </FormField>
                </div>

                {/* Submit */}
                {status === 'error' && (
                  <p className="text-sm text-red-400 text-center" role="alert">
                    Виникла помилка. Будь ласка, спробуйте ще раз.
                  </p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  id="booking-submit"
                  isLoading={status === 'loading'}
                  className="mt-2 w-full"
                  aria-label="Надіслати заявку на запис"
                >
                  {status === 'loading' ? 'Надсилаємо...' : 'Записатися'}
                </Button>

                <p className="text-xs text-text-muted text-center">
                  Натискаючи «Записатися», ви погоджуєтеся з обробкою персональних даних
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
