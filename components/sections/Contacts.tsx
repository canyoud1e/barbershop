import { SectionTitle } from '@/components/ui/SectionTitle';
import { CONTACT_INFO } from '@/lib/constants';
import { formatPhone } from '@/lib/utils';

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  telegram: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path d="M21 5L2 12.5l7 1M21 5l-6.5 15-5.5-8.5M21 5L9 13.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  vk: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.131-.427.131-.427s-.019-1.304.586-1.496c.596-.19 1.361 1.26 2.173 1.817.613.422 1.079.33 1.079.33l2.168-.03s1.134-.07.596-1.137c-.044-.082-.313-.661-1.612-1.87-1.36-1.265-1.177-1.06.46-3.246.998-1.33 1.397-2.142 1.272-2.49-.12-.33-.854-.243-.854-.243l-2.44.015s-.181-.025-.315.056c-.132.079-.217.262-.217.262s-.387 1.028-.903 1.903c-1.088 1.848-1.523 1.946-1.7 1.83-.413-.267-.31-1.073-.31-1.645 0-1.788.271-2.532-.528-2.72-.265-.064-.46-.106-1.138-.113-.87-.009-1.606.003-2.022.207-.277.135-.491.437-.361.454.161.02.527.098.72.363.248.34.24 1.103.24 1.103s.143 2.103-.333 2.363c-.327.176-.775-.184-1.737-1.827-.494-.855-.867-1.801-.867-1.801s-.072-.176-.202-.271c-.156-.114-.375-.15-.375-.15l-2.32.015s-.348.01-.476.161c-.114.135-.009.414-.009.414s1.816 4.25 3.872 6.394c1.885 1.967 4.026 1.838 4.026 1.838h.97z" />
    </svg>
  ),
};

const CONTACT_ICONS = {
  location: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.5" strokeWidth="1.5" />
    </svg>
  ),
  phone: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 10.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.61 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeWidth="1.5" />
    </svg>
  ),
  email: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="1.5" />
      <path d="M22 6l-10 7L2 6" strokeWidth="1.5" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
      <path d="M12 7v5l3 3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export function Contacts() {
  return (
    <section
      id="contacts"
      className="py-section-lg"
      aria-label="Контакти"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle
          eyebrow="Контакти"
          title="Знайдіть нас"
          subtitle="Ми працюємо щодня. Запишіться заздалегідь або просто завітайте до нас."
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Contact cards */}
          <div className="flex flex-col gap-4">
            {/* Address */}
            <div className="bg-bg-card border border-border rounded-card p-6 flex gap-4 hover:border-border-light transition-colors">
              <div className="w-10 h-10 rounded-card bg-bg-elevated flex items-center justify-center text-text-secondary flex-shrink-0">
                {CONTACT_ICONS.location}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-text-muted mb-1">Адреса</p>
                <address className="not-italic text-text-secondary text-sm leading-relaxed">
                  {CONTACT_INFO.address}
                </address>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-bg-card border border-border rounded-card p-6 flex gap-4 hover:border-border-light transition-colors">
              <div className="w-10 h-10 rounded-card bg-bg-elevated flex items-center justify-center text-text-secondary flex-shrink-0">
                {CONTACT_ICONS.phone}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-text-muted mb-1">Телефон</p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-text-primary hover:text-accent transition-colors text-sm font-medium"
                >
                  {formatPhone(CONTACT_INFO.phone)}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-bg-card border border-border rounded-card p-6 flex gap-4 hover:border-border-light transition-colors">
              <div className="w-10 h-10 rounded-card bg-bg-elevated flex items-center justify-center text-text-secondary flex-shrink-0">
                {CONTACT_ICONS.email}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-text-muted mb-1">Email</p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-bg-card border border-border rounded-card p-6 flex gap-4 hover:border-border-light transition-colors">
              <div className="w-10 h-10 rounded-card bg-bg-elevated flex items-center justify-center text-text-secondary flex-shrink-0">
                {CONTACT_ICONS.clock}
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-text-muted mb-3">Години роботи</p>
                <div className="flex flex-col gap-2">
                  {CONTACT_INFO.hours.map((h) => (
                    <div key={h.days} className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">{h.days}</span>
                      <span className="text-sm text-text-primary font-medium tabular-nums">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="bg-bg-card border border-border rounded-card p-6">
              <p className="text-xs uppercase tracking-widest text-text-muted mb-4">Соцмережі</p>
              <div className="flex gap-4">
                {CONTACT_INFO.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                    aria-label={social.label}
                  >
                    {SOCIAL_ICONS[social.platform]}
                    <span className="text-sm">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div
            className="relative rounded-card-lg overflow-hidden bg-bg-card border border-border min-h-[280px] sm:min-h-[380px] lg:min-h-full"
            aria-label="Карта розташування барбершопа"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2722.587848143242!2d31.986665776949318!3d46.96985853177727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c5c3c0b11e2f75%3A0x6f9ee1fa6a12b6f4!2z0YPQuy4g0KHQvtCx0L7RgNC90DRRjywgMTIsINCd0LjQutC-0LvQsNC10LIsINCd0LjQutC-0LvQsNC10LLRgdC60DRRjyDQvtCx0EBQsNGB0YLRjCwg0KPQutGA0LDQuNC90LAsIDU0MDAw!5e0!3m2!1suk!2sua!4v1710000000000!5m2!1suk!2sua"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0 grayscale invert contrast-125 opacity-80"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps — NOIR Barbershop"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
