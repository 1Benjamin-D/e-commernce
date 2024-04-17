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
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
