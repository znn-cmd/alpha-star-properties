'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import PathChooser from '@/components/PathChooser';
import FeaturedProperties from '@/components/FeaturedProperties';
import SocialProof from '@/components/SocialProof';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { initUTMTracking } from '@/utils/utm';

export default function HomePage() {
  useEffect(() => {
    // Initialize UTM tracking on page load
    initUTMTracking();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <PathChooser />
        <FeaturedProperties />
        <SocialProof />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
