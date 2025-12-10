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
    // For Vercel serverless functions, we need the raw body string
    // Vercel parses JSON automatically, which breaks Stripe signature verification
    let rawBody;
    
    // Check for rawBody property (some frameworks provide this)
    if (req.rawBody && typeof req.rawBody === 'string') {
      rawBody = req.rawBody;
    } 
    // Check if body is already a string (ideal case)
    else if (typeof req.body === 'string') {
      rawBody = req.body;
    } 
    // Check if body is a Buffer
    else if (Buffer.isBuffer(req.body)) {
      rawBody = req.body.toString('utf8');
    } 
    // If Vercel has parsed it as JSON object, we need to reconstruct it
    // This is problematic because JSON.stringify might not match Stripe's exact format
    else if (req.body && typeof req.body === 'object') {
      // Try to stringify with no spaces to match Stripe's format more closely
      rawBody = JSON.stringify(req.body);
    } 
    else {
      throw new Error('Unable to get request body');
    }
    
    // Log for debugging (remove in production)
    console.log('Body type:', typeof req.body, 'Body is object?', typeof req.body === 'object');
    
    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    }
    
    if (!sig) {
      throw new Error('Missing stripe-signature header');
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
