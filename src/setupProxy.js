const { createProxyMiddleware } = require('http-proxy-middleware');

import { remoteBase, localBase } from './apiRoutes';

const base = process.env.NODE_ENV === 'production' ? remoteBase : localBase;

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${base}/index.php`,
      changeOrigin: true,
    })
  );
};
