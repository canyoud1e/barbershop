// ============================================================
// TYPES — barbershop domain models
// ============================================================

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: ServiceCategory;
}

export type ServiceCategory = 'haircut' | 'beard' | 'combo' | 'care';

export interface Master {
  id: string;
  name: string;
  role: string;
  experience: number; // years
  specialization: string[];
  imageUrl: string;
  bio: string;
  traits?: string[];           // unique qualities / working style
  portfolio?: string[];        // image URLs of works
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
  category: 'haircut' | 'beard' | 'style';
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: WorkingHours[];
  socials: SocialLink[];
}

export interface WorkingHours {
  days: string;
  time: string;
}

export interface SocialLink {
  platform: 'instagram' | 'telegram' | 'vk' | 'youtube';
  url: string;
  label: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  serviceId: string;
  masterId: string;
  date: string;
  time: string;
}

export type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>;

export interface NavItem {
  label: string;
  href: string;
}

export interface BookingRequest extends BookingFormData {
  id: string;
  status: 'new' | 'confirmed' | 'rejected';
  createdAt: string;
}
