type OutputObject = {
  name: string | undefined;
  value: any | undefined;
};

/**
 * Returns the name and value of the first non-empty property from an object
 * @param {object} object the object
 * @param {InputObject[]} props the array of properties to coalesce
 * @returns {OutputObject} the name and value of the first non-empty property
 */
export const coalesceProperties = (
  object: Record<string, any>,
  props: string[]
): OutputObject => {
  for (let i = 0, prop = props[i]; i < props.length; i++, prop = props[i]) {
    if (Object.keys(object).includes(prop) && !!object[prop]) {
      return {
        name: prop,
        value: object[prop],
      };
    }
  }

  return {
    name: undefined,
    value: undefined,
  };
};
