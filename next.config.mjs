const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "livecloud-thumb.akamaized.net",
        pathname: "/chzzk/**",
      },
    ],
  },
};
export default nextConfig;
