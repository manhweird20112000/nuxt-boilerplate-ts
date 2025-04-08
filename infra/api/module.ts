import type { AxiosResponse } from 'axios'
import axios, { type AxiosInstance } from 'axios'

import { EKeyStorage } from '#shared/common/contanst'

class HttpModule {
  private readonly instance: AxiosInstance

  constructor(baseURL: string, timeout: number = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(
      (config) => {
        const token = StorageData.getStorage(EKeyStorage.auth)

        if (token) {
          config.headers.Authorization = 'Bearer ' + token
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response?.data?.status_code !== 200) {
          Toast.error({ message: response?.data?.message })
        }

        return response?.data
      },
      (error) => Promise.reject(error)
    )
  }

  getInstance(): AxiosInstance {
    return this.instance
  }
}

export default HttpModule
