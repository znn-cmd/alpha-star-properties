// CRM integration utilities

import { UTMParams } from './utm';

export interface LeadData {
  name: string;
  phone: string;
  purpose?: string;
  message?: string;
  propertyId?: string;
  language?: string;
  utm?: UTMParams;
  pageUrl?: string;
  timestamp?: string;
}

/**
 * Send lead to webhook
 */
export const sendToWebhook = async (data: LeadData): Promise<boolean> => {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || process.env.WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('Webhook URL not configured');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Webhook error:', error);
    return false;
  }
};

/**
 * Send lead to HubSpot
 */
export const sendToHubSpot = async (data: LeadData): Promise<boolean> => {
  const apiKey = process.env.HUBSPOT_API_KEY;

  if (!apiKey) {
    console.warn('HubSpot API key not configured');
    return false;
  }

  try {
    const response = await fetch('/api/hubspot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('HubSpot error:', error);
    return false;
  }
};

/**
 * Submit lead to all configured CRM systems
 */
export const submitLead = async (data: LeadData): Promise<{ success: boolean; errors: string[] }> => {
  const errors: string[] = [];

  // Send to webhook
  const webhookSuccess = await sendToWebhook(data);
  if (!webhookSuccess) {
    errors.push('webhook');
  }

  // Send to HubSpot
  const hubspotSuccess = await sendToHubSpot(data);
  if (!hubspotSuccess) {
    errors.push('hubspot');
  }

  return {
    success: webhookSuccess || hubspotSuccess,
    errors,
  };
};
