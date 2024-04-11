/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.auchan.fr'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'btqfempfhyesnpwznwms.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
