import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Masters } from '@/components/sections/Masters';
import { Gallery } from '@/components/sections/Gallery';
import { Booking } from '@/components/sections/Booking';
import { Contacts } from '@/components/sections/Contacts';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Services />
        <Masters />
        <Gallery />
        <Booking />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
