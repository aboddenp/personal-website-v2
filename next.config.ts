import type { NextConfig } from 'next';

// 'unsafe-inline' in script-src is deliberate: Next.js App Router emits inline bootstrap
// scripts and Cloudflare (email obfuscation) injects inline scripts at the proxy layer.
// A nonce-based CSP via middleware is possible future hardening.
// Deployed as Report-Only first; rename to Content-Security-Policy once the live site
// shows no violations while exercising the contact form captcha. When flipping to
// enforcing, also append 'upgrade-insecure-requests' (it is invalid in Report-Only
// mode and the browser logs a console error).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://static.cloudflareinsights.com https://ajax.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google.com https://www.gstatic.com",
  "font-src 'self'",
  'frame-src https://www.google.com',
  "connect-src 'self' https://www.google.com https://cloudflareinsights.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          // Dev tooling (Turbopack / React Fast Refresh) uses eval, which would spam
          // report-only violations in the console — so only send the CSP in production.
          ...(isDev ? [] : [{ key: 'Content-Security-Policy-Report-Only', value: csp }]),
        ],
      },
    ];
  },
};

export default nextConfig;
