# Stripe Integration Setup Guide

This guide will help you set up Stripe payment processing for your After Effects template store.

## Overview

Since your site is hosted on GitHub Pages (static hosting), you'll need a backend service to handle Stripe payments securely. The recommended approach is to use **serverless functions** on Vercel or Netlify.

## Step 1: Get Stripe API Keys

1. Sign up for a Stripe account at https://stripe.com
2. Go to the [Stripe Dashboard](https://dashboard.stripe.com)
3. Navigate to **Developers** → **API keys**
4. Copy your **Publishable key** and **Secret key**
   - Use **Test keys** for development
   - Use **Live keys** for production

## Step 2: Set Up Environment Variables

### For Local Development

Create a `.env` file in your project root:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### For Production (Vercel/Netlify)

Add these environment variables in your hosting platform's dashboard:
- `VITE_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_SECRET_KEY` - Your Stripe secret key (backend only, not exposed to frontend)

## Step 3: Choose a Backend Solution

### Option A: Vercel Serverless Functions (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Create API directory structure**:
   ```
   api/
     create-checkout-session.js
   ```

3. **Create the serverless function** (`api/create-checkout-session.js`):
   ```javascript
   import Stripe from 'stripe';

   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

   export default async function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ message: 'Method not allowed' });
     }

     try {
       const { productName, price } = req.body;

       const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         line_items: [
           {
             price_data: {
               currency: 'usd',
               product_data: {
                 name: productName,
               },
               unit_amount: price, // Price in cents
             },
             quantity: 1,
           },
         ],
         mode: 'payment',
         success_url: `${req.headers.origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${req.headers.origin}/store/vhs-karaoke-text-template`,
         metadata: {
           productName: productName,
         },
       });

       res.status(200).json({ sessionId: session.id });
     } catch (error) {
       console.error('Error creating checkout session:', error);
       res.status(500).json({ error: error.message });
     }
   }
   ```

4. **Install Stripe package**:
   ```bash
   npm install stripe
   ```

5. **Deploy to Vercel**:
   ```bash
   vercel
   ```

### Option B: Netlify Functions

1. **Create Netlify configuration** (`netlify.toml`):
   ```toml
   [build]
     functions = "netlify/functions"
   ```

2. **Create function** (`netlify/functions/create-checkout-session.js`):
   ```javascript
   const Stripe = require('stripe');
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

   exports.handler = async (event, context) => {
     if (event.httpMethod !== 'POST') {
       return {
         statusCode: 405,
         body: JSON.stringify({ message: 'Method not allowed' }),
       };
     }

     try {
       const { productName, price } = JSON.parse(event.body);

       const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         line_items: [
           {
             price_data: {
               currency: 'usd',
               product_data: {
                 name: productName,
               },
               unit_amount: price,
             },
             quantity: 1,
           },
         ],
         mode: 'payment',
         success_url: `${event.headers.origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${event.headers.origin}/store/vhs-karaoke-text-template`,
         metadata: {
           productName: productName,
         },
       });

       return {
         statusCode: 200,
         body: JSON.stringify({ sessionId: session.id }),
       };
     } catch (error) {
       return {
         statusCode: 500,
         body: JSON.stringify({ error: error.message }),
       };
     }
   };
   ```

3. **Install Stripe**:
   ```bash
   npm install stripe
   ```

### Option C: Simple Node.js Backend

If you prefer a dedicated backend server, you can create a simple Express.js server:

1. **Create `server.js`**:
   ```javascript
   const express = require('express');
   const Stripe = require('stripe');
   const cors = require('cors');
   const app = express();

   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

   app.use(cors());
   app.use(express.json());

   app.post('/api/create-checkout-session', async (req, res) => {
     try {
       const { productName, price } = req.body;

       const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         line_items: [
           {
             price_data: {
               currency: 'usd',
               product_data: {
                 name: productName,
               },
               unit_amount: price,
             },
             quantity: 1,
           },
         ],
         mode: 'payment',
         success_url: `${req.headers.origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${req.headers.origin}/store/vhs-karaoke-text-template`,
         metadata: {
           productName: productName,
         },
       });

       res.json({ sessionId: session.id });
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

   const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

2. **Install dependencies**:
   ```bash
   npm install express stripe cors
   ```

3. **Update frontend API URL** in `ProductDetail.jsx` to point to your backend server.

## Step 4: Set Up Webhook for Email Delivery

After a successful payment, Stripe will send a webhook to your backend. You'll need to:

1. **Set up webhook endpoint** to receive payment confirmations
2. **Send email** with download link using a service like:
   - SendGrid
   - Mailgun
   - AWS SES
   - Or use Stripe's built-in email receipts

### Example Webhook Handler (Vercel)

Create `api/webhook.js`:

```javascript
import Stripe from 'stripe';
import sgMail from '@sendgrid/mail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Send email with download link
    const msg = {
      to: session.customer_details.email,
      from: 'your-email@example.com',
      subject: 'Your VHS Karaoke Text Template Download',
      html: `
        <h2>Thank you for your purchase!</h2>
        <p>Here's your download link for the VHS KARAOKE TEXT TEMPLATE:</p>
        <a href="YOUR_DOWNLOAD_LINK_HERE">Download Template</a>
        <p>If you have any questions, please reply to this email.</p>
      `,
    };

    await sgMail.send(msg);
  }

  res.json({ received: true });
}
```

## Step 5: Create Success Page

Create a success page component (`src/pages/Success.jsx`) and add the route to show confirmation after payment.

## Step 6: Update Frontend API URL

Update the `handlePurchase` function in `ProductDetail.jsx` to use your actual API endpoint:

- **Vercel**: `/api/create-checkout-session`
- **Netlify**: `/.netlify/functions/create-checkout-session`
- **Custom backend**: `https://your-backend-url.com/api/create-checkout-session`

## Testing

1. Use Stripe's test mode with test card: `4242 4242 4242 4242`
2. Test the full flow: purchase → payment → email delivery
3. Switch to live mode when ready

## Security Notes

- Never expose your Stripe secret key in frontend code
- Always validate webhook signatures
- Use HTTPS in production
- Store download links securely (consider time-limited URLs)

## Need Help?

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

