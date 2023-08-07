/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.scdn.co',
      'blend-playlist-covers.spotifycdn.com',
      'images-ak.spotifycdn.com',
      'mosaic.scdn.co',
      'via.placeholder.com',
      'seeded-session-images.scdn.co',
    ],
  },
};

module.exports = nextConfig;
