/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig = {};
const withNextIntl = createNextIntlPlugin()(nextConfig);

export default withNextIntl;
