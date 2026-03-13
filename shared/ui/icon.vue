<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue'
import { normalizeClass } from 'vue'

import icons from '~~/generated/icons.json'

type Icons = typeof icons

interface Props {
  name: RecursiveKeyOf<Icons>
  color?: string
  width?: number
  height?: number
  type?: 'stroke' | 'fill' | string
  classNames?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  color: '',
  width: 24,
  height: 24,
  type: '',
  classNames: ''
})
const instance = ref<HTMLSpanElement>()
const iconStyle = computed<CSSProperties>(() => ({
  '--common-icon-type': props.type,
  '--common-icon-color': props.color,
  '--common-icon-width': `${props.width}px`,
  '--common-icon-height': `${props.height}px`
}))
function executeApplyIconClassNames(): void {
  if (!instance.value || !props.classNames) {
    return
  }
  const normalizedClassNames = normalizeClass(props.classNames)
  if (!normalizedClassNames) {
    return
  }
  const classNameList = normalizedClassNames.split(' ').filter(Boolean)
  instance.value.querySelector('svg')?.classList.add(...classNameList)
}

onMounted(() => {
  executeApplyIconClassNames()
})
</script>

<template>
  <span ref="instance" :class="['common-icon', type]" :style="iconStyle" v-html="icons[name]" />
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
