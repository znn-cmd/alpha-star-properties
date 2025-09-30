'use client';

import { useTranslations } from 'next-intl';
import styles from './ValueProps.module.css';

export default function ValueProps() {
  const t = useTranslations('valueProps');

  const props = [
    {
      id: 'prop1',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      id: 'prop2',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'prop3',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>{t('title')}</h2>
        
        <div className={styles.grid}>
          {props.map((prop) => (
            <div key={prop.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                {prop.icon}
              </div>
              <h3 className={styles.cardTitle}>
                {t(`${prop.id}.title`)}
              </h3>
              <p className={styles.cardDescription}>
                {t(`${prop.id}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
