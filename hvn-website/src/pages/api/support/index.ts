import type { NextApiRequest, NextApiResponse } from 'next';
import { getStrapi } from '@/utils/strapi';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const strapi = getStrapi();
    const { type, ...data } = req.body;

    let response;

    switch (type) {
      case 'donate':
        response = await strapi.create('donations', {
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            amount: parseFloat(data.amount),
            message: data.message,
            status: 'pending',
            donationType: 'oneTime',
            currency: 'EUR',
          },
        });
        break;

      case 'volunteer':
        response = await strapi.create('volunteers', {
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            availability: data.availability,
            skills: data.skills,
            status: 'pending',
            languages: ['nl', 'en'],
            emergencyContact: {
              name: '',
              phone: '',
              relationship: '',
            },
          },
        });
        break;

      case 'partner':
        response = await strapi.create('partners', {
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            organization: data.organization,
            status: 'pending',
            partnershipType: 'cultural',
            description: data.message,
          },
        });
        break;

      case 'sponsor':
        response = await strapi.create('sponsors', {
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            organization: data.organization,
            tier: data.sponsorshipTier.toLowerCase(),
            amount: data.sponsorshipTier === 'Bronze' ? 500 : data.sponsorshipTier === 'Silver' ? 1000 : 2500,
            status: 'pending',
            startDate: new Date(),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            description: data.message,
          },
        });
        break;

      default:
        return res.status(400).json({ message: 'Invalid support type' });
    }

    // Send notification email
    await sendNotificationEmail(type, data);

    return res.status(200).json(response);
  } catch (error) {
    console.error('Support submission error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function sendNotificationEmail(type: string, data: any) {
  // Email gönderme işlemi burada yapılacak
  // Örnek: SendGrid, Nodemailer vb. kullanılabilir
}
