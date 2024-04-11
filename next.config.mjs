/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "44303",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
