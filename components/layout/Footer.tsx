import Link from 'next/link';
import { BARBERSHOP_NAME, CONTACT_INFO, NAV_ITEMS } from '@/lib/constants';

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  telegram: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        d="M21 5L2 12.5l7 1M21 5l-6.5 15-5.5-8.5M21 5L9 13.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  vk: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.131-.427.131-.427s-.019-1.304.586-1.496c.596-.19 1.361 1.26 2.173 1.817.613.422 1.079.33 1.079.33l2.168-.03s1.134-.07.596-1.137c-.044-.082-.313-.661-1.612-1.87-1.36-1.265-1.177-1.06.46-3.246.998-1.33 1.397-2.142 1.272-2.49-.12-.33-.854-.243-.854-.243l-2.44.015s-.181-.025-.315.056c-.132.079-.217.262-.217.262s-.387 1.028-.903 1.903c-1.088 1.848-1.523 1.946-1.7 1.83-.413-.267-.31-1.073-.31-1.645 0-1.788.271-2.532-.528-2.72-.265-.064-.46-.106-1.138-.113-.87-.009-1.606.003-2.022.207-.277.135-.491.437-.361.454.161.02.527.098.72.363.248.34.24 1.103.24 1.103s.143 2.103-.333 2.363c-.327.176-.775-.184-1.737-1.827-.494-.855-.867-1.801-.867-1.801s-.072-.176-.202-.271c-.156-.114-.375-.15-.375-.15l-2.32.015s-.348.01-.476.161c-.114.135-.009.414-.009.414s1.816 4.25 3.872 6.394c1.885 1.967 4.026 1.838 4.026 1.838h.97z" />
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" strokeWidth="1.5" />
      <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border mt-auto"
      role="contentinfo"
      aria-label="Підвал сайту"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="font-display text-3xl font-light tracking-[0.3em] text-text-primary">
              {BARBERSHOP_NAME}
            </span>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Преміальний барбершоп у Миколаєві. Мистецтво бути собою.
            </p>
            <div className="flex gap-4 mt-2">
              {CONTACT_INFO.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-primary transition-colors duration-300"
                  aria-label={social.label}
                >
                  {SOCIAL_ICONS[social.platform]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Навігація у підвалі">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-5">
              Навігація
            </h3>
            <ul className="flex flex-col gap-3 list-none">
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
          </nav>

          {/* Contacts */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-5">
              Контакти
            </h3>
            <address className="not-italic flex flex-col gap-3">
              <p className="text-sm text-text-secondary">{CONTACT_INFO.address}</p>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
              <div className="mt-2 flex flex-col gap-1.5">
                {CONTACT_INFO.hours.map((h) => (
                  <p key={h.days} className="text-sm text-text-muted">
                    <span className="text-text-secondary">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; {year} {BARBERSHOP_NAME}. Усі права захищені.
          </p>
          <p className="text-xs text-text-muted">Миколаїв, Україна</p>
        </div>
      </div>
    </footer>
  );
}
