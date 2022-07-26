const { createProxyMiddleware } = require('http-proxy-middleware');

const LOCAL_BASE = 'http://localhost/test-scandiweb-products';

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${LOCAL_BASE}/index.php`,
      changeOrigin: true,
    })
  );
};
