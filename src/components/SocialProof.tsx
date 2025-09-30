'use client';

import { useTranslations } from 'next-intl';
import styles from './SocialProof.module.css';

export default function SocialProof() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      id: 'testimonial1',
      rating: 5,
    },
    {
      id: 'testimonial2',
      rating: 5,
    },
  ];

  const cases = [
    { id: 'case1' },
    { id: 'case2' },
  ];

  const tCases = useTranslations('cases');

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Testimonials */}
        <div className={styles.testimonialsSection}>
          <h2 className={styles.title}>{t('title')}</h2>
          
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.stars}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                
                <p className={styles.testimonialText}>
                  "{t(`${testimonial.id}.text`)}"
                </p>
                
                <div className={styles.author}>
                  <div className={styles.authorAvatar}>
                    {t(`${testimonial.id}.author`).charAt(0)}
                  </div>
                  <div>
                    <div className={styles.authorName}>
                      {t(`${testimonial.id}.author`)}
                    </div>
                    <div className={styles.authorRole}>
                      {t(`${testimonial.id}.role`)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Cases */}
        <div className={styles.casesSection}>
          <h2 className={styles.title}>{tCases('title')}</h2>
          
          <div className={styles.casesGrid}>
            {cases.map((caseItem) => (
              <div key={caseItem.id} className={styles.caseCard}>
                <div className={styles.caseIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                </div>
                <h3 className={styles.caseTitle}>
                  {tCases(`${caseItem.id}.title`)}
                </h3>
                <p className={styles.caseDescription}>
                  {tCases(`${caseItem.id}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
