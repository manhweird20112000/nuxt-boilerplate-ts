<script setup lang="ts">
import _ from 'lodash'
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

const slots: any = useSlots()

const isDisabledDebounce = ref<boolean>(false)

const onClick = () => {
  isDisabledDebounce.value = true
  onClickDebounce()
}

const onClickDebounce = _.debounce(() => {
  emits('submit')
  isDisabledDebounce.value = false
}, 500)
</script>

<template>
  <el-button
    v-loading.fullscreen.lock="loadingFullScreen"
    :type
    :loading
    :disabled="isDisabledDebounce || disabled || loading"
    :round
    :circle
    @click="onClick"
  >
    <slot v-if="slots['text']" name="text" />
    <template v-else>{{ text }}</template>
    <template v-if="slots['loading']" #loading>
      <slot name="loading" />
    </template>
  </el-button>
</template>
