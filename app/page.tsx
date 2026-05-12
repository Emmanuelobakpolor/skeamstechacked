'use client';

import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ContentDisplay from '@/components/ContentDisplay';
import Services from '@/components/Services';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Teams from '@/components/Teams';
import Brands from '@/components/Brands';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { handleHashNavigation } from '@/lib/navigation';

export default function Home() {
  useEffect(() => {
    handleHashNavigation();
  }, []);

  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <Hero />
        <ContentDisplay />
        <Services />
        <Stats />
        <section id="about">
          <About />
        </section>
        <Teams />
        <Brands />
        <Testimonials />
        <section id="contact">
          <CTA />
        </section>
        <Footer />
      </main>
    </>
  );
}
