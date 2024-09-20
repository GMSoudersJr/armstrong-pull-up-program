const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require("next/constants");


/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
module.exports = async (phase) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'photos.google.com',
          port: ''
        },
      ],
    },
    transpilePackages: ['lucide-react']
  };

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      swSrc: "src/app/sw.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
      cacheOnNavigation: true,
    });
    return withSerwist(nextConfig);
  }

  return nextConfig;
}
