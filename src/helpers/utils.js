const capitalizeInitial = (word) => word[0].toUpperCase() + word.substr(1);

const capitalizeAcronyms = (word) => {
  const acronymList = ['sku'];
  return acronymList.includes(word) ? word.toUpperCase() : word;
};

const tableNameToModelName = (_word) => {
  const word = capitalizeInitial(_word);
  return word.substring(0, word.length - 1);
};

// eslint-disable-next-line import/prefer-default-export
export const utils = {
  capitalizeInitial,
  capitalizeAcronyms,
  tableNameToModelName,
};
