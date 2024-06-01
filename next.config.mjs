/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
     typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
