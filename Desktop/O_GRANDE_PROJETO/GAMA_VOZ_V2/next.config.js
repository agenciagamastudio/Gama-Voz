/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  env: {
    NEXT_PUBLIC_GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  },
};

module.exports = nextConfig;
