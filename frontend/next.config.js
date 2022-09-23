/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'localhost:1337',
			'localhost',
			'coursesbox-production.up.railway.app',
		],
	},
};

module.exports = nextConfig;
