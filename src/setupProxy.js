const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/products',
    createProxyMiddleware({
      target: 'http://localhost/test-scandiweb-products/index.php/products',
      changeOrigin: true,
    })
  );
};
