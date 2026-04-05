/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow remote access from other PCs on the network
  allowedDevOrigins: ['192.168.1.220', 'localhost', '127.0.0.1'],

  // Fix turbopack root warning
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
