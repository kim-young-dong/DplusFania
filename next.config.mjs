/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ncxbzukabsvxtmxrfwzx.supabase.co",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
