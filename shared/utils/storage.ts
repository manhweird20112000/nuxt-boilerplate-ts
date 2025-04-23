import Cookies from 'js-cookie'

import type { StorageKey } from '~/shared/common/constants'

export abstract class IStorageAdapter {
  abstract getStorage(key: StorageKey): string
  abstract deleteStorage(key: StorageKey): void
  abstract setStorage(key: StorageKey, value: string): void
  abstract clearStorage(): void
}

export class StorageService implements IStorageAdapter {
  private readonly type: 'cookie' | 'storage' = 'cookie'

  constructor(type: 'cookie' | 'storage') {
    this.type = type
  }

  getStorage(key: StorageKey): string {
    return this.type === 'cookie' ? Cookies.get(key) || '' : localStorage.getItem(key) || ''
  }

  deleteStorage(key: StorageKey): void {
    this.type === 'cookie' ? Cookies.remove(key) : localStorage.removeItem(key)
  }

  setStorage(key: StorageKey, value: string): void {
    this.type === 'cookie' ? Cookies.set(key, value) : localStorage.setItem(key, value)
  }

  clearStorage(): void {
    this.type === 'storage' && localStorage.clear()
  }
}

export const StorageData = new StorageService('cookie')
