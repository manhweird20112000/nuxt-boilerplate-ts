export const setStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value)
}

export const deleteStorage = (key: string): void => {
  localStorage.removeItem(key)
}

export const getStorage = (key: string): string => {
  return localStorage.getItem(key) || ''
}
