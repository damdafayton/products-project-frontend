const capitalizeInitial = (word) => word[0].toUpperCase() + word.substr(1);

const capitalizeAcronyms = (word) => {
  const acronymList = ['sku', 'dvd'];
  return acronymList.includes(word)
    ? word.toUpperCase()
    : capitalizeInitial(word);
};

const tableNameToSingular = (_word) => {
  const word = _word.substring(0, _word.length - 1);
  return capitalizeAcronyms(word);
};

const replaceLastCommaWithAnd = (string) => {
  const matches = [...string.matchAll(',')];
  if (matches.length > 0) {
    const lastComma = matches[matches.length - 1].index;
    const newString = `${string.substring(0, lastComma)} and${string.substring(
      lastComma + 1
    )}`;
    // console.log(newString);
    return newString;
  }
  return string;
};

const sterilizeMySQLErrorMessages = (_string) => {
  const indexOfColumnString = _string.search(' for column');
  // console.log(string);
  if (indexOfColumnString > 0) {
    return `${_string.substring(0, indexOfColumnString)}.`;
  }
  return _string;
};

// eslint-disable-next-line import/prefer-default-export
export const utils = {
  capitalizeInitial,
  capitalizeAcronyms,
  tableNameToSingular,
  replaceLastCommaWithAnd,
  sterilizeMySQLErrorMessages,
};
