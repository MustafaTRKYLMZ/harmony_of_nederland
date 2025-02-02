import { NextApiRequest, NextApiResponse } from 'next';
import { SponsorsResponse } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SponsorsResponse>
) {
  try {
    const { locale = 'en' } = req.query;
    
    const response = await fetch(
      `${process.env.STRAPI_API_URL}/api/sponsors?locale=${locale}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch sponsors');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    res.status(500).json({
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } }
    });
  }
}
