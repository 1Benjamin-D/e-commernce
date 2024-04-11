/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'btqfempfhyesnpwznwms.supabase.co',
        },
        {
          hostname: 'cdn.auchan.fr',
        },
      ],
    },
  };
  
  export default nextConfig;
