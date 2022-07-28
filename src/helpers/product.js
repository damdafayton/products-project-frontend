const validateFormData = (body, fields) => {
  const missingFields = [];

  fields.forEach(
    (field) =>
      (!body[field.toLowerCase()] || body[field.toLowerCase()].length < 1) &&
      missingFields.push(field)
  );

  return missingFields;
};

const validateFormDataType = (body, fields) => {
  const fieldsSupposedToBeNumeric = [];
  fields.forEach(
    (field) =>
      parseInt(body[field.toLowerCase()], 10).toString() === 'NaN' &&
      fieldsSupposedToBeNumeric.push(field)
  );
  return fieldsSupposedToBeNumeric;
};

// eslint-disable-next-line import/prefer-default-export
export const product = {
  validateFormData,
  validateFormDataType,
};
