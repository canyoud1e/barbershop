// ============================================================
// CONSTANTS — static data for the barbershop
// ============================================================

import {
  Service,
  Master,
  GalleryItem,
  ContactInfo,
  NavItem,
} from './types';

export const BARBERSHOP_NAME = 'NOIR';
export const BARBERSHOP_TAGLINE = 'Мистецтво бути собою';
export const BARBERSHOP_DESCRIPTION =
  'Преміальний барбершоп у центрі міста. Ми створюємо не просто стрижки — ми створюємо образи.';

export const WORKING_HOURS_START = 9;
export const WORKING_HOURS_END = 21;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Послуги', href: '#services' },
  { label: 'Майстри', href: '#masters' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Запис', href: '#booking' },
  { label: 'Контакти', href: '#contacts' },
];

export const SERVICES: Service[] = [
  {
    id: 'haircut-classic',
    name: 'Класична стрижка',
    description: 'Ідеальний силует з точними лініями. Включає укладання та миття голови.',
    price: 450,
    duration: 60,
    category: 'haircut',
  },
  {
    id: 'haircut-fade',
    name: 'Фейд',
    description: 'Плавний перехід від шкіри до потрібної довжини. Сучасно та чисто.',
    price: 550,
    duration: 75,
    category: 'haircut',
  },
  {
    id: 'haircut-texture',
    name: 'Текстурна стрижка',
    description: 'Акцент на текстуру та рух волосся. Для тих, хто цінує деталі.',
    price: 600,
    duration: 75,
    category: 'haircut',
  },
  {
    id: 'beard-trim',
    name: 'Оформлення бороди',
    description: 'Чіткі контури, баланс та доглянутий вигляд. Гоління небезпечною бритвою.',
    price: 300,
    duration: 45,
    category: 'beard',
  },
  {
    id: 'beard-shave',
    name: 'Королівське гоління',
    description: 'Гарячий рушник, піна, небезпечна бритва. Традиція в кожному русі.',
    price: 400,
    duration: 45,
    category: 'beard',
  },
  {
    id: 'combo-classic',
    name: 'Комбо: Стрижка + Борода',
    description: 'Повний образ за один візит. Стрижка та оформлення бороди.',
    price: 700,
    duration: 100,
    category: 'combo',
  },
  {
    id: 'care-mask',
    name: 'Догляд за шкірою голови',
    description: 'Глибоке очищення та поживна маска. Відновлення та тонус.',
    price: 250,
    duration: 30,
    category: 'care',
  },
  {
    id: 'care-color',
    name: 'Фарбування',
    description: 'Точкове або повне фарбування з професійними барвниками.',
    price: 900,
    duration: 120,
    category: 'care',
  },
];

export const SERVICE_CATEGORY_LABELS: Record<Service['category'], string> = {
  haircut: 'Стрижки',
  beard: 'Борода',
  combo: 'Комбо',
  care: 'Догляд',
};

export const MASTERS: Master[] = [
  {
    id: 'master-1',
    name: 'Артем Волков',
    role: 'Засновник & Head Barber',
    experience: 12,
    specialization: ['Фейд', 'Класичні стрижки', 'Небезпечна бритва'],
    imageUrl: '/images/masters/artem.svg',
    bio: 'Пройшов навчання в Лондоні та Барселоні. Кожна стрижка — це діалог з клієнтом.',
    traits: [
      'Майстер класичного барбінгу',
      'Сертифікований інструктор',
      'Безпечне гоління небезпечною бритвою',
      'Автор авторських технік фейду',
    ],
    portfolio: [
      '/images/gallery/g1.svg',
      '/images/gallery/g2.svg',
      '/images/gallery/g7.svg',
    ],
  },
  {
    id: 'master-2',
    name: 'Михайло Карєв',
    role: 'Senior Barber',
    experience: 8,
    specialization: ['Текстурні стрижки', 'Борода', 'Догляд'],
    imageUrl: '/images/masters/mikhail.svg',
    bio: 'Спеціаліст по роботі з кучерявим та густим волоссям. Точність — його головний принцип.',
    traits: [
      'Експерт з кучерявого волосся',
      'Скрупульозна робота з деталями',
      'Індивідуальний підхід до форми голови',
      'Знання трихології',
    ],
    portfolio: [
      '/images/gallery/g4.svg',
      '/images/gallery/g3.svg',
      '/images/gallery/g5.svg',
    ],
  },
  {
    id: 'master-3',
    name: 'Данило Орлов',
    role: 'Barber',
    experience: 5,
    specialization: ['Сучасні стрижки', 'Фарбування', 'Фейд'],
    imageUrl: '/images/masters/daniil.svg',
    bio: 'Стежить за трендами світової барбер-індустрії. Молодий погляд, досвідчені руки.',
    traits: [
      'Слідкує за актуальними трендами',
      'Спеціаліст з кольору та фарбування',
      'Працює зі складними техніками фейду',
      'Навчання у топ-майстрів Мілана',
    ],
    portfolio: [
      '/images/gallery/g2.svg',
      '/images/gallery/g8.svg',
      '/images/gallery/g6.svg',
    ],
  },
  {
    id: 'master-4',
    name: 'Роман Степанов',
    role: 'Barber & Care Specialist',
    experience: 6,
    specialization: ['Догляд за шкірою', 'Комбо-послуги', 'Класика'],
    imageUrl: '/images/masters/roman.svg',
    bio: 'Спеціалізується на повному догляді. Перетворює візит на ритуал відновлення.',
    traits: [
      'Глибокі знання дерматології',
      'Комплексний підхід до догляду',
      'Розробка персональних програм',
      'Майстер ритуалу гоління',
    ],
    portfolio: [
      '/images/gallery/g5.svg',
      '/images/gallery/g3.svg',
      '/images/gallery/g1.svg',
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', imageUrl: '/images/gallery/g1.svg', alt: 'Класична стрижка з переходом', category: 'haircut' },
  { id: 'g2', imageUrl: '/images/gallery/g2.svg', alt: 'Чистий фейд', category: 'haircut' },
  { id: 'g3', imageUrl: '/images/gallery/g3.svg', alt: 'Оформлена борода', category: 'beard' },
  { id: 'g4', imageUrl: '/images/gallery/g4.svg', alt: 'Текстурна стрижка', category: 'style' },
  { id: 'g5', imageUrl: '/images/gallery/g5.svg', alt: 'Середній фейд з бородою', category: 'beard' },
  { id: 'g6', imageUrl: '/images/gallery/g6.svg', alt: 'Зачіс назад', category: 'style' },
  { id: 'g7', imageUrl: '/images/gallery/g7.svg', alt: 'Скін фейд з бородою', category: 'haircut' },
  { id: 'g8', imageUrl: '/images/gallery/g8.svg', alt: 'Укладання помадою', category: 'style' },
];

export const CONTACT_INFO: ContactInfo = {
  address: 'Миколаїв, вул. Соборна, 12, 2 поверх',
  phone: '+380991234567',
  email: 'hello@noirbarber.com.ua',
  hours: [
    { days: 'Пн – Пт', time: '09:00 – 21:00' },
    { days: 'Сб – Нд', time: '10:00 – 20:00' },
  ],
  socials: [
    { platform: 'instagram', url: 'https://instagram.com/noirbarber', label: 'Instagram' },
    { platform: 'telegram', url: 'https://t.me/noirbarber', label: 'Telegram' },
    { platform: 'youtube', url: 'https://youtube.com/noirbarber', label: 'YouTube' },
  ],
};
