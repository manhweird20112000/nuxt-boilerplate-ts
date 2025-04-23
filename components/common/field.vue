<script setup lang="ts">
import { debounce } from 'lodash-es'

import type { FormInstance } from 'element-plus'

import { useValidateField } from '~/composables/use-validate-field'

interface FieldProps {
  formRef?: FormInstance
  name: string
  error?: string
  placeholder?: string
  disabled?: boolean
  maxlength?: number
  type: 'number' | 'text' | 'password' | 'textarea'
  isFormatMoney?: boolean
  isDebounce?: boolean
  debounceTime?: number
}

const props = withDefaults(defineProps<FieldProps>(), {
  maxlength: 64,
  disabled: false,
  placeholder: '',
  error: '',
  isFormatMoney: false,
  type: 'text',
  isDebounce: false,
  debounceTime: 500,
  formRef: undefined
})

const emits = defineEmits<{
  change: [value: string]
  blur: []
  focus: []
}>()

const { resetField, validateField } = useValidateField()
const slots = useSlots()
const input = defineModel<string>()

/**
 * Formats a number input with commas for thousand separators
 */
function formatBalanceInput(value: string): string {
  if (!value) {
    return value
  }

  const parts = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',').split('.')

  if (parts.length === 1) {
    return parts[0]
  }

  return `${parts[0]}.${parts[1]?.replaceAll(',', '')}`
}

/**
 * Handles comma key press for money format inputs
 */
function handleKeyDown(event: any): any {
  if (
    !input.value?.includes(',') &&
    event.key === ',' &&
    input.value !== '' &&
    props.isFormatMoney
  ) {
    input.value = `${input.value}.`
  }
}

/**
 * Handles input change events
 */
function handleChange(value: string): void {
  if (props.isDebounce) {
    debouncedChange()
  }
  emits('change', value)
}

/**
 * Creates a debounced version of the change handler
 */
const debouncedChange = debounce(() => {
  emits('change', input.value || '')
}, props.debounceTime)

/**
 * Handles blur events with field validation
 */
function handleBlur(): void {
  if (props.formRef && props.name) {
    validateField(props.formRef, props.name)
  }
  emits('blur')
}

/**
 * Handles focus events with field reset
 */
function handleFocus(): void {
  if (props.formRef && props.name) {
    resetField(props.formRef, props.name)
  }
  emits('focus')
}

/**
 * Watch for input changes to handle money formatting
 */
watch(
  () => input.value,
  (value: string | undefined, oldValue: string | undefined) => {
    if (!props.isFormatMoney || !value) {
      return
    }

    const normalizedValue = value.replace(',', '.')

    // Handle comma input
    if (value === ',' && input.value && input.value[0] !== ',' && !input.value.includes(',')) {
      input.value = normalizedValue
      return
    }

    // Validate numeric value
    if (isNaN(Number(normalizedValue))) {
      input.value = oldValue
      return
    }

    // Handle decimal places
    const decimals = normalizedValue.split('.')
    if (decimals[1]) {
      input.value = `${decimals[0]}.${decimals[1].slice(0, 2)}`
    }

    // Ensure we use period as decimal separator
    input.value = input.value?.replace(',', '.') || ''
  }
)
</script>

<template>
  <el-form-item :prop="name" :error="error">
    <el-input
      v-model="input"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :show-password="type === 'password'"
      :type="type"
      inputmode="decimal"
      :formatter="isFormatMoney ? formatBalanceInput : undefined"
      :parser="isFormatMoney ? (value: string) => value.replace(/\$\s?|(,*)/g, '') : undefined"
      @keydown="handleKeyDown"
      @input="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <template v-if="slots.append" #append>
        <slot name="append" />
      </template>
      <template v-if="slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="slots.prepend" #prepend>
        <slot name="prepend" />
      </template>
    </el-input>
  </el-form-item>
</template>
