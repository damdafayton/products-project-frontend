const proxy = 'https://safe-ridge-22036.herokuapp.com';
export const remoteBase = 'https://products-listing-demo.herokuapp.com';
export const localBase = 'http://localhost/test-scandiweb-products';

const base =
  process.env.NODE_ENV === 'production'
    ? `${proxy}/${remoteBase}/index.php/api`
    : '/api';

export default {
  PRODUCTS: `${base}/products`,
  PRODUCT_FIELDS_QUERY: (field = '') => `${base}/products?fields=${field}`,
  MASS_DELETE: `${base}/products:massDelete`,
};