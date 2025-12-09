# Vercel Environment Variables Checklist

Here are all the environment variables you need to add in Vercel.

## Required Variables

### 1. Stripe Keys

**For Frontend (Public):**
- `VITE_STRIPE_PUBLISHABLE_KEY`
  - Value: Your Stripe publishable key (starts with `pk_test_` or `pk_live_`)
  - Get it from: https://dashboard.stripe.com/apikeys
  - Add to: Production, Preview, AND Development environments

**For Backend (Secret):**
- `STRIPE_SECRET_KEY`
  - Value: Your Stripe secret key (starts with `sk_test_` or `sk_live_`)
  - Get it from: https://dashboard.stripe.com/apikeys
  - Add to: Production, Preview, AND Development environments
  - ⚠️ Use your restricted key if you created one

### 2. Download Link

- `VITE_DOWNLOAD_LINK`
  - Value: Your template download URL
  - Examples:
    - Google Drive: `https://drive.google.com/uc?export=download&id=YOUR_FILE_ID`
    - Dropbox: `https://www.dropbox.com/s/FILE_ID/template.zip?dl=1`
    - AWS S3: `https://your-bucket.s3.amazonaws.com/template.zip`
  - Add to: Production, Preview, AND Development environments

## Optional Variables (If Using Email Delivery)

### 3. Email Service (Choose One)

**Option A: Resend (Recommended)**
- `RESEND_API_KEY`
  - Value: Your Resend API key
  - Get it from: https://resend.com/api-keys
  - Add to: Production, Preview, AND Development environments

**Option B: SendGrid**
- `SENDGRID_API_KEY`
  - Value: Your SendGrid API key
  - Get it from: https://app.sendgrid.com/settings/api_keys

**Option C: SMTP (Nodemailer)**
- `SMTP_HOST` = your SMTP server (e.g., `smtp.gmail.com`)
- `SMTP_USER` = your email address
- `SMTP_PASSWORD` = your email password or app password

### 4. Webhook Secret (If Using Webhooks)

- `STRIPE_WEBHOOK_SECRET`
  - Value: Your webhook signing secret (starts with `whsec_`)
  - Get it from: Stripe Dashboard → Webhooks → Your endpoint → Signing secret
  - Add to: Production, Preview, AND Development environments
  - ⚠️ Different secret for test vs live mode

## Quick Setup Steps

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**
3. **Go to**: Settings → Environment Variables
4. **Add each variable** for all three environments:
   - Production
   - Preview
   - Development

## Minimum Required (Without Email)

If you're NOT using email delivery, you only need:

```
✅ VITE_STRIPE_PUBLISHABLE_KEY
✅ STRIPE_SECRET_KEY
✅ VITE_DOWNLOAD_LINK
```

## With Email Delivery

If you ARE using email delivery, add:

```
✅ VITE_STRIPE_PUBLISHABLE_KEY
✅ STRIPE_SECRET_KEY
✅ VITE_DOWNLOAD_LINK
✅ RESEND_API_KEY (or SENDGRID_API_KEY)
✅ STRIPE_WEBHOOK_SECRET
```

## Example Values (Test Mode)

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51AbC123...
STRIPE_SECRET_KEY=sk_test_51XyZ789...
VITE_DOWNLOAD_LINK=https://drive.google.com/uc?export=download&id=1ABC123XYZ
RESEND_API_KEY=re_AbC123XyZ789...
STRIPE_WEBHOOK_SECRET=whsec_AbC123XyZ789...
```

## Important Notes

- ⚠️ **Never commit these to Git** - they're already in `.gitignore`
- ⚠️ **Use test keys first** - Test everything before switching to live keys
- ⚠️ **Add to all environments** - Production, Preview, AND Development
- ⚠️ **Redeploy after adding** - New variables require a new deployment

## After Adding Variables

1. **Redeploy your project** (or push a new commit)
2. **Test the payment flow** with Stripe test card: `4242 4242 4242 4242`
3. **Verify download link works**
4. **Check email delivery** (if using email)

## Where to Get Each Key

- **Stripe Keys**: https://dashboard.stripe.com/apikeys
- **Resend API Key**: https://resend.com/api-keys
- **SendGrid API Key**: https://app.sendgrid.com/settings/api_keys
- **Webhook Secret**: Stripe Dashboard → Webhooks → Your endpoint
- **Download Link**: Upload file to Google Drive/Dropbox/S3 and get shareable link

