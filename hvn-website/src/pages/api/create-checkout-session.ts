import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { eventId, amount } = req.body;

    // Checkout session oluştur
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'ideal'], // iDEAL for Dutch payments
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Event Ticket #${eventId}`,
            },
            unit_amount: amount * 100, // Stripe amounts are in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/events`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
