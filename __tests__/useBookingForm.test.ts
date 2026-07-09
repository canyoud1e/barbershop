import { renderHook, act } from '@testing-library/react';
import { useBookingForm } from '@/hooks/useBookingForm';

// Mock the 1.5s timeout in handleSubmit for speed
jest.useFakeTimers();

const VALID_FORM = {
  name: 'Иван',
  phone: '380991234567',
  serviceId: 'haircut-classic',
  masterId: 'master-1',
  date: new Date(Date.now() + 86400_000).toISOString().split('T')[0],
  time: '10:00',
};

describe('useBookingForm', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('initial state', () => {
    it('initialises with empty form data', () => {
      const { result } = renderHook(() => useBookingForm());
      expect(result.current.formData.name).toBe('');
      expect(result.current.formData.phone).toBe('');
      expect(result.current.formData.serviceId).toBe('');
      expect(result.current.formData.masterId).toBe('');
      expect(result.current.formData.date).toBe('');
      expect(result.current.formData.time).toBe('');
    });

    it('initialises with no errors', () => {
      const { result } = renderHook(() => useBookingForm());
      expect(result.current.errors).toEqual({});
    });

    it('initialises with idle status', () => {
      const { result } = renderHook(() => useBookingForm());
      expect(result.current.status).toBe('idle');
    });

    it('initialises with isValid = false (empty form is invalid)', () => {
      const { result } = renderHook(() => useBookingForm());
      expect(result.current.isValid).toBe(false);
    });
  });

  describe('handleChange', () => {
    it('updates a field value', () => {
      const { result } = renderHook(() => useBookingForm());
      act(() => {
        result.current.handleChange('name', 'Иван');
      });
      expect(result.current.formData.name).toBe('Иван');
    });

    it('clears the error for the changed field', () => {
      const { result } = renderHook(() => useBookingForm());

      // Trigger validation error first
      act(() => {
        result.current.handleSubmit();
      });

      // Then correct the field
      act(() => {
        result.current.handleChange('name', 'Иван');
      });

      expect(result.current.errors.name).toBeUndefined();
    });

    it('does not clear errors for other fields', () => {
      const { result } = renderHook(() => useBookingForm());

      act(() => {
        result.current.handleSubmit();
      });

      act(() => {
        result.current.handleChange('name', 'Иван');
      });

      // phone error should still be there since we only changed name
      expect(result.current.errors.phone).toBeDefined();
    });
  });

  describe('isValid', () => {
    it('is false with empty form', () => {
      const { result } = renderHook(() => useBookingForm());
      expect(result.current.isValid).toBe(false);
    });

    it('is true when all fields are valid', () => {
      const { result } = renderHook(() => useBookingForm());
      act(() => {
        Object.entries(VALID_FORM).forEach(([field, value]) => {
          result.current.handleChange(field as keyof typeof VALID_FORM, value);
        });
      });
      expect(result.current.isValid).toBe(true);
    });
  });

  describe('handleSubmit — validation', () => {
    it('sets errors when form is invalid', async () => {
      const { result } = renderHook(() => useBookingForm());
      await act(async () => {
        await result.current.handleSubmit();
      });
      expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);
    });

    it('does not change status when validation fails', async () => {
      const { result } = renderHook(() => useBookingForm());
      await act(async () => {
        await result.current.handleSubmit();
      });
      expect(result.current.status).toBe('idle');
    });
  });

  describe('handleSubmit — success', () => {
    it('sets status to loading then success with valid data', async () => {
      const { result } = renderHook(() => useBookingForm());

      act(() => {
        Object.entries(VALID_FORM).forEach(([field, value]) => {
          result.current.handleChange(field as keyof typeof VALID_FORM, value);
        });
      });

      let submitPromise: Promise<void>;
      act(() => {
        submitPromise = result.current.handleSubmit();
      });

      expect(result.current.status).toBe('loading');

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      await act(async () => {
        await submitPromise;
      });

      expect(result.current.status).toBe('success');
    });

    it('resets form data after success', async () => {
      const { result } = renderHook(() => useBookingForm());

      act(() => {
        Object.entries(VALID_FORM).forEach(([field, value]) => {
          result.current.handleChange(field as keyof typeof VALID_FORM, value);
        });
      });

      let submitPromise: Promise<void>;
      act(() => {
        submitPromise = result.current.handleSubmit();
      });

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      await act(async () => {
        await submitPromise;
      });

      expect(result.current.formData.name).toBe('');
      expect(result.current.formData.phone).toBe('');
    });
  });

  describe('reset', () => {
    it('clears form data', () => {
      const { result } = renderHook(() => useBookingForm());

      act(() => {
        result.current.handleChange('name', 'Иван');
        result.current.handleChange('phone', '380991234567');
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.formData.name).toBe('');
      expect(result.current.formData.phone).toBe('');
    });

    it('clears errors', async () => {
      const { result } = renderHook(() => useBookingForm());

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);

      act(() => {
        result.current.reset();
      });

      expect(result.current.errors).toEqual({});
    });

    it('resets status to idle', async () => {
      const { result } = renderHook(() => useBookingForm());

      act(() => {
        Object.entries(VALID_FORM).forEach(([field, value]) => {
          result.current.handleChange(field as keyof typeof VALID_FORM, value);
        });
      });

      let submitPromise: Promise<void>;
      act(() => {
        submitPromise = result.current.handleSubmit();
      });

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      await act(async () => {
        await submitPromise;
      });

      expect(result.current.status).toBe('success');

      act(() => {
        result.current.reset();
      });

      expect(result.current.status).toBe('idle');
    });
  });
});
