/**
 * Performs a case-insensitive comparison on two strings
 * @param {string} a the first string
 * @param {string} b the second string
 * @returns {number} the comparison result
 */
export const caseInsensitiveCompare = (a: string, b: string): number => {
  return a.localeCompare(b, undefined, {
    ignorePunctuation: true,
    sensitivity: "base",
  });
};

/**
 * Determines if two strings are equal (case-insensitive)
 * @param {string} a the first string
 * @param {string} b the second string
 * @returns {boolean} if the two strings are equal
 */
export const caseInsensitiveEqual = (a: string, b: string): boolean =>
  0 === caseInsensitiveCompare(a, b);

/**
 * Returns a hash code for a given string
 * @param {string} str the string to hash
 * @returns {number} the hash code
 * @see https://stackoverflow.com/a/7616484
 */
export const hash = (str: string): number => {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};
