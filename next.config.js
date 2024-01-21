/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
      removeConsole: true,
    },
    reactStrictMode: true,
    experimental: {
      serverComponentsExternalPackages: ['@evervault/sdk'],
      esmExternals: 'loose',
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
        },
        {
          protocol: 'https',
          hostname: 'images.clerk.dev',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'hjhncoqotxlxpvrljjgz.supabase.co',
        },
        {
          protocol: "https",
          hostname: "image.tmdb.org",
          port: "",
        },
        
        {
          protocol: 'https',
          hostname: 'unlimitednow.live',
        },
      ],
    },
   
  };
  
  module.exports = nextConfig;
  