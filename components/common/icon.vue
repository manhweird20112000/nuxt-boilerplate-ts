<script setup lang="ts">
import icons from '@/generated/icons.json'

type Icons = typeof icons

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

interface Props {
  name: RecursiveKeyOf<Icons>
  color?: string
  width?: number
  height?: number
}

withDefaults(defineProps<Props>(), {
  color: 'black',
  width: 24,
  height: 24
})
</script>

<template>
  <span class="common-icon" :style="`--common-icon-color: ${color}; --common-icon-width: ${width}px; --common-icon-height: ${height}px`" v-html="icons[name]">
  </span>
</template>

<style lang="scss">
.common-icon {
  max-width: fit-content;
  & > svg {
    stroke: var(--common-icon-color);
    width: var(--common-icon-width);
    height: var(--common-icon-height);
  }
}
</style>
