# Local Development Setup

This guide will help you set up and test your Stripe integration locally.

## Step 1: Create Your `.env` File

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Stripe test keys:
   - Get your keys from: https://dashboard.stripe.com/apikeys
   - Use **test keys** (start with `pk_test_` and `sk_test_`)

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Run Local Development

You have two options for testing locally:

### Option A: Vite Dev Server (Frontend Only)

This runs just the frontend. The Stripe API calls will fail unless you're using Vercel CLI (see Option B).

```bash
npm run dev
```

### Option B: Vercel CLI (Recommended - Full Stack)

This runs both frontend and API endpoints locally, just like production.

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link your project** (first time only):
   ```bash
   vercel link
   ```
   - Select your existing project when prompted

4. **Pull environment variables from Vercel** (optional):
   ```bash
   vercel env pull .env.local
   ```
   This will download your Vercel environment variables to `.env.local`

5. **Run the dev server**:
   ```bash
   vercel dev
   ```
   This will:
   - Start the Vite dev server
   - Run your API endpoints (`/api/*`)
   - Use your `.env` file for environment variables
   - Be available at `http://localhost:3000`

## Testing Stripe Locally

1. **Start the dev server** (using `vercel dev` for full functionality)

2. **Navigate to**: `http://localhost:3000/store/vhs-karaoke-text-template`

3. **Click "Purchase Template"**

4. **Use Stripe test card**:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)

5. **Complete the checkout** - You should be redirected to the success page

## Environment Variables

### Required for Payments:
- `VITE_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key (frontend)
- `STRIPE_SECRET_KEY` - Your Stripe secret key (backend/API)

### Optional:
- `VITE_DOWNLOAD_LINK` - Download link for the template
- `RESEND_API_KEY` - For email delivery
- `STRIPE_WEBHOOK_SECRET` - For webhook verification

## Troubleshooting

### "Stripe is not configured" error
- Check that your `.env` file exists and has the correct keys
- Make sure keys start with `pk_test_` and `sk_test_` for test mode
- Restart your dev server after changing `.env`

### API endpoint not working
- Make sure you're using `vercel dev` (not just `npm run dev`)
- Check that `STRIPE_SECRET_KEY` is set in your `.env` file
- Check the terminal for error messages

### CORS errors
- This shouldn't happen with `vercel dev` since it runs everything locally
- If using `npm run dev`, you'll need to use `vercel dev` instead

## Notes

- `.env` is gitignored - never commit your actual keys
- `.env.example` is a template you can commit
- Use **test keys** for local development
- Switch to **live keys** only in Vercel production environment

