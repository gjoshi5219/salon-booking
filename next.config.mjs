let userConfig;
try {
  userConfig = await import("./v0-user-next.config");
} catch (e) {
  userConfig = {}; // Default empty object to avoid errors
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  reactStrictMode: true, // Enable React Strict Mode for better debugging
  output: "export",

  distDir: "build", // ✅ This will generate a `build/` folder instead of `.next/`
};

// Merge user config safely
if (userConfig && typeof userConfig === "object") {
  mergeConfig(nextConfig, userConfig);
}

function mergeConfig(baseConfig, userConfig) {
  Object.keys(userConfig).forEach((key) => {
    if (
      typeof baseConfig[key] === "object" &&
      baseConfig[key] !== null &&
      !Array.isArray(baseConfig[key])
    ) {
      baseConfig[key] = { ...baseConfig[key], ...userConfig[key] };
    } else {
      baseConfig[key] = userConfig[key];
    }
  });
}

export default nextConfig;
