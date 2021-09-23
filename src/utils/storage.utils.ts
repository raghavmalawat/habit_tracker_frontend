export const setItemInLocalStore = (key: string, item: string) => {
  window.localStorage.setItem(key, item);
  return null;
};

export const getItemFromLocalStore = (key: string): string => {
  const value = window.localStorage.getItem(key);
  return value === null ? "" : value;
};

export const clearLocalStore = () => localStorage.clear();
