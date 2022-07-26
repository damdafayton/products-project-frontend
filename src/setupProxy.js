const { createProxyMiddleware } = require('http-proxy-middleware');

const host =
  process.env.NODE_ENV === 'production'
    ? 'https://products-listing-demo.herokuapp.com'
    : 'http://localhost/test-scandiweb-products';

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${host}/index.php`,
      changeOrigin: true,
    })
  );
};
