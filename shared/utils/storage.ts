import type { EKeyStorage } from '~/shared/common/contanst'

export class Storage {
  static getStorage(key: EKeyStorage): string {
    return localStorage.getItem(key) || ''
  }

  static deleteStorage(key: EKeyStorage): void {
    localStorage.removeItem(key)
  }

  static setStorage(key: EKeyStorage, value: string): void {
    localStorage.setItem(key, value)
  }

  static clearStorage() {
    localStorage.clear()
  }
}
