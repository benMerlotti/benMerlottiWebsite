// Vercel serverless function for Stripe Checkout
// This file should be in the 'api' folder at the root of your project

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { productName, price } = req.body;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName || 'VHS KARAOKE TEXT TEMPLATE',
              description: 'Professional After Effects template featuring retro VHS-style karaoke text animations.',
            },
            unit_amount: price || 1999, // $19.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/store/vhs-karaoke-text-template`,
      metadata: {
        productName: productName || 'VHS KARAOKE TEXT TEMPLATE',
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
}

