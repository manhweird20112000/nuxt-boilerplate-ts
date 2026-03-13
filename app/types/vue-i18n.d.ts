import '@vue/runtime-core'

import type jp from '~/i18n/locales/jp.json'

type Translations = typeof jp

declare global {
  type TxKeyPath = RecursiveKeyOf<Translations>
}

export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: TxKeyPath, options?: Record<string, string>) => string
  }
}
