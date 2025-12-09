# Stripe Webhook Setup Guide

This guide will walk you through setting up the Stripe webhook so emails are sent automatically after payment.

## Prerequisites

- ✅ Your site must be deployed to Vercel first (so you have a URL)
- ✅ You need your Vercel project URL

## Step-by-Step Instructions

### Step 1: Deploy to Vercel (If Not Already Done)

1. **Push your code to GitHub** (if not already)
2. **Deploy to Vercel**:
   - Go to https://vercel.com/dashboard
   - Import your GitHub repository
   - Deploy (or it will auto-deploy if already connected)
3. **Note your Vercel URL**: `https://your-project.vercel.app`

### Step 2: Set Up Webhook in Stripe Dashboard

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com
2. **Navigate to**: Developers → Webhooks (or click "Webhooks" in the left sidebar)
3. **Click**: "Add endpoint" button (top right)
4. **Enter endpoint URL**:
   ```
   https://your-project.vercel.app/api/webhook
   ```
   Replace `your-project` with your actual Vercel project name
5. **Select events to listen to**:
   - Click "Select events"
   - Check: `checkout.session.completed`
   - Click "Add events"
6. **Click**: "Add endpoint"

### Step 3: Get Your Webhook Signing Secret

1. **After creating the webhook**, click on it in the list
2. **Find "Signing secret"** section
3. **Click "Reveal"** or "Click to reveal"
4. **Copy the secret** (starts with `whsec_`)
   - ⚠️ **Important**: Copy this immediately - you can only see it once!
   - It looks like: `whsec_AbC123XyZ789...`

### Step 4: Add Webhook Secret to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**
3. **Go to**: Settings → Environment Variables
4. **Add new variable**:
   - **Name**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: Paste your webhook secret (the `whsec_...` value)
   - **Environments**: Select all three (Production, Preview, Development)
5. **Click**: "Save"
6. **Redeploy** your project (or push a new commit to trigger redeploy)

### Step 5: Test the Webhook

1. **In Stripe Dashboard** → Webhooks → Your endpoint
2. **Click**: "Send test webhook" button
3. **Select**: `checkout.session.completed` event
4. **Click**: "Send test webhook"
5. **Check the logs**:
   - Should show "200" success response
   - Check Vercel function logs to see if email was sent

### Step 6: Test Full Payment Flow

1. **Go to your store page** on your deployed site
2. **Click "Purchase Template"**
3. **Use Stripe test card**:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)
4. **Complete the payment**
5. **Check**:
   - ✅ Redirected to success page
   - ✅ Download button appears
   - ✅ Email received with download link

## Troubleshooting

### Webhook Not Receiving Events

**Check:**
- ✅ Webhook URL is correct (no typos)
- ✅ Your site is deployed and accessible
- ✅ Webhook secret is added to Vercel
- ✅ You redeployed after adding the secret

**Test:**
- Use "Send test webhook" in Stripe Dashboard
- Check Vercel function logs: Deployments → Your deployment → Functions → webhook

### Webhook Returns 400 Error

**Common causes:**
- Webhook secret mismatch (check it's correct in Vercel)
- Wrong webhook URL
- Missing environment variables

**Fix:**
- Verify `STRIPE_WEBHOOK_SECRET` in Vercel matches the one in Stripe
- Make sure you redeployed after adding the secret

### Email Not Sending

**Check:**
- ✅ `RESEND_API_KEY` is set in Vercel
- ✅ Resend API key is valid
- ✅ Check Resend dashboard for email logs
- ✅ Check Vercel function logs for errors

### Webhook URL Format

Your webhook URL should be:
```
https://your-project-name.vercel.app/api/webhook
```

**NOT:**
- ❌ `https://your-project-name.vercel.app/webhook`
- ❌ `https://your-project-name.vercel.app/api/webhook.js`
- ❌ `http://your-project-name.vercel.app/api/webhook` (must be HTTPS)

## Test Mode vs Live Mode

- **Test mode**: Use test keys and test webhook secret
- **Live mode**: Use live keys and live webhook secret
- You need to set up webhooks separately for test and live modes

## Quick Checklist

- [ ] Site deployed to Vercel
- [ ] Webhook endpoint created in Stripe
- [ ] Webhook URL: `https://your-project.vercel.app/api/webhook`
- [ ] Event selected: `checkout.session.completed`
- [ ] Webhook secret copied from Stripe
- [ ] `STRIPE_WEBHOOK_SECRET` added to Vercel
- [ ] Project redeployed after adding secret
- [ ] Test webhook sent successfully
- [ ] Test payment completed
- [ ] Email received with download link

## Need Help?

- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Vercel Function Logs](https://vercel.com/docs/functions#function-logs)
- Check your Vercel deployment logs for errors

