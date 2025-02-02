import { NextApiRequest, NextApiResponse } from 'next';
import { fetchAPI } from '@/lib/strapi';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1338';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, ...formData } = req.body;

    // Form tipine göre endpoint belirle
    let endpoint = '';
    switch (type) {
      case 'donate':
        endpoint = '/api/donations';
        break;
      case 'volunteer':
        endpoint = '/api/volunteers';
        break;
      case 'partner':
        endpoint = '/api/partners';
        break;
      case 'sponsor':
        endpoint = '/api/sponsors';
        break;
      default:
        throw new Error('Invalid form type');
    }

    console.log('Sending request to:', `${STRAPI_API_URL}${endpoint}`);
    console.log('Request body:', JSON.stringify({ data: formData }, null, 2));

    // Strapi'ye form verilerini gönder
    const response = await fetch(`${STRAPI_API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: formData
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Strapi error:', error);
      throw new Error(JSON.stringify(error));
    }

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    return res.status(200).json(data);
  } catch (error) {
    console.error('Support form submission error:', error);
    return res.status(500).json({ 
      message: 'Failed to submit form',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
