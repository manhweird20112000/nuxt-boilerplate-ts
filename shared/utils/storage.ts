import type { StorageKey } from '~/shared/common/constants'

export abstract class IStorageAdapter {
  abstract getStorage(key: StorageKey): string
  abstract deleteStorage(key: StorageKey): void
  abstract setStorage(key: StorageKey, value: string): void
  abstract clearStorage(): void
}

export class StorageService extends IStorageAdapter {
  getStorage(key: StorageKey): string {
    return localStorage.getItem(key) || ''
  }

  deleteStorage(key: StorageKey): void {
    localStorage.removeItem(key)
  }

  setStorage(key: StorageKey, value: string): void {
    localStorage.setItem(key, value)
  }

  clearStorage(): void {
    localStorage.clear()
  }
}

export const StorageData = new StorageService()
