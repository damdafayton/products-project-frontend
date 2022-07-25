const fieldTypeUpdater = (_product) => {
  let product = { ..._product };
  const dimensionFields = ['height', 'width', 'length'];
  if (dimensionFields.every((field) => Object.keys(product).includes(field))) {
    // console.log('cleaning', product.length);
    product = {
      dimensions: `${product.height}x${product.width}x${product.length}`,
    };
  }
  return product;
};

const removeCommonFields = (_product) => {
  // can do mapping also but below method wouldnt require many loops
  let product = { ..._product };
  const fieldsToDelete = [
    'sku',
    'product_id',
    'price',
    'id',
    'description',
    'name',
    'category',
  ];

  fieldsToDelete.forEach((field) => delete product[field]);

  if (Object.keys(product).length > 1) {
    product = fieldTypeUpdater(product);
  }

  return product;
};

// eslint-disable-next-line import/prefer-default-export
export const product = { removeCommonFields };
