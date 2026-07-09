import {
  formatPrice,
  formatDuration,
  formatPhone,
  sanitisePhoneInput,
  isValidPhone,
  isValidName,
  isValidFutureDate,
  isValidWorkingTime,
  validateBookingForm,
  getTodayDateString,
  clamp,
  generateTimeSlots,
  truncate,
} from '@/lib/utils';
import { BookingFormData } from '@/lib/types';

// ============================================================
// formatPrice
// ============================================================
describe('formatPrice', () => {
  it('formats zero as 0 ₴', () => {
    expect(formatPrice(0)).toMatch(/0/);
    expect(formatPrice(0)).toMatch(/₴/);
  });

  it('formats 1800 with thousands separator', () => {
    const result = formatPrice(1800);
    expect(result).toMatch(/1\s?800/);
    expect(result).toMatch(/₴/);
  });

  it('formats large number correctly', () => {
    const result = formatPrice(35000);
    expect(result).toMatch(/35\s?000/);
  });

  it('handles negative values', () => {
    const result = formatPrice(-100);
    expect(result).toMatch(/-/);
  });
});

// ============================================================
// formatDuration
// ============================================================
describe('formatDuration', () => {
  it('returns minutes for less than 60', () => {
    expect(formatDuration(30)).toBe('30 мин');
    expect(formatDuration(45)).toBe('45 мин');
    expect(formatDuration(59)).toBe('59 мин');
  });

  it('returns hours for exact multiples', () => {
    expect(formatDuration(60)).toBe('1 ч');
    expect(formatDuration(120)).toBe('2 ч');
  });

  it('returns hours and minutes for mixed', () => {
    expect(formatDuration(75)).toBe('1 ч 15 мин');
    expect(formatDuration(100)).toBe('1 ч 40 мин');
    expect(formatDuration(150)).toBe('2 ч 30 мин');
  });

  it('handles 0 minutes', () => {
    expect(formatDuration(0)).toBe('0 мин');
  });
});

// ============================================================
// formatPhone
// ============================================================
describe('formatPhone', () => {
  it('formats 12-digit Ukrainian phone starting with 380 correctly', () => {
    expect(formatPhone('380991234567')).toBe('+380 (99) 123-45-67');
  });

  it('formats 10-digit Ukrainian phone starting with 0 correctly', () => {
    expect(formatPhone('0991234567')).toBe('+380 (99) 123-45-67');
  });

  it('returns raw value if digits count is not valid', () => {
    expect(formatPhone('123')).toBe('123');
    expect(formatPhone('3809912345')).toBe('3809912345');
  });

  it('strips non-digit characters before formatting', () => {
    expect(formatPhone('+380 (99) 123-45-67')).toBe('+380 (99) 123-45-67');
  });
});

// ============================================================
// sanitisePhoneInput
// ============================================================
describe('sanitisePhoneInput', () => {
  it('allows digits, +, spaces, hyphens, parentheses', () => {
    expect(sanitisePhoneInput('+380 (99) 123-45-67')).toBe('+380 (99) 123-45-67');
  });

  it('removes letters and special chars', () => {
    expect(sanitisePhoneInput('abc+3809!@')).toBe('+3809');
  });

  it('returns empty string for fully invalid input', () => {
    expect(sanitisePhoneInput('abcdef')).toBe('');
  });
});

// ============================================================
// isValidPhone
// ============================================================
describe('isValidPhone', () => {
  it('accepts valid 12-digit numbers starting with 380', () => {
    expect(isValidPhone('380991234567')).toBe(true);
    expect(isValidPhone('+380 (99) 123-45-67')).toBe(true);
  });

  it('accepts valid 10-digit numbers starting with 0', () => {
    expect(isValidPhone('0991234567')).toBe(true);
    expect(isValidPhone('099 123 45 67')).toBe(true);
  });

  it('rejects numbers with wrong digit count', () => {
    expect(isValidPhone('3809912345')).toBe(false);
    expect(isValidPhone('3809912345678')).toBe(false);
  });

  it('rejects numbers starting with other digits', () => {
    expect(isValidPhone('19991234567')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidPhone('')).toBe(false);
  });
});

// ============================================================
// isValidName
// ============================================================
describe('isValidName', () => {
  it('accepts valid Latin and Cyrillic names', () => {
    expect(isValidName('Іван')).toBe(true);
    expect(isValidName('Ivan')).toBe(true);
    expect(isValidName('Олександр Коваль')).toBe(true);
    expect(isValidName('Jean-Pierre')).toBe(true);
  });

  it('rejects single character', () => {
    expect(isValidName('І')).toBe(false);
  });

  it('rejects names with digits or special chars', () => {
    expect(isValidName('Ivan123')).toBe(false);
    expect(isValidName('Ivan!')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidName('')).toBe(false);
  });

  it('trims whitespace before validation', () => {
    expect(isValidName('  Ів  ')).toBe(true);
  });
});

// ============================================================
// isValidFutureDate
// ============================================================
describe('isValidFutureDate', () => {
  it('accepts today', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(isValidFutureDate(today)).toBe(true);
  });

  it('accepts future date', () => {
    const future = new Date(Date.now() + 86400_000).toISOString().split('T')[0];
    expect(isValidFutureDate(future)).toBe(true);
  });

  it('rejects past date', () => {
    expect(isValidFutureDate('2000-01-01')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidFutureDate('')).toBe(false);
  });

  it('rejects invalid date string', () => {
    expect(isValidFutureDate('not-a-date')).toBe(false);
  });
});

// ============================================================
// isValidWorkingTime
// ============================================================
describe('isValidWorkingTime', () => {
  it('accepts on-the-hour slots within working hours', () => {
    expect(isValidWorkingTime('09:00')).toBe(true);
    expect(isValidWorkingTime('20:00')).toBe(true);
    expect(isValidWorkingTime('12:30')).toBe(true);
  });

  it('rejects slots outside working hours', () => {
    expect(isValidWorkingTime('08:00')).toBe(false);
    expect(isValidWorkingTime('21:00')).toBe(false);
    expect(isValidWorkingTime('21:30')).toBe(false);
  });

  it('rejects non-half-hour minutes', () => {
    expect(isValidWorkingTime('09:15')).toBe(false);
    expect(isValidWorkingTime('10:45')).toBe(false);
  });

  it('rejects invalid formats', () => {
    expect(isValidWorkingTime('')).toBe(false);
    expect(isValidWorkingTime('9:00')).toBe(false);
    expect(isValidWorkingTime('abc')).toBe(false);
  });
});

// ============================================================
// validateBookingForm
// ============================================================
describe('validateBookingForm', () => {
  const validData: BookingFormData = {
    name: 'Іван',
    phone: '380991234567',
    serviceId: 'haircut-classic',
    masterId: 'master-1',
    date: new Date(Date.now() + 86400_000).toISOString().split('T')[0],
    time: '10:00',
  };

  it('returns no errors for valid data', () => {
    const errors = validateBookingForm(validData);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('returns name error for invalid name', () => {
    const errors = validateBookingForm({ ...validData, name: 'A' });
    expect(errors.name).toBeDefined();
    expect(errors.phone).toBeUndefined();
  });

  it('returns phone error for invalid phone', () => {
    const errors = validateBookingForm({ ...validData, phone: '123' });
    expect(errors.phone).toBeDefined();
  });

  it('returns serviceId error when empty', () => {
    const errors = validateBookingForm({ ...validData, serviceId: '' });
    expect(errors.serviceId).toBeDefined();
  });

  it('returns masterId error when empty', () => {
    const errors = validateBookingForm({ ...validData, masterId: '' });
    expect(errors.masterId).toBeDefined();
  });

  it('returns date error for past date', () => {
    const errors = validateBookingForm({ ...validData, date: '2000-01-01' });
    expect(errors.date).toBeDefined();
  });

  it('returns time error for invalid time', () => {
    const errors = validateBookingForm({ ...validData, time: '08:00' });
    expect(errors.time).toBeDefined();
  });

  it('accumulates multiple errors', () => {
    const emptyData: BookingFormData = {
      name: '',
      phone: '',
      serviceId: '',
      masterId: '',
      date: '',
      time: '',
    };
    const errors = validateBookingForm(emptyData);
    expect(Object.keys(errors).length).toBeGreaterThanOrEqual(4);
  });
});

// ============================================================
// getTodayDateString
// ============================================================
describe('getTodayDateString', () => {
  it('returns a date in YYYY-MM-DD format', () => {
    const result = getTodayDateString();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('matches today date', () => {
    const now = new Date();
    const result = getTodayDateString();
    expect(result).toBe(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    );
  });
});

// ============================================================
// clamp
// ============================================================
describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('clamps to min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('clamps to max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

// ============================================================
// generateTimeSlots
// ============================================================
describe('generateTimeSlots', () => {
  it('generates correct slots from 9 to 21', () => {
    const slots = generateTimeSlots(9, 21);
    expect(slots).toContain('09:00');
    expect(slots).toContain('09:30');
    expect(slots).toContain('20:00');
    expect(slots).toContain('20:30');
    expect(slots).not.toContain('21:00');
  });

  it('generates 2 slots per hour', () => {
    const slots = generateTimeSlots(9, 21);
    expect(slots).toHaveLength(24); // 12 hours × 2
  });

  it('returns empty array for same start and end', () => {
    expect(generateTimeSlots(9, 9)).toHaveLength(0);
  });

  it('pads hours to 2 digits', () => {
    const slots = generateTimeSlots(9, 10);
    expect(slots[0]).toBe('09:00');
    expect(slots[1]).toBe('09:30');
  });
});

// ============================================================
// truncate
// ============================================================
describe('truncate', () => {
  it('does not modify short strings', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('truncates and appends ellipsis', () => {
    const result = truncate('Hello World', 5);
    expect(result).toBe('Hello…');
    expect(result.length).toBe(6);
  });

  it('handles empty string', () => {
    expect(truncate('', 10)).toBe('');
  });
});
