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

// Helper to get raw body from Vercel request
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk.toString('utf8');
    });
    req.on('end', () => {
      resolve(data);
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Try to get raw body from request stream first
    // This is the most reliable way for Stripe webhooks
    let rawBody;
    
    // Check if we can read from the stream (Vercel might have already consumed it)
    if (req.readable && !req.body) {
      rawBody = await getRawBody(req);
    } else if (typeof req.body === 'string') {
      // Already a string - use as-is (this is ideal)
      rawBody = req.body;
    } else if (Buffer.isBuffer(req.body)) {
      // Buffer - convert to string
      rawBody = req.body.toString('utf8');
    } else if (req.body && typeof req.body === 'object') {
      // Vercel has parsed it as JSON - this is problematic for signature verification
      // Try to stringify it back, but this might not match exactly
      rawBody = JSON.stringify(req.body);
      console.warn('Warning: Using stringified body - signature verification may fail if formatting differs');
    } else {
      throw new Error('Unable to get request body');
    }
    
    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    }
    
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      webhookSecret
    );
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
