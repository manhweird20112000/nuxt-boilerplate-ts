<script setup lang="ts">
import _ from 'lodash'

import type { FormInstance } from 'element-plus'

import { useValidateField } from '~/composables/use-validate-field'

interface Props {
  formRef?: FormInstance
  name: string
  error?: string
  placeholder?: string
  disabled?: boolean
  maxlength?: number
  type: 'number' | 'text' | 'password' | 'textarea'
  isFormatMoney?: boolean
  isDebounce?: boolean
  debounce?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxlength: 64,
  disabled: false,
  placeholder: '',
  error: '',
  isFormatMoney: false,
  type: 'text',
  isDebounce: false,
  debounce: 500
})

const emits = defineEmits<{ change: [val: string]; blur: []; focus: [] }>()

const { resetField, validateField } = useValidateField()

const slots: any = useSlots()

const input = defineModel<any>()

function formatBalanceInput(val: string) {
  const valRaw = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',').split('.')

  if (!val) {
    return val
  }

  if (valRaw.length === 1) {
    return valRaw.at(0)
  }
  return [valRaw.at(0), valRaw.at(1)?.replaceAll(',', '')].join('.')
}

const keyDown = (event: any) => {
  if (!input.value.includes(',') && event.key === ',' && input.value !== '' && props.isFormatMoney) {
    input.value = input.value + '.'
  }
}

const change = (val: string) => {
  if (props.isDebounce) {
    changeDebounce()
  }
  emits('change', val)
}

const changeDebounce = _.debounce(() => {
  emits('change', input.value)
}, props.debounce)

const blur = () => {
  if (props.formRef && props.name) {
    validateField(props.formRef, props.name)
  }
  emits('blur')
}
const focus = () => {
  if (props.formRef && props.name) {
    resetField(props.formRef, props.name)
  }
  emits('focus')
}

watch(
  () => input.value,
  (val: string, oldValue: string) => {
    if (props.isFormatMoney) {
      const valInput = val.replace(',', '.')
      if (val === ',' && input.value[0] !== ',' && !input.value.includes(',')) {
        input.value = valInput
      }

      if (isNaN(Number(valInput))) {
        input.value = oldValue
      } else {
        const decimals = valInput.split('.')
        if (decimals.at(1)) {
          input.value = decimals.at(0) + '.' + (decimals.at(1) || '').slice(0, 2)
        }
        input.value = input.value.replace(',', '.')
      }
    }
  }
)
</script>

<template>
  <el-form-item :prop="name" :error>
    <el-input
      v-model="input"
      :placeholder
      :disabled
      :maxlength
      :show-password="type === 'password'"
      :type="type"
      inputmode="decimal"
      :formatter="isFormatMoney ? (value: string) => formatBalanceInput(value) : undefined"
      :parser="isFormatMoney ? (value: string) => value.replace(/\$\s?|(,*)/g, '') : undefined"
      @keydown="keyDown"
      @input="change"
      @blur="blur"
      @focus="focus"
    >
      <template v-if="slots['append']" #append>
        <slot name="append" />
      </template>
      <template v-if="slots['prefix']" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="slots['prepend']" #prepend>
        <slot name="prepend" />
      </template>
    </el-input>
  </el-form-item>
</template>
