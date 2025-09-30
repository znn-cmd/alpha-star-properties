// UTM parameter capture and storage

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
}

const UTM_STORAGE_KEY = 'alpha_star_utm_params';

/**
 * Extract UTM parameters from URL
 */
export const getUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};

  // UTM parameters
  const utm_source = params.get('utm_source');
  const utm_medium = params.get('utm_medium');
  const utm_campaign = params.get('utm_campaign');
  const utm_term = params.get('utm_term');
  const utm_content = params.get('utm_content');
  
  // Click IDs
  const gclid = params.get('gclid');
  const fbclid = params.get('fbclid');

  if (utm_source) utmParams.utm_source = utm_source;
  if (utm_medium) utmParams.utm_medium = utm_medium;
  if (utm_campaign) utmParams.utm_campaign = utm_campaign;
  if (utm_term) utmParams.utm_term = utm_term;
  if (utm_content) utmParams.utm_content = utm_content;
  if (gclid) utmParams.gclid = gclid;
  if (fbclid) utmParams.fbclid = fbclid;

  return utmParams;
};

/**
 * Store UTM parameters in localStorage
 */
export const storeUTMParams = (params: UTMParams) => {
  if (typeof window === 'undefined' || Object.keys(params).length === 0) return;

  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
  } catch (error) {
    console.error('Failed to store UTM params:', error);
  }
};

/**
 * Retrieve stored UTM parameters
 */
export const getStoredUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to retrieve UTM params:', error);
    return {};
  }
};

/**
 * Initialize UTM tracking (call on page load)
 */
export const initUTMTracking = () => {
  const params = getUTMParams();
  if (Object.keys(params).length > 0) {
    storeUTMParams(params);
  }
};
