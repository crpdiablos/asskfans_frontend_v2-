# AsskFans Frontend v2 (Next.js + Tailwind, Stripe wired, extras)

This is a complete, deploy-ready frontend for asskfans.com.

## Features
- Tip flow: Stripe Checkout wired to your Replit backend
- (Optional) PayPal button (uses /api/paypal/create-order if your backend exposes it)
- Pages: Home, About, Contact, Terms, Privacy
- Success/Cancel routes: /tip/success and /tip/cancel
- Navbar, Footer, responsive layout
- Basic SEO tags, favicon, robots.txt, sitemap.xml (static placeholder)
- Health check button (pings backend /api/health)

## Quick Deploy (Vercel)
1) Create a new GitHub repo and upload these files.
2) Import the repo on Vercel.
3) In Vercel → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_API_URL = https://workspace.crpdiablos.repl.co`
4) Deploy.

## Backend (Replit) requirements
- CORS includes: `https://asskfans.com, https://www.asskfans.com, https://asskfans.vercel.app, http://localhost:3000`
- Stripe webhook (LIVE): `https://workspace.crpdiablos.repl.co/api/stripe/webhook`
- Secrets set: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_SUCCESS_URL`, `STRIPE_CANCEL_URL`
- (Optional PayPal) Expose a POST route `/api/paypal/create-order` that returns JSON `{ "approveUrl": "https://www.paypal.com/checkoutnow?token=..." }`

## Local Dev
```bash
npm install
cp .env.local.example .env.local
npm run dev
```
Open http://localhost:3000
