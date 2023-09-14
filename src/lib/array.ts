/**
 * Combines an array of words into a user-friendly string
 * @param {string[]} words the array of words to combine
 * @returns {string} the combined words
 */
export const listWords = (words: string[]): string => {
  switch (words.length) {
    case 0:
      return "";
    case 1:
      return words[0];
    case 2:
      return words.join(" & ");
    default:
      return words.slice(0, -1).join(", ") + ", and " + words.slice(-1);
  }
};

export const sortBy = (key: string | number) => {
  return (a: { [x: string]: number }, b: { [x: string]: number }) =>
    a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
};
