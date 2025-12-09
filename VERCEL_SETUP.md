# Vercel Setup Guide for Stripe Integration

This guide will walk you through setting up Vercel to host your site and handle Stripe payments.

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

Or use npx (no installation needed):
```bash
npx vercel
```

## Step 2: Install Stripe Package

You'll need Stripe installed for your serverless functions:

```bash
npm install stripe
```

## Step 3: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate with Vercel.

## Step 4: Link Your Project

From your project directory:

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time) or Yes (if you've deployed before)
- **Project name?** → `ben-merlotti-website` (or your preferred name)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

## Step 5: Set Environment Variables

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

   **For Production:**
   - `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_live_your_live_publishable_key`
   - `STRIPE_SECRET_KEY` = `sk_live_your_live_secret_key`

   **For Preview/Development:**
   - `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_test_your_test_publishable_key`
   - `STRIPE_SECRET_KEY` = `sk_test_your_test_secret_key`

### Option B: Via CLI

```bash
# Production
vercel env add VITE_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_SECRET_KEY production

# Preview (for pull requests)
vercel env add VITE_STRIPE_PUBLISHABLE_KEY preview
vercel env add STRIPE_SECRET_KEY preview

# Development
vercel env add VITE_STRIPE_PUBLISHABLE_KEY development
vercel env add STRIPE_SECRET_KEY development
```

When prompted, paste your Stripe keys.

## Step 6: Update Your Frontend Code

Make sure your `ProductDetail.jsx` uses the correct API endpoint. It should already be set to `/api/create-checkout-session` which will work with Vercel.

## Step 7: Deploy

### First Deployment

```bash
vercel --prod
```

This will:
1. Build your React app
2. Deploy your serverless functions
3. Make everything live

### Future Deployments

You can either:
- **Push to GitHub** (if connected): Vercel will auto-deploy
- **Manual deploy**: Run `vercel --prod` again

## Step 8: Connect GitHub (Optional but Recommended)

1. Go to https://vercel.com/dashboard
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add environment variables (same as Step 5)
6. Click **Deploy**

Now every push to your main branch will auto-deploy!

## Step 9: Set Up Custom Domain (Optional)

If you want to use your custom domain (benmerlotti.com):

1. Go to **Settings** → **Domains**
2. Add your domain
3. Follow Vercel's DNS instructions
4. Update your DNS records as instructed

## Step 10: Test the Integration

1. Visit your deployed site
2. Go to the Store page
3. Click "Purchase Template"
4. Use Stripe test card: `4242 4242 4242 4242`
5. Complete the test payment
6. Verify you're redirected to the success page

## Troubleshooting

### Functions Not Working?

- Check that `api/create-checkout-session.js` exists
- Verify environment variables are set correctly
- Check Vercel function logs: **Deployments** → Click deployment → **Functions** tab

### Environment Variables Not Loading?

- Make sure variables are set for the correct environment (Production/Preview/Development)
- Redeploy after adding new variables: `vercel --prod`
- Check variable names match exactly (case-sensitive)

### Build Errors?

- Check Vercel build logs in the dashboard
- Make sure all dependencies are in `package.json`
- Verify `vercel.json` is configured correctly

## Project Structure

Your project should look like this:

```
benMerlottiWebsite/
├── api/
│   └── create-checkout-session.js  # Serverless function
├── src/
│   └── pages/
│       ├── ProductDetail.jsx       # Uses Stripe
│       └── Success.jsx             # Success page
├── vercel.json                      # Vercel config
├── package.json
└── ...
```

## Next Steps

After Vercel is set up:

1. **Set up Stripe webhook** for email delivery (see `EMAIL_SETUP.md`)
2. **Configure email service** (Resend, SendGrid, etc.) - see `EMAIL_SETUP.md`
3. **Test with real payments** (use test mode first!)
4. **Switch to live mode** when ready

## Email Delivery Setup

See `EMAIL_SETUP.md` for complete instructions on:
- Setting up email service (Resend recommended)
- Configuring webhooks
- Setting up download links
- Testing the full flow

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview (for testing)
vercel

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel remove
```

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Stripe + Vercel Guide](https://vercel.com/guides/getting-started-with-stripe)

