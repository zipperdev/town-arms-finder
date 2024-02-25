const storage = window.localStorage;

export const getStorage = (key: string) => storage.getItem(key);
export const setStorage = (key: string, value: string) =>
    storage.setItem(key, value);
export const delStorage = (key: string) => storage.removeItem(key);
