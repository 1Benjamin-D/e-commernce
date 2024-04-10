/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'btqfempfhyesnpwznwms.supabase.co'
            },
            {
                protocol: 'https',
                hostname: 'cdn.auchan.fr'
            }
        ]
    }
};

export default nextConfig;
