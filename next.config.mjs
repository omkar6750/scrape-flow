/** @type {import('next').NextConfig} */
const nextConfig = {
        // 1. Tell Next.js these are server-side packages containing binaries
        experimental: {
                serverComponentsExternalPackages: [
                        "libsql",
                        "@libsql/client",
                        "@prisma/adapter-libsql"
                ],
        },
        // 2. Explicitly exclude them from Webpack bundling to fix the LICENSE file errors
        webpack: (config) => {
                config.externals.push({
                        "libsql": "commonjs libsql",
                        "@libsql/client": "commonjs @libsql/client",
                        "@prisma/adapter-libsql": "commonjs @prisma/adapter-libsql",
                });
                return config;
        },
};

export default nextConfig;