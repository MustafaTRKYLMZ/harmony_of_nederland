import { NextApiRequest, NextApiResponse } from 'next';
import { EventsResponse } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventsResponse | any>
) {
  if (req.method === 'POST') {
    console.log('Creating event with data:', req.body);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({ data: req.body }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Strapi error:', errorData);
        throw new Error(errorData?.error?.message || 'Failed to create event');
      }

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const data = await response.json();
      return res.status(201).json(data);
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ error: 'Failed to create event' });
    }
  }

  // GET request handling
  try {
    const { locale = 'en' } = req.query;
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/events?locale=${locale}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } }
    });
  }
}
