import { NextApiRequest, NextApiResponse } from 'next';
import { DonationsResponse } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DonationsResponse>
) {
  try {
    const { locale = 'en' } = req.query;
    
    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/donations?locale=${locale}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch donations');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } }
    });
  }
}
