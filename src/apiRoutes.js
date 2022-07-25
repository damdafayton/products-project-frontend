export default {
  PRODUCTS: '/api/products',
  PRODUCT_FIELDS_QUERY: (field = '') => `/api/products?fields=${field}`,
  MASS_DELETE: '/api/products:massDelete',
};
