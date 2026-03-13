<script setup lang="ts">
import { debounce } from 'lodash-es'
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
  text: '',
  type: 'primary',
  disabled: false,
  loading: false,
  round: false,
  circle: false,
  loadingFullScreen: false,
  plain: false
})

const emits = defineEmits<{ submit: [] }>()
const slots = useSlots()

const isDisabledDebounce = ref<boolean>(false)

const onClick = () => {
  isDisabledDebounce.value = true
  onClickDebounce()
}

const onClickDebounce = debounce(() => {
  emits('submit')
  isDisabledDebounce.value = false
}, 500)
</script>

<template>
  <el-button
    v-loading.fullscreen.lock="loadingFullScreen"
    :type="type"
    :loading="loading"
    :disabled="isDisabledDebounce || disabled || loading"
    :round="round"
    :circle="circle"
    :plain="plain"
    @click="onClick"
  >
    <slot v-if="slots['text']" name="text" />
    <template v-else>{{ text }}</template>
    <template v-if="slots['loading']" #loading>
      <slot name="loading" />
    </template>
  </el-button>
</template>
