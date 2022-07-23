const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost/test-scandiweb-products/index.php',
      changeOrigin: true,
    })
  );
};
