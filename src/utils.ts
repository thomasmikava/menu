export const addToSet = <T>(set: Set<T>, item: T): Set<T> => {
  const newValue = new Set(set);
  newValue.add(item);
  return newValue;
};

export const removeFromSet = <T>(set: Set<T>, item: T): Set<T> => {
  const newValue = new Set(set);
  newValue.delete(item);
  return newValue;
};

export const getPublicURL = (url: string) => {
  if (url[0] !== '/') return url;
  const publicURL = process.env['PUBLIC_URL'] ?? '';
  return `${publicURL}${url}`;
};

export const isNonNullable = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};

export const scrollTo = (element: HTMLElement, yOffset = 0, behavior: ScrollBehavior = 'smooth') => {
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior });
};
