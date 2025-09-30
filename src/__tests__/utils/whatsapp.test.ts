import { getWhatsAppURL, getWhatsAppNumber } from '@/utils/whatsapp';

describe('WhatsApp Utilities', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = '971501234567';
  });

  it('should return correct WhatsApp number', () => {
    expect(getWhatsAppNumber()).toBe('971501234567');
  });

  it('should generate correct WhatsApp URL for mobile', () => {
    const message = 'Hello!';
    const url = getWhatsAppURL(message, true);
    
    expect(url).toContain('whatsapp://send');
    expect(url).toContain('phone=971501234567');
    expect(url).toContain(encodeURIComponent(message));
  });

  it('should generate correct WhatsApp URL for desktop', () => {
    const message = 'Hello!';
    const url = getWhatsAppURL(message, false);
    
    expect(url).toContain('https://web.whatsapp.com/send');
    expect(url).toContain('phone=971501234567');
    expect(url).toContain(encodeURIComponent(message));
  });
});
