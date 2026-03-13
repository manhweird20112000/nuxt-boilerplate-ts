import type { FormInstance } from 'element-plus'

export function useValidateField() {
  const resetField = (formRef: FormInstance, field: string): void => {
    formRef.clearValidate(field)
  }

  const validateField = (formRef: FormInstance, field: string): void => {
    formRef.validateField(field)
  }

  return {
    validateField,
    resetField
  }
}
