import { type AxiosInstance, type AxiosResponse } from 'axios'

import HttpModule from '~/infra/api/module'

export abstract class IHttpAdapter<T = object> {
  abstract client: T
  abstract get<Q = object, R = AxiosResponse>(url: string, params?: Q): Promise<R>
  abstract post<Q = object, R = AxiosResponse>(url: string, dto?: Q): Promise<R>
  abstract put<Q = object, R = AxiosResponse>(url: string, dto?: Q): Promise<R>
  abstract patch<Q = object, R = AxiosResponse>(url: string, dto?: Q): Promise<R>
  abstract delete<R = AxiosResponse>(url: string): Promise<R>
}
class HttpAxiosService implements IHttpAdapter<AxiosInstance> {
  client: AxiosInstance

  constructor(url = import.meta.env['VITE_API_URL'] || '') {
    this.client = new HttpModule(url).getInstance()
  }

  get<Q = object, R = AxiosResponse>(url: string, params?: Q): Promise<R> {
    return this.client.get(url, { params })
  }

  delete<R = AxiosResponse>(url: string): Promise<R> {
    return this.client.delete(url)
  }

  patch<Q = object, R = AxiosResponse>(url: string, dto?: Q): Promise<R> {
    return this.client.patch(url, dto)
  }

  post<Q = object, R = AxiosResponse>(url: string, dto?: Q): Promise<R> {
    return this.client.post(url, dto)
  }

  put<Q = object, R = AxiosResponse>(url: string, dto?: Q): Promise<R> {
    return this.client.put(url, dto)
  }
}

export const HttpService = new HttpAxiosService()
