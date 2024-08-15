import type jp from '@/lang/jp.json'

type Translations = typeof jp

type RecursiveKeyOfInner<TObj extends object> = {
  // eslint-disable-next-line no-use-before-define
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `['${TKey}']` | `.${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> =
  TValue extends any[] ? Text
  : TValue extends object ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type TxKeyPath = RecursiveKeyOf<Translations>

export function useTranslate() {
  const { $i18n } = useNuxtApp()

  const translate = (key: TxKeyPath, options?: Record<string, any>): string => {
    if (options) {
      return $i18n.t(key, options)
    }
    return $i18n.t(key)
  }

  return { translate }
}
