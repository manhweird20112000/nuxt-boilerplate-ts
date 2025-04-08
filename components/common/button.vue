<script setup lang="ts">
interface Props {
  text?: string
  disabled?: boolean
  loading?: boolean
  type?: 'primary' | 'success' | 'info' | 'danger' | 'warning'
  round?: boolean
  circle?: boolean
  loadingFullScreen?: boolean
  plain?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'primary',
  disabled: false,
  loading: false,
  round: false,
  circle: false,
  loadingFullScreen: false,
  plain: false
})
const slots: any = useSlots()
</script>

<template>
  <el-button v-loading.fullscreen.lock="loadingFullScreen" :type :loading :disabled :round :circle>
    <slot v-if="slots['text']" name="text" />
    <template v-else>{{ text }}</template>
    <template v-if="slots['loading']" #loading>
      <slot name="loading" />
    </template>
  </el-button>
</template>
