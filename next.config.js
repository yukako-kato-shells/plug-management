/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV == 'development' || process.env.NEXT_PUBLIC_VERCEL_ENV == 'staging') {
      // Development, Staging
      headers.push({
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
        source: '/:path*',
      });
    } else {
      // Production（localhostも含む　※noindex関係ない）
      headers.push({
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
        source: '/:path*',
      });
    }
    return headers;
  }
}

module.exports = nextConfig
