/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
     allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
};

export default nextConfig;
