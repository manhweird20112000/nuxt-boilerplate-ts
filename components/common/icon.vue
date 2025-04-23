<script setup lang="ts">
import icons from '@/generated/icons.json'

type Icons = typeof icons

interface Props {
  name: RecursiveKeyOf<Icons>
  color?: string
  width?: number
  height?: number
  type?: 'stroke' | 'fill' | string
}

withDefaults(defineProps<Props>(), {
  color: '',
  width: 24,
  height: 24,
  type: ''
})
</script>

<template>
  <span
    :class="['common-icon', type]"
    :style="`--common-icon-type: ${type} ;--common-icon-color: ${color}; --common-icon-width: ${width}px; --common-icon-height: ${height}px`"
    v-html="icons[name]"
  />
</template>

<style lang="scss">
.common-icon {
  max-width: fit-content;

  &.stroke {
    & > svg {
      stroke: var(--common-icon-color);
    }
  }

  &.fill {
    & > svg {
      fill: var(--common-icon-color);
    }
  }

  & > svg {
    width: var(--common-icon-width);
    height: var(--common-icon-height);
  }
}
</style>
