/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.tapedeck.org']
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
}



module.exports = nextConfig
