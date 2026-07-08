# Shopify Custom Builder Backend

This is a small Node.js + Express backend for your Shopify custom builder page.

## Endpoint
- `POST /api/custom-builder/upload`

It accepts:
- `original_upload` → customer uploaded image
- `merged_preview` → merged preview image from the builder canvas

Then it uploads both to Cloudinary and returns public URLs.

## Install
```bash
npm install
```

## Environment
Copy `.env.example` to `.env` and fill it:

```env
PORT=4000
FRONTEND_ORIGIN=https://your-store.myshopify.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Run
```bash
npm run dev
```

## Shopify frontend fetch
Point your `custom-builder.liquid` upload request to:

```js
fetch('https://your-backend-domain.com/api/custom-builder/upload', {
  method: 'POST',
  body: formData
});
```

## Success response
```json
{
  "success": true,
  "uploaded_image_url": "https://res.cloudinary.com/...",
  "merged_preview_url": "https://res.cloudinary.com/..."
}
```
