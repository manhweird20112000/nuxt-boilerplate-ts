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
