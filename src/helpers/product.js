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

const validateFormData = (body, fields) => {
  const missingFields = [];
  // console.log(fields);
  // console.log(body);

  fields.forEach(
    (field) =>
      (!body[field.toLowerCase()] || body[field.toLowerCase()].length < 1) &&
      missingFields.push(field)
  );

  return missingFields;
};

const validateFormDataType = (body, fields) => {
  const fieldsSupposedToBeNumeric = [];
  // console.log(body);
  fields.forEach(
    (field) =>
      parseInt(body[field.toLowerCase()], 10).toString() === 'NaN' &&
      fieldsSupposedToBeNumeric.push(field)
  );
  // console.log(fieldsSupposedToBeNumeric);
  return fieldsSupposedToBeNumeric;
};

// eslint-disable-next-line import/prefer-default-export
export const product = {
  removeCommonFields,
  validateFormData,
  validateFormDataType,
};
