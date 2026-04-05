const nextConfig = {
  typedRoutes: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
      },
    ],
  },
};

export default nextConfig;
