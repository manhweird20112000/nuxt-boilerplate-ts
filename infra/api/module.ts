import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

let options: any
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env['VITE_API_URL'] || ''
})

instance.interceptors.request.use(
  (config: any) => {
    options = config
    // const token = getStorage(ACCESS_TOKEN)
    const token = ''
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    if (config.isDownloadFile) {
      config.responseType = 'blob'
    }

    if (config.isUploadFile) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
  },
  (error: AxiosError) => {
    throw error
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.status_code !== 200) {
      ElMessage.error({
        message: response.data.message || '',
        duration: 2000
      })

      if (response.data.status_code === 400 && options['method'].toLowerCase() === 'get' && !response.data.data) {
        throw showError({ statusCode: 404, statusMessage: 'PAGE NOT FOUND.' })
      }
    } else if (options['isNotify']) {
      ElMessage.success({
        message: response.data.message || '',
        duration: 2000
      })
    }
    return response
  },
  (error: AxiosError) => {
    throw error
  }
)

export default instance
