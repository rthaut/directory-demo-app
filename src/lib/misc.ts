export const delay = <T>(ms: number, result?: T) =>
  new Promise((resolve) => setTimeout(() => resolve(result), ms));

export const getUrlParam = (
  name: string,
  defaultValue: string | undefined = undefined
): string | undefined => {
  let value = defaultValue;
  if (typeof window !== "undefined") {
    value = new URLSearchParams(window.location.search).get(name) ?? value;
  }
  return value;
};
