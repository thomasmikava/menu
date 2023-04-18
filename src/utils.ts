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
