type RecursiveKeyOfInner<TObj extends object> = {
  // eslint-disable-next-line no-use-before-define
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `['${TKey}']` | `.${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> =
  TValue extends any[] ? Text
    : TValue extends object ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
      : Text

declare global {
  type RecursiveKeyOf<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
  }[keyof TObj & (string | number)]
}

export {}
