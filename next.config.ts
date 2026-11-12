import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserve the original site's URL format (e.g. /about/, /work/emyy/).
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
