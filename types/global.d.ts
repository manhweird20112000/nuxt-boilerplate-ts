import  { Toast } from '~/shared/utils/toast'
import  { StorageData } from '~/shared/utils/storage'
import  { HttpService } from '~/shared/utils/api'
import { Formatter } from '#shared/utils/formatter'
import { Helper } from '#shared/utils/helper'
import { Validator } from '#shared/utils/validators'


declare module 'vue'{
  interface ComponentCustomProperties {
    Toast: typeof Toast
    StorageData: typeof StorageData
    HttpService: typeof HttpService
    Formatter: typeof Formatter
    Helper: typeof Helper
    Validator: typeof Validator
  }
}

export {}
