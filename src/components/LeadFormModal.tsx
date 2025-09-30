'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputMask from 'react-input-mask';
import styles from './LeadFormModal.module.css';
import { submitLead } from '@/utils/crm';
import { getStoredUTMParams } from '@/utils/utm';
import { trackFormSubmit } from '@/utils/analytics';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType?: 'viewing' | 'shortlist' | 'property' | 'general';
  propertyId?: string;
  propertyName?: string;
  initialPurpose?: 'buy' | 'sell' | 'invest';
}

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  purpose: z.enum(['buy', 'sell', 'invest']),
  message: z.string().optional(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to continue',
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function LeadFormModal({
  isOpen,
  onClose,
  formType = 'general',
  propertyId,
  propertyName,
  initialPurpose = 'buy',
}: LeadFormModalProps) {
  const t = useTranslations('contactForm');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: initialPurpose,
      gdprConsent: false,
    },
  });

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const utmParams = getStoredUTMParams();
      
      const leadData = {
        name: data.name,
        phone: data.phone,
        purpose: data.purpose,
        message: data.message,
        propertyId,
        language: locale,
        utm: utmParams,
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        timestamp: new Date().toISOString(),
      };

      const result = await submitLead(leadData);

      if (result.success) {
        setSubmitSuccess(true);
        trackFormSubmit(formType, data.purpose);
        reset();
        
        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitSuccess ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>{t('successTitle')}</h3>
            <p>{t('successMessage')}</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>
              {propertyName || t('title')}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {/* Name */}
              <div className="form-group">
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder={t('namePlaceholder')}
                  {...register('name')}
                />
                {errors.name && (
                  <span className="form-error">{errors.name.message}</span>
                )}
              </div>

              {/* Phone */}
              <div className="form-group">
                <InputMask
                  mask="+999 99 999 9999"
                  {...register('phone')}
                >
                  {/* @ts-ignore */}
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder={t('phonePlaceholder')}
                    />
                  )}
                </InputMask>
                {errors.phone && (
                  <span className="form-error">{errors.phone.message}</span>
                )}
              </div>

              {/* Purpose */}
              <div className="form-group">
                <select
                  className={`form-select ${errors.purpose ? 'error' : ''}`}
                  {...register('purpose')}
                >
                  <option value="buy">{t('purposeOptions.buy')}</option>
                  <option value="sell">{t('purposeOptions.sell')}</option>
                  <option value="invest">{t('purposeOptions.invest')}</option>
                </select>
                {errors.purpose && (
                  <span className="form-error">{errors.purpose.message}</span>
                )}
              </div>

              {/* Message (optional) */}
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  placeholder={t('messagePlaceholder')}
                  {...register('message')}
                />
              </div>

              {/* GDPR Consent */}
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="gdprConsent"
                  {...register('gdprConsent')}
                />
                <label htmlFor="gdprConsent">
                  {t('gdprConsent')}
                </label>
              </div>
              {errors.gdprConsent && (
                <span className="form-error">{errors.gdprConsent.message}</span>
              )}

              {/* Privacy Note */}
              <p className={styles.privacyNote}>{t('privacyNote')}</p>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                {isSubmitting ? (
                  <span className="spinner"></span>
                ) : (
                  t('submitButton')
                )}
              </button>

              {submitError && (
                <div className={styles.errorMessage}>
                  {t('errorMessage')}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
