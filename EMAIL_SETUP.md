# Email Delivery Setup Guide

This guide will help you set up automated email delivery after successful Stripe payments.

## Overview

When a customer completes a payment, Stripe sends a webhook to your server. The webhook handler then sends an email with the download link.

## Step 1: Choose an Email Service

### Option A: Resend (Recommended - Easiest)

**Pros:**
- Simple API
- Free tier: 3,000 emails/month
- Great developer experience
- Built for transactional emails

**Setup:**
1. Sign up at https://resend.com
2. Get your API key
3. Verify your domain (optional but recommended)
4. Install: `npm install resend`

### Option B: SendGrid

**Pros:**
- Industry standard
- Free tier: 100 emails/day
- Good deliverability

**Setup:**
1. Sign up at https://sendgrid.com
2. Create API key
3. Install: `npm install @sendgrid/mail`

### Option C: Mailgun

**Pros:**
- Good free tier
- Reliable delivery

**Setup:**
1. Sign up at https://mailgun.com
2. Get API key
3. Install: `npm install mailgun.js`

### Option D: Nodemailer (SMTP)

**Pros:**
- Works with any SMTP provider (Gmail, Outlook, etc.)
- Free if using personal email

**Setup:**
1. Install: `npm install nodemailer`
2. Configure SMTP settings

## Step 2: Update Your Restricted Key Permissions

In Stripe Dashboard → API Keys → Your Restricted Key, enable:

- ✅ `checkout.sessions:write` (already have)
- ✅ `checkout.sessions:read` (to read session details)
- ✅ `events:read` (to process webhook events)

## Step 3: Configure Email Service

### Using Resend (Recommended)

1. **Install package:**
   ```bash
   npm install resend
   ```

2. **Update `api/webhook.js`:**
   - Uncomment the Resend code section
   - Replace `process.env.RESEND_API_KEY` with your key

3. **Add to Vercel environment variables:**
   - `RESEND_API_KEY` = your Resend API key

4. **Update the `sendEmail` function** in `api/webhook.js` to use Resend

### Using SendGrid

1. **Install package:**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Update `api/webhook.js`:**
   - Uncomment the SendGrid code section

3. **Add to Vercel environment variables:**
   - `SENDGRID_API_KEY` = your SendGrid API key

## Step 4: Set Up Download Link

You have a few options for hosting your template file:

### Option A: Direct Link (Simple)

1. Upload your template to:
   - Google Drive (make shareable)
   - Dropbox (create share link)
   - AWS S3 (public bucket)
   - Your own server

2. Add to Vercel environment variables:
   - `DOWNLOAD_LINK` = your direct download URL

### Option B: Time-Limited Signed URLs (More Secure)

Generate signed URLs that expire after 7 days. This requires:
- AWS S3 with signed URLs, or
- Custom backend to generate temporary links

## Step 5: Set Up Stripe Webhook

1. **Get your webhook endpoint URL:**
   - After deploying to Vercel, your webhook URL will be:
   - `https://your-project.vercel.app/api/webhook`

2. **In Stripe Dashboard:**
   - Go to **Developers** → **Webhooks**
   - Click **Add endpoint**
   - Enter your webhook URL
   - Select events to listen for:
     - `checkout.session.completed` ✅ (required)

3. **Get webhook signing secret:**
   - After creating the webhook, click on it
   - Copy the **Signing secret** (starts with `whsec_`)
   - Add to Vercel environment variables:
     - `STRIPE_WEBHOOK_SECRET` = your webhook secret

## Step 6: Update Environment Variables in Vercel

Add these to your Vercel project:

**Required:**
- `STRIPE_SECRET_KEY` = your Stripe secret key
- `STRIPE_WEBHOOK_SECRET` = your webhook signing secret
- `DOWNLOAD_LINK` = your template download URL

**Email Service (choose one):**
- `RESEND_API_KEY` = your Resend API key (if using Resend)
- `SENDGRID_API_KEY` = your SendGrid API key (if using SendGrid)
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` (if using SMTP)

## Step 7: Test the Flow

1. **Test payment:**
   - Use Stripe test card: `4242 4242 4242 4242`
   - Complete a test purchase

2. **Check webhook logs:**
   - Stripe Dashboard → Webhooks → Your endpoint → Logs
   - Should show successful webhook delivery

3. **Check email:**
   - Verify you received the email with download link
   - Test the download link works

## Step 8: Customize Email Template

Edit the HTML in `api/webhook.js` to match your branding:

```html
<h2>Thank you for your purchase!</h2>
<p>Here's your download link for the <strong>VHS KARAOKE TEXT TEMPLATE</strong>:</p>
<p><a href="${downloadLink}">Download Template</a></p>
<p>This link will be valid for 7 days.</p>
```

## Troubleshooting

### Webhook Not Receiving Events

- Check webhook URL is correct
- Verify webhook secret is set correctly
- Check Vercel function logs for errors
- Test webhook in Stripe Dashboard → Webhooks → Send test webhook

### Emails Not Sending

- Verify email service API key is correct
- Check email service dashboard for errors
- Check Vercel function logs
- Verify sender email is verified/authorized

### Download Link Issues

- Test the link manually
- Check if link requires authentication
- Verify link is publicly accessible (if using direct link)

## Security Best Practices

1. **Never expose download links in frontend code**
2. **Use time-limited signed URLs** for better security
3. **Validate webhook signatures** (already implemented)
4. **Store sensitive keys in environment variables** (not in code)
5. **Use restricted Stripe keys** (you're already doing this!)

## Example: Complete Resend Setup

1. Install: `npm install resend`
2. Sign up at resend.com and get API key
3. Update `api/webhook.js` - uncomment Resend section
4. Add `RESEND_API_KEY` to Vercel
5. Add `DOWNLOAD_LINK` to Vercel
6. Deploy and test!

## Need Help?

- [Resend Documentation](https://resend.com/docs)
- [SendGrid Documentation](https://docs.sendgrid.com)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)

