/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: {
      compilationMode: "all",
      panicThreshold: "CRITICAL_ERRORS",
    },
  },
};

export default nextConfig;
