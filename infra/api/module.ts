import axios, { type AxiosError, type AxiosInstance } from 'axios'

import type { AxiosResponse } from 'axios'

class HttpModule {
  private readonly instance: AxiosInstance

  constructor(baseURL: string, timeout: number = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(
      (config) => {
        // const token = StorageData.getStorage(StorageKey.AUTH)
        const token = ''
        if (token) {
          config.headers.Authorization = 'Bearer ' + token
        }

        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // if (response?.data?.status_code !== 200) {
        //   Toast.error({ message: response?.data?.message })
        // }

        return response?.data
      },
      (error: AxiosError) => Promise.reject(error)
    )
  }

  getInstance(): AxiosInstance {
    return this.instance
  }
}

export default HttpModule
