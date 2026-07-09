import {
  SERVICES,
  MASTERS,
  GALLERY_ITEMS,
  CONTACT_INFO,
  NAV_ITEMS,
  BARBERSHOP_NAME,
  BARBERSHOP_TAGLINE,
  SERVICE_CATEGORY_LABELS,
  WORKING_HOURS_START,
  WORKING_HOURS_END,
} from '@/lib/constants';
import { Service, Master, GalleryItem, SocialLink } from '@/lib/types';

describe('Constants integrity', () => {
  // ============================================================
  // BARBERSHOP_NAME & BARBERSHOP_TAGLINE
  // ============================================================
  describe('BARBERSHOP_NAME', () => {
    it('is a non-empty string', () => {
      expect(typeof BARBERSHOP_NAME).toBe('string');
      expect(BARBERSHOP_NAME.length).toBeGreaterThan(0);
    });
  });

  describe('BARBERSHOP_TAGLINE', () => {
    it('is a non-empty string', () => {
      expect(typeof BARBERSHOP_TAGLINE).toBe('string');
      expect(BARBERSHOP_TAGLINE.length).toBeGreaterThan(0);
    });
  });

  // ============================================================
  // WORKING_HOURS
  // ============================================================
  describe('WORKING_HOURS', () => {
    it('start is before end', () => {
      expect(WORKING_HOURS_START).toBeLessThan(WORKING_HOURS_END);
    });

    it('start is 9 and end is 21', () => {
      expect(WORKING_HOURS_START).toBe(9);
      expect(WORKING_HOURS_END).toBe(21);
    });
  });

  // ============================================================
  // NAV_ITEMS
  // ============================================================
  describe('NAV_ITEMS', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(NAV_ITEMS)).toBe(true);
      expect(NAV_ITEMS.length).toBeGreaterThan(0);
    });

    it('every item has label and href', () => {
      NAV_ITEMS.forEach((item) => {
        expect(typeof item.label).toBe('string');
        expect(item.label.length).toBeGreaterThan(0);
        expect(item.href).toMatch(/^#/);
      });
    });

    it('has unique hrefs', () => {
      const hrefs = NAV_ITEMS.map((i) => i.href);
      const unique = new Set(hrefs);
      expect(unique.size).toBe(hrefs.length);
    });
  });

  // ============================================================
  // SERVICES
  // ============================================================
  describe('SERVICES', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(SERVICES)).toBe(true);
      expect(SERVICES.length).toBeGreaterThan(0);
    });

    it('every service has required fields', () => {
      SERVICES.forEach((service: Service) => {
        expect(typeof service.id).toBe('string');
        expect(service.id.length).toBeGreaterThan(0);
        expect(typeof service.name).toBe('string');
        expect(service.name.length).toBeGreaterThan(0);
        expect(typeof service.description).toBe('string');
        expect(typeof service.price).toBe('number');
        expect(typeof service.duration).toBe('number');
        expect(['haircut', 'beard', 'combo', 'care']).toContain(service.category);
      });
    });

    it('prices are positive numbers', () => {
      SERVICES.forEach((service) => {
        expect(service.price).toBeGreaterThan(0);
      });
    });

    it('durations are positive numbers', () => {
      SERVICES.forEach((service) => {
        expect(service.duration).toBeGreaterThan(0);
      });
    });

    it('has unique IDs', () => {
      const ids = SERVICES.map((s) => s.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });
  });

  // ============================================================
  // SERVICE_CATEGORY_LABELS
  // ============================================================
  describe('SERVICE_CATEGORY_LABELS', () => {
    it('has labels for all categories', () => {
      const categories: Service['category'][] = ['haircut', 'beard', 'combo', 'care'];
      categories.forEach((cat) => {
        expect(typeof SERVICE_CATEGORY_LABELS[cat]).toBe('string');
        expect(SERVICE_CATEGORY_LABELS[cat].length).toBeGreaterThan(0);
      });
    });
  });

  // ============================================================
  // MASTERS
  // ============================================================
  describe('MASTERS', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(MASTERS)).toBe(true);
      expect(MASTERS.length).toBeGreaterThan(0);
    });

    it('every master has required fields', () => {
      MASTERS.forEach((master: Master) => {
        expect(typeof master.id).toBe('string');
        expect(master.id.length).toBeGreaterThan(0);
        expect(typeof master.name).toBe('string');
        expect(master.name.length).toBeGreaterThan(0);
        expect(typeof master.role).toBe('string');
        expect(typeof master.experience).toBe('number');
        expect(master.experience).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(master.specialization)).toBe(true);
        expect(master.specialization.length).toBeGreaterThan(0);
        expect(typeof master.imageUrl).toBe('string');
        expect(typeof master.bio).toBe('string');
      });
    });

    it('has unique IDs', () => {
      const ids = MASTERS.map((m) => m.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });

    it('specializations are non-empty strings', () => {
      MASTERS.forEach((master) => {
        master.specialization.forEach((spec) => {
          expect(typeof spec).toBe('string');
          expect(spec.length).toBeGreaterThan(0);
        });
      });
    });
  });

  // ============================================================
  // GALLERY_ITEMS
  // ============================================================
  describe('GALLERY_ITEMS', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(GALLERY_ITEMS)).toBe(true);
      expect(GALLERY_ITEMS.length).toBeGreaterThan(0);
    });

    it('every item has required fields', () => {
      GALLERY_ITEMS.forEach((item: GalleryItem) => {
        expect(typeof item.id).toBe('string');
        expect(typeof item.imageUrl).toBe('string');
        expect(item.imageUrl.length).toBeGreaterThan(0);
        expect(typeof item.alt).toBe('string');
        expect(item.alt.length).toBeGreaterThan(0);
        expect(['haircut', 'beard', 'style']).toContain(item.category);
      });
    });

    it('has unique IDs', () => {
      const ids = GALLERY_ITEMS.map((i) => i.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });
  });

  // ============================================================
  // CONTACT_INFO
  // ============================================================
  describe('CONTACT_INFO', () => {
    it('has non-empty address', () => {
      expect(typeof CONTACT_INFO.address).toBe('string');
      expect(CONTACT_INFO.address.length).toBeGreaterThan(0);
    });

    it('has a valid-looking phone number', () => {
      expect(CONTACT_INFO.phone).toMatch(/^\+?380\d{9}$/);
    });

    it('has a valid-looking email', () => {
      expect(CONTACT_INFO.email).toMatch(/@/);
    });

    it('has at least one working hours entry', () => {
      expect(Array.isArray(CONTACT_INFO.hours)).toBe(true);
      expect(CONTACT_INFO.hours.length).toBeGreaterThan(0);
      CONTACT_INFO.hours.forEach((h) => {
        expect(typeof h.days).toBe('string');
        expect(typeof h.time).toBe('string');
      });
    });

    it('has at least one social link', () => {
      expect(Array.isArray(CONTACT_INFO.socials)).toBe(true);
      expect(CONTACT_INFO.socials.length).toBeGreaterThan(0);
    });

    it('social links have valid structure', () => {
      const validPlatforms: SocialLink['platform'][] = ['instagram', 'telegram', 'vk', 'youtube'];
      CONTACT_INFO.socials.forEach((social: SocialLink) => {
        expect(validPlatforms).toContain(social.platform);
        expect(social.url).toMatch(/^https?:\/\//);
        expect(typeof social.label).toBe('string');
        expect(social.label.length).toBeGreaterThan(0);
      });
    });
  });
});
