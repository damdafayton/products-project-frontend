const { createProxyMiddleware } = require('http-proxy-middleware');

import { localBase } from './apiRoutes';

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${localBase}/index.php`,
      changeOrigin: true,
    })
  );
};
