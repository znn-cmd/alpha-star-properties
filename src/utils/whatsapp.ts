// WhatsApp utilities

/**
 * Get WhatsApp phone number from environment
 */
export const getWhatsAppNumber = (): string => {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971501234567';
};

/**
 * Format WhatsApp URL with prefilled message
 */
export const getWhatsAppURL = (message: string, isMobile?: boolean): string => {
  const phone = getWhatsAppNumber();
  const encodedMessage = encodeURIComponent(message);
  
  // Use WhatsApp app on mobile, web version on desktop
  const baseUrl = isMobile 
    ? 'whatsapp://send'
    : 'https://web.whatsapp.com/send';
  
  return `${baseUrl}?phone=${phone}&text=${encodedMessage}`;
};

/**
 * Check if device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Open WhatsApp with message
 */
export const openWhatsApp = (message: string) => {
  const url = getWhatsAppURL(message, isMobileDevice());
  window.open(url, '_blank');
};
