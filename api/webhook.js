// Vercel serverless function for Stripe webhooks
// Handles payment confirmations and sends email with download link

import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(customerEmail, downloadLink, orderId) {
  try {
    // Use custom email from env, or fallback to Resend default for testing
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: customerEmail,
      subject: 'Your VHS Karaoke Text Template Download',
      html: `
        <h2>Thank you for your purchase!</h2>
        <p>Here's your download link for the <strong>VHS KARAOKE TEXT TEMPLATE</strong>:</p>
        <p><a href="${downloadLink}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Download Template (110 MB)</a></p>
        <p>This link will remain active. If you need to access it again, your Order ID is: <strong>${orderId}</strong></p>
        <p>If you have any questions, please reply to this email.</p>
        <p>Best regards,<br>Ben Merlotti</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Vercel automatically parses JSON, which breaks Stripe signature verification
    // We need to get the raw body, but Vercel has already parsed it
    // Solution: Read from the request stream if available, or reconstruct carefully
    let rawBody;
    
    // Try to get raw body from various possible locations
    if (req.rawBody) {
      rawBody = typeof req.rawBody === 'string' ? req.rawBody : req.rawBody.toString('utf8');
    } else if (typeof req.body === 'string') {
      rawBody = req.body;
    } else if (Buffer.isBuffer(req.body)) {
      rawBody = req.body.toString('utf8');
    } else if (req.body && typeof req.body === 'object') {
      // Vercel has parsed it - we need to reconstruct it
      // Use JSON.stringify with no formatting to match Stripe's compact format
      rawBody = JSON.stringify(req.body);
    } else {
      throw new Error('Unable to get request body');
    }
    
    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    }
    
    if (!sig) {
      throw new Error('Missing stripe-signature header');
    }
    
    // For Vercel, we may need to skip signature verification temporarily
    // OR use a workaround. Let's try with the reconstructed body first
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        webhookSecret
      );
    } catch (constructError) {
      // Signature verification failed - this is expected with Vercel's JSON parsing
      // WARNING: This is less secure but necessary for Vercel's automatic JSON parsing
      console.warn('Signature verification failed, parsing event manually (less secure)');
      console.warn('Error:', constructError.message);
      
      // Parse the event manually - we lose signature verification but can still process
      if (req.body && req.body.type) {
        event = req.body;
        
        // Additional security: Verify the event by fetching it from Stripe API
        // This ensures the event is legitimate even without signature verification
        try {
          const verifiedEvent = await stripe.events.retrieve(event.id);
          if (!verifiedEvent || verifiedEvent.type !== event.type) {
            throw new Error('Event verification failed - event does not match Stripe records');
          }
          console.log('Event verified via Stripe API:', event.id);
          // Use the verified event from Stripe
          event = verifiedEvent;
        } catch (verifyError) {
          console.error('Failed to verify event via Stripe API:', verifyError.message);
          throw new Error('Cannot verify webhook event - signature verification failed and API verification failed');
        }
      } else {
        throw new Error('Cannot parse webhook event - signature verification failed and body is not a valid event');
      }
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Get customer email
    const customerEmail = session.customer_details?.email;
    
    if (!customerEmail) {
      console.error('No customer email found in session');
      return res.status(400).json({ error: 'No customer email' });
    }

    // Get download link from environment variable
    const downloadLink = process.env.DOWNLOAD_LINK || process.env.VITE_DOWNLOAD_LINK || 'https://your-download-link.com/template.zip';
    
    try {
      // Send email with download link (not the file, just the link)
      await sendEmail(customerEmail, downloadLink, session.id);
      
      console.log(`Email sent successfully to ${customerEmail} with download link`);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the webhook - log the error but return success
      // The user can still access the link on the success page
    }
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
}
