import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Test Event Creation
    const eventResponse = await fetch('http://localhost:3000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Event',
        description: 'Test Event Description',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000).toISOString(),
        location: 'Amsterdam',
        eventType: 'cultural',
        status: 'draft',
        featured: false
      }),
    });

    const eventData = await eventResponse.json();

    // Test Event Reading
    const getEventResponse = await fetch('http://localhost:3000/api/events?locale=en');
    const getEventData = await getEventResponse.json();

    res.status(200).json({
      createEvent: eventData,
      getEvents: getEventData
    });
  } catch (error) {
    console.error('Test failed:', error);
    res.status(500).json({ error: 'Test failed' });
  }
}
