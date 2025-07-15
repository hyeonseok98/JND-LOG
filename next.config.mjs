const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "livecloud-thumb.akamaized.net",
        pathname: "/chzzk/**",
      },
      {
        protocol: "https",
        hostname: "ddragon.leagueoflegends.com",
        pathname: "/cdn/**",
      },
    ],
  },
};
export default nextConfig;
