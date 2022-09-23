/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'localhost:1337',
			'localhost',
			'ec2-34-204-199-8.compute-1.amazonaws.com',
		],
	},
};

module.exports = nextConfig;
