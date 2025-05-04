import type {NextConfig} from 'next';
import webpack from 'webpack'; // Import webpack
import { Buffer } from 'buffer'; // Import Buffer

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
   webpack: (config) => {
    // Workaround for @solana/wallet-adapter-react issue with Buffer
    // See https://github.com/solana-labs/wallet-adapter/issues/847
     config.resolve.fallback = {
       ...config.resolve.fallback,
       "crypto": false, // Prefer node polyfill if needed, else false
       "stream": false, // Prefer node polyfill if needed, else false
        "buffer": require.resolve("buffer/"), // This maps 'buffer' to the installed buffer package
     };

     // Add Buffer polyfill plugin
     config.plugins.push(
      new webpack.ProvidePlugin({ // Use webpack.ProvidePlugin
         Buffer: ['buffer', 'Buffer'],
      })
     );


    // Mark packages with 'node:' prefix as external
    // Required for some wallet adapter dependencies that use Node.js built-ins
    config.externals = [
      ...config.externals,
      (context, request, callback) => {
        if (/^node:/.test(request)) {
          // Use commonjs2 for Node.js built-ins
          // See https://github.com/vercel/next.js/issues/41981#issuecomment-1493116747
          return callback(null, `commonjs2 ${request}`);
        }
        callback();
      },
    ];


    return config;
  },
};

export default nextConfig;
