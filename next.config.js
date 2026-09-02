const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
module.exports = async (phase) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          port: "",
        },
      ],
    },
    transpilePackages: ["lucide-react"],
    // Lets the dev server be reached from another device on the LAN (e.g.
    // testing on a phone) -- Next.js 16 blocks cross-origin dev requests by
    // default unless the requesting origin is allowlisted here.
    allowedDevOrigins: ["192.168.1.75"],
  };

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      swSrc: "src/app/sw.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
      cacheOnNavigation: true,
      disable: process.env.NODE_ENV !== "production",
    });
    return withSerwist(nextConfig);
  }

  return nextConfig;
};
