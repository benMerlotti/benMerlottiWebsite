# Simple Download Setup Guide

Since your template is 110MB (too large for email), here's the easiest way to deliver it.

## Option 1: Google Drive (Easiest & Free)

1. **Upload your template zip to Google Drive**
2. **Right-click the file** → **Share** → **Get link**
3. **Change access to "Anyone with the link"**
4. **Copy the shareable link**
5. **Convert to direct download link:**
   - Replace `file/d/FILE_ID/view?usp=sharing` 
   - With `uc?export=download&id=FILE_ID`
   - Or use: `https://drive.google.com/uc?export=download&id=YOUR_FILE_ID`

6. **Add to environment variable:**
   - In Vercel: `VITE_DOWNLOAD_LINK` = your Google Drive download link

## Option 2: Dropbox (Also Easy)

1. **Upload to Dropbox**
2. **Right-click** → **Share** → **Create link**
3. **Change the `?dl=0` at the end to `?dl=1`** to force download
4. **Add to environment variable:**
   - `VITE_DOWNLOAD_LINK` = your Dropbox link with `?dl=1`

## Option 3: AWS S3 (More Professional)

1. **Create S3 bucket**
2. **Upload file** (make it public or use signed URLs)
3. **Get the public URL**
4. **Add to environment variable:**
   - `VITE_DOWNLOAD_LINK` = your S3 URL

## Option 4: Your Own Server/CDN

If you have hosting, just upload the file and use the direct URL.

## Setup Steps

1. **Upload your 110MB template file** to one of the services above
2. **Get the direct download link**
3. **Add to Vercel environment variables:**
   - Variable name: `VITE_DOWNLOAD_LINK`
   - Value: Your download URL
4. **Redeploy** (or it will auto-update on next deploy)

## That's It!

No email needed. After payment, customers will see the download button immediately on the success page.

## Security (Optional)

If you want to make it more secure, you can:
- Verify the payment session before showing the download link
- Use time-limited signed URLs (AWS S3 supports this)
- Add password protection to the file

But for simplicity, a direct link works great!

