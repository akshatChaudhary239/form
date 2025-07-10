This is a Pdf gnerator project build in Next.js,tailwind CSS, Framer-motion and Puppeteer

## Getting Started

First, run the development server:

```bash
# 1. Clone
git clone https://github.com/your‑handle/pdf‑generator.git
cd pdf‑generator

# 2. Install deps (choose one)
npm install

# 3. Run locally
npm run dev
# open http://localhost:3000

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


How it works- 

~ page.tsx collects the five form fields and POSTs JSON to /api/generate-pdf.

~ route.ts launches a headless copy of Chromium (provided by @sparticuz/chromium‑min), injects the HTML template, renders, and returns the PDF buffer.

~ The browser receives a blob, creates a temporary URL, and triggers a download called sale-deed.pdf..

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use vercel 


first Push your code to GitHub

git remote add origin <name of the repo of the respective user>
git push -u origin main

then we have to Import that into Vercel

Framework = Next.js

Root = / (monorepo? point to your folder)

Environment = Node.js (API route; not Edge)

if your first build fails?
Make sure to have:

// next.config.ts
export default {
  serverExternalPackages: ['@sparticuz/chromium-min', 'puppeteer-core'],
};
and at the very top of route.ts:

export const runtime = 'nodejs';

Done! Your URL will look somewhat like
https://pdf‑generator‑your‑name.vercel.app



