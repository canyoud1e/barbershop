// ============================================================
// UTILS — formatting and validation helpers
// ============================================================

import { BookingFormData, BookingFormErrors } from './types';

/** Format price in Hryvnia (UAH) notation */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
  }).format(amount);
}

/** Format duration in minutes to human-readable string */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} мин`;
  }
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) {
    return `${hours} ч`;
  }
  return `${hours} ч ${remaining} мин`;
}

/** Format phone number to display format: +380 (99) 123-45-67 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('380')) {
    return `+380 (${digits.slice(3, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
  }
  if (digits.length === 10 && digits.startsWith('0')) {
    return `+380 (${digits.slice(1, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`;
  }
  return phone;
}

/** Sanitise phone input: allow only digits, + and spaces */
export function sanitisePhoneInput(value: string): string {
  return value.replace(/[^\d+\s\-()]/g, '');
}

/** Validate a phone number — must be 12 digits (with 380) or 10 digits (with 0) */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return (
    (digits.length === 12 && digits.startsWith('380')) ||
    (digits.length === 10 && digits.startsWith('0'))
  );
}

/** Validate a name — at least 2 characters, only letters, no gibberish */
export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 40) return false;
  
  // basic character check (letters, spaces, hyphens)
  if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s\-]+$/.test(trimmed)) return false;
  
  const words = trimmed.split(/[\s\-]+/);
  for (const word of words) {
    if (word.length === 0) continue;
    // Single word shouldn't be suspiciously long (e.g., max 15 chars for a name part)
    if (word.length > 15) return false;
    // No 3 identical consecutive characters
    if (/(.)\1{2,}/i.test(word)) return false;
    // Must contain at least one vowel per word
    if (!/[аеєиіїоуюяaeiouy]/i.test(word)) return false;
    // Block 4 or more consecutive consonants (prevents most keyboard mashes)
    if (/[бвгґджзйклмнпрстфхцчшщbcdfghjklmnpqrstvwxz]{4,}/i.test(word)) return false;
    // Block 4 or more consecutive vowels
    if (/[аеєиіїоуюяaeiouy]{4,}/i.test(word)) return false;
  }
  
  return true;
}

/** Validate ISO date string is today or in the future */
export function isValidFutureDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !isNaN(date.getTime()) && date >= today;
}

/** Validate time string in HH:MM format within working hours 09:00–21:00 */
export function isValidWorkingTime(time: string): boolean {
  if (!time) return false;
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return false;
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  if (minutes !== 0 && minutes !== 30) return false;
  return hours >= 9 && hours < 21;
}

/** Validate the full booking form and return field-level errors */
export function validateBookingForm(data: BookingFormData): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (!isValidName(data.name)) {
    errors.name = 'Введите корректное имя (минимум 2 символа)';
  }

  if (!isValidPhone(data.phone)) {
    errors.phone = 'Введите корректный номер телефона (например, +380991234567)';
  }

  if (!data.serviceId) {
    errors.serviceId = 'Выберите услугу';
  }

  if (!data.masterId) {
    errors.masterId = 'Выберите мастера';
  }

  if (!isValidFutureDate(data.date)) {
    errors.date = 'Выберите дату (сегодня или позже)';
  }

  if (!isValidWorkingTime(data.time)) {
    errors.time = 'Выберите время в рабочие часы (09:00–21:00, каждые 30 мин)';
  }

  return errors;
}

/** Get today's date in YYYY-MM-DD format for min attribute on date inputs */
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Generate an array of time slots between start and end hours (30-min intervals) */
export function generateTimeSlots(startHour: number, endHour: number): string[] {
  const slots: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}

/** Truncate text to a max length and append ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}
