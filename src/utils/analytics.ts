// Analytics utilities for GA4, Meta Pixel, and GTM

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

export type EventName = 
  | 'form_submit'
  | 'whatsapp_click'
  | 'phone_click'
  | 'view_property'
  | 'video_play'
  | 'lead_magnet_download'
  | 'cta_click';

interface EventParams {
  [key: string]: string | number | boolean;
}

// Google Analytics 4
export const trackGA4Event = (eventName: EventName, params?: EventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Meta Pixel
export const trackMetaPixel = (eventName: string, params?: EventParams) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

// GTM Data Layer Push
export const pushToDataLayer = (data: any) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// Combined tracking function
export const trackEvent = (
  eventName: EventName,
  params?: EventParams,
  metaEventName?: string
) => {
  // GA4
  trackGA4Event(eventName, params);

  // Meta Pixel
  if (metaEventName) {
    trackMetaPixel(metaEventName, params);
  }

  // GTM Data Layer
  pushToDataLayer({
    event: eventName,
    ...params,
  });
};

// Specific tracking functions
export const trackFormSubmit = (formType: string, purpose?: string) => {
  trackEvent('form_submit', {
    form_type: formType,
    purpose: purpose || 'general',
  }, 'Lead');
};

export const trackWhatsAppClick = (source: string, propertyId?: string) => {
  trackEvent('whatsapp_click', {
    source,
    property_id: propertyId || 'general',
  }, 'Contact');
};

export const trackPhoneClick = (source: string) => {
  trackEvent('phone_click', {
    source,
  }, 'Contact');
};

export const trackPropertyView = (propertyId: string, propertyName: string) => {
  trackEvent('view_property', {
    property_id: propertyId,
    property_name: propertyName,
  }, 'ViewContent');
};

export const trackCTAClick = (ctaText: string, location: string) => {
  trackEvent('cta_click', {
    cta_text: ctaText,
    location,
  });
};
