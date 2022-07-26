const PROXY = 'https://safe-ridge-22036.herokuapp.com';
export const REMOTE_BASE = 'https://products-listing-demo.herokuapp.com';

const base =
  process.env.NODE_ENV === 'production'
    ? `${PROXY}/${REMOTE_BASE}/index.php/api`
    : '/api';

export default {
  PRODUCTS: `${base}/products`,
  PRODUCT_FIELDS_QUERY: (field = '') => `${base}/products?fields=${field}`,
  MASS_DELETE: `${base}/products:massDelete`,
};
