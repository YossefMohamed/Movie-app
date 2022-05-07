/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "images.unsplash.com", "i.ytimg.com"],
  },
};

module.exports = nextConfig;
