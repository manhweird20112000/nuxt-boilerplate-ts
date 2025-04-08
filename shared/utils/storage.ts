import type { EKeyStorage } from '~/shared/common/contanst'

export abstract class IStorageAdapter {
  abstract getStorage(key: EKeyStorage): string
  abstract deleteStorage(key: EKeyStorage): void
  abstract setStorage(key: EKeyStorage, value: string): void
  abstract clearStorage(): void
}

export class StorageService extends IStorageAdapter {
  getStorage(key: EKeyStorage): string {
    return localStorage.getItem(key) || ''
  }

  deleteStorage(key: EKeyStorage): void {
    localStorage.removeItem(key)
  }

  setStorage(key: EKeyStorage, value: string): void {
    localStorage.setItem(key, value)
  }

  clearStorage() {
    localStorage.clear()
  }
}

export const StorageData = new StorageService()
