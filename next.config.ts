/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@sparticuz/chromium-min', 'puppeteer-core'],
  experimental: {
    serverComponentsExternalPackages: ['@sparticuz/chromium-min', 'puppeteer-core'], // for older versions
  },
};

export default nextConfig;
