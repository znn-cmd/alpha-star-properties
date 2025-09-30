'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useRef } from 'react';
import styles from './FeaturedProperties.module.css';
import LeadFormModal from './LeadFormModal';
import { trackPropertyView } from '@/utils/analytics';

interface Property {
  id: string;
  nameKey: string;
  size: string;
  price: string;
  image: string;
  features: string[];
}

export default function FeaturedProperties() {
  const t = useTranslations('properties');
  const locale = useLocale();
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Mock properties - in production, fetch from CMS
  const properties: Property[] = [
    {
      id: 'palm-penthouse-1',
      nameKey: 'property1.name',
      size: t('property1.size'),
      price: t('property1.price'),
      image: '/assets/property-1.jpg',
      features: [t('seaView'), t('privatePool')],
    },
  ];

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setShowModal(true);
    trackPropertyView(property.id, t(property.nameKey));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      if (direction === 'right' && currentIndex < properties.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (direction === 'left' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>{t('title')}</h2>
              <p className={styles.subtitle}>{t('subtitle')}</p>
            </div>
            
            <div className={styles.navigation}>
              <button
                className={styles.navButton}
                onClick={() => scroll('left')}
                disabled={currentIndex === 0}
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className={styles.navButton}
                onClick={() => scroll('right')}
                disabled={currentIndex === properties.length - 1}
                aria-label="Next"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.sliderWrapper}>
            <div className={styles.slider} ref={sliderRef}>
              {properties.map((property) => (
                <div key={property.id} className={styles.propertyCard}>
                  <div className={styles.propertyImage}>
                    {/* Placeholder for actual image */}
                    <div className={styles.imagePlaceholder}>
                      <span>Premium Property</span>
                    </div>
                    
                    <div className={styles.features}>
                      {property.features.map((feature, index) => (
                        <span key={index} className={styles.feature}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.propertyContent}>
                    <h3 className={styles.propertyName}>
                      {t(property.nameKey)}
                    </h3>
                    
                    <div className={styles.propertyDetails}>
                      <div className={styles.detail}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <span>{property.size} {locale === 'ru' ? t('common.sqm') : t('common.sqft')}</span>
                      </div>
                    </div>

                    <div className={styles.priceRow}>
                      <div className={styles.price}>
                        <span className={styles.currency}>{t('common.currency')}</span>
                        <span className={styles.amount}>{property.price}</span>
                      </div>
                      
                      <button
                        className="btn btn-primary"
                        onClick={() => handlePropertyClick(property)}
                      >
                        {t('requestViewing')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showModal && selectedProperty && (
        <LeadFormModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedProperty(null);
          }}
          formType="property"
          propertyId={selectedProperty.id}
          propertyName={t(selectedProperty.nameKey)}
        />
      )}
    </>
  );
}
