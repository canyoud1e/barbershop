'use client';

import { useState, useCallback } from 'react';
import { BookingFormData, BookingFormErrors, BookingRequest } from '@/lib/types';
import { validateBookingForm } from '@/lib/utils';

const INITIAL_FORM: BookingFormData = {
  name: '',
  phone: '',
  serviceId: '',
  masterId: '',
  date: '',
  time: '',
};

export type BookingStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseBookingFormReturn {
  formData: BookingFormData;
  errors: BookingFormErrors;
  status: BookingStatus;
  handleChange: (field: keyof BookingFormData, value: string) => void;
  handleSubmit: () => Promise<void>;
  reset: () => void;
  isValid: boolean;
}

export function useBookingForm(): UseBookingFormReturn {
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [status, setStatus] = useState<BookingStatus>('idle');

  const handleChange = useCallback(
    (field: keyof BookingFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear the error for the changed field on user input
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateBookingForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      // Simulate API call — replace with real endpoint
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));

      // Save to localStorage
      if (typeof window !== 'undefined') {
        const bookingsStr = localStorage.getItem('noir_bookings');
        const bookings: BookingRequest[] = bookingsStr ? JSON.parse(bookingsStr) : [];
        const newBooking: BookingRequest = {
          ...formData,
          id: Math.random().toString(36).substring(2, 11),
          status: 'new',
          createdAt: new Date().toISOString(),
        };
        bookings.push(newBooking);
        localStorage.setItem('noir_bookings', JSON.stringify(bookings));
      }

      setStatus('success');
      setFormData(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  }, [formData]);

  const reset = useCallback(() => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setStatus('idle');
  }, []);

  const validationResult = validateBookingForm(formData);
  const isValid = Object.keys(validationResult).length === 0;

  return {
    formData,
    errors,
    status,
    handleChange,
    handleSubmit,
    reset,
    isValid,
  };
}
