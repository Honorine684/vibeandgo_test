/**
 * BUG (SECURITE): aucune configuration de headers de securite.
 * Pas de CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
 * Voir BUGS.md.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "http", hostname: "www.w3.org" },
    ],
  },
};

module.exports = nextConfig;
