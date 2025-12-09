# Setup Checklist - Verify Everything is Ready

## ✅ Completed
- [x] Resend installed
- [x] Resend API key added to Vercel
- [x] Webhook code configured

## Required Environment Variables in Vercel

Check that you have ALL of these in Vercel Dashboard → Settings → Environment Variables:

### Essential (Required for payments to work):
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_test_...` or `pk_live_...`
- [ ] `STRIPE_SECRET_KEY` = `sk_test_...` or `sk_live_...` (your restricted key)
- [ ] `VITE_DOWNLOAD_LINK` = your Google Drive/Dropbox download URL

### For Email Delivery:
- [x] `RESEND_API_KEY` = your Resend API key ✅ (you have this!)
- [ ] `STRIPE_WEBHOOK_SECRET` = `whsec_...` (from Stripe webhook settings)

## Next Steps

### 1. Set Up Stripe Webhook (For Email Delivery)

1. **Deploy to Vercel first** (so you have a URL)
2. **Go to Stripe Dashboard** → Developers → Webhooks
3. **Click "Add endpoint"**
4. **Enter your webhook URL**: `https://your-project.vercel.app/api/webhook`
5. **Select event**: `checkout.session.completed`
6. **Copy the webhook signing secret** (starts with `whsec_`)
7. **Add to Vercel**: `STRIPE_WEBHOOK_SECRET` = your webhook secret

### 2. Test the Flow

1. **Use Stripe test card**: `4242 4242 4242 4242`
2. **Complete a test purchase**
3. **Check**:
   - ✅ Redirects to success page
   - ✅ Download button appears
   - ✅ Email received with download link

### 3. Upload Your Template File

Upload your 110MB template to:
- Google Drive (easiest)
- Dropbox
- AWS S3
- Or any cloud storage

Get the direct download link and add to Vercel as `VITE_DOWNLOAD_LINK`

## Quick Test

Once everything is set up, you can test by:
1. Going to your store page
2. Clicking "Purchase Template"
3. Using test card: `4242 4242 4242 4242`
4. Any future date for expiry
5. Any CVC
6. Any ZIP

## Status

You're almost there! Just need:
- Stripe keys in Vercel
- Download link in Vercel  
- Webhook set up in Stripe (for email)
- Webhook secret in Vercel

