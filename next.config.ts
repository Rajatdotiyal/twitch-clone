import type { NextConfig } from "next";
import  { Configuration, WebpackPluginInstance } from "webpack";
const nextConfig: NextConfig = {
  reactStrictMode: true, 
  images: {
    remotePatterns: [{
      protocol: "https", 
      hostname: "utfs.io",
    }],
  },

  webpack: (config: Configuration, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          stream: require.resolve("stream-browserify"),
          crypto: require.resolve("crypto-browserify"),
        },
      };

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
