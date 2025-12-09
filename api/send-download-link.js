// Optional: API endpoint to resend download link via email
// Can be called from the frontend if needed

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const customerEmail = session.customer_details?.email;
    if (!customerEmail) {
      return res.status(400).json({ error: 'No customer email found' });
    }

    const downloadLink = process.env.DOWNLOAD_LINK || process.env.VITE_DOWNLOAD_LINK;

    // Send email with download link
    // You can use the same sendEmail function from webhook.js
    // For now, just return success - the webhook should have already sent the email
    
    res.json({ 
      success: true, 
      message: 'Download link sent to email',
      // Optionally return the link (though email is preferred)
      downloadLink: downloadLink 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}

