import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiKey = process.env.HUBSPOT_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'HubSpot API key not configured' },
        { status: 500 }
      );
    }

    // HubSpot Contacts API
    const hubspotResponse = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          properties: {
            firstname: body.name.split(' ')[0] || body.name,
            lastname: body.name.split(' ').slice(1).join(' ') || '',
            phone: body.phone,
            message: body.message || '',
            property_interest: body.propertyId || 'general',
            lead_source: body.utm?.utm_source || 'website',
            lead_campaign: body.utm?.utm_campaign || '',
            hs_language: body.language || 'en',
          },
        }),
      }
    );

    if (!hubspotResponse.ok) {
      const error = await hubspotResponse.text();
      console.error('HubSpot API error:', error);
      return NextResponse.json(
        { error: 'Failed to create contact in HubSpot' },
        { status: hubspotResponse.status }
      );
    }

    const data = await hubspotResponse.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('HubSpot API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
