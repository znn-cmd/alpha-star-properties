'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './Hero.module.css';
import LeadFormModal from './LeadFormModal';
import { trackCTAClick } from '@/utils/analytics';

export default function Hero() {
  const t = useTranslations('hero');
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState<'viewing' | 'shortlist'>('viewing');

  const handleCTAClick = (type: 'viewing' | 'shortlist') => {
    setFormType(type);
    setShowModal(true);
    trackCTAClick(
      type === 'viewing' ? t('cta1') : t('cta2'),
      'hero'
    );
  };

  return (
    <>
      <section className={styles.hero}>
        {/* Background Video */}
        <div className={styles.heroBackground}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={styles.heroVideo}
            poster="/assets/hero.jpg"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
            <source src="/assets/13606726_3840_2160_30fps.mp4" type="video/mp4" />
            {/* Fallback message for browsers that don't support video */}
          </video>
          <div className={styles.heroOverlay}></div>
        </div>

        {/* Content */}
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroHeadline}>
              {t('headline')}
            </h1>
            <p className={styles.heroSubheadline}>
              {t('subheadline')}
            </p>

            <div className={styles.heroCTAs}>
              <button
                className="btn btn-primary"
                onClick={() => handleCTAClick('viewing')}
              >
                {t('cta1')}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => handleCTAClick('shortlist')}
              >
                {t('cta2')}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={styles.trustIndicators}>
              <div className={styles.indicator}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>RERA Licensed</span>
              </div>
              <div className={styles.indicator}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>100% Secure</span>
              </div>
              <div className={styles.indicator}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Response in 30 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {showModal && (
        <LeadFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          formType={formType}
        />
      )}
    </>
  );
}
