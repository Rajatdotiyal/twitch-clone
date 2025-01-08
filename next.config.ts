import type { NextConfig } from "next";
import webpack, { Configuration, WebpackPluginInstance } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enabling strict mode for React
  images: {
    domains: ["utfs.io"], // Allow images from specific domains
  },

  webpack: (config: Configuration, { isServer, webpack }) => {
    if (!isServer) {
      // Add fallbacks for the 'stream' and 'crypto' modules
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          stream: require.resolve("stream-browserify"),
          crypto: require.resolve("crypto-browserify"),
        },
      };

      // Add necessary Webpack plugins for polyfills
      config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
          process: "process/browser",
        }),
        new webpack.NormalModuleReplacementPlugin(
          /node:crypto/,
          (resource: { request: string }) => {
            resource.request = resource.request.replace(/^node:/, "");
          }
        ) as WebpackPluginInstance,
      ];
    }

    return config;
  },
};

export default nextConfig;
