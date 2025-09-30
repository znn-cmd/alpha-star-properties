'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './PathChooser.module.css';
import LeadFormModal from './LeadFormModal';
import { trackCTAClick } from '@/utils/analytics';

export default function PathChooser() {
  const t = useTranslations('pathChooser');
  const [showModal, setShowModal] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<'buy' | 'invest' | 'sell'>('buy');

  const paths = [
    {
      id: 'buying',
      purpose: 'buy' as const,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'investing',
      purpose: 'invest' as const,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      id: 'selling',
      purpose: 'sell' as const,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const handlePathClick = (purpose: 'buy' | 'invest' | 'sell', pathId: string) => {
    setSelectedPurpose(purpose);
    setShowModal(true);
    trackCTAClick(t(`${pathId}.cta`), 'path_chooser');
  };

  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.title}>{t('title')}</h2>
          
          <div className={styles.grid}>
            {paths.map((path) => (
              <div key={path.id} className={styles.card}>
                <div className={styles.iconWrapper}>
                  {path.icon}
                </div>
                <h3 className={styles.cardTitle}>
                  {t(`${path.id}.title`)}
                </h3>
                <p className={styles.cardDescription}>
                  {t(`${path.id}.description`)}
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePathClick(path.purpose, path.id)}
                >
                  {t(`${path.id}.cta`)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal && (
        <LeadFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          formType="general"
          initialPurpose={selectedPurpose}
        />
      )}
    </>
  );
}
