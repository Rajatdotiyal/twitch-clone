import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  webpack: (config, { isServer }) => {
    // Handle node: protocol imports for Webpack
    config.resolve = {
      ...config.resolve,
      // Add a fallback for node modules that require the node: protocol
      fallback: {
        ...config.resolve.fallback,
        crypto: false, // Disable crypto on the client-side if unnecessary
      },
    };

    if (!isServer) {
      config.module.rules.push({
        test: /\.js$/,
        resolve: {
          fullySpecified: false, // Allows omitting file extensions and protocols like "node:"
        },
      });
    }

    return config;
  },
};

export default nextConfig;
