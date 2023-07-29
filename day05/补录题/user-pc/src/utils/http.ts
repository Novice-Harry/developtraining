import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/userInfo'

export class MyAxios {
  private serve: AxiosInstance
  constructor(baseURL: string) {
    this.serve = axios.create({
      baseURL
    })

    this.serve.interceptors.request.use(
      (config) => {
        if (config.method?.toUpperCase() === 'GET') {
          config.params = config.data
        }
        const user = useUserStore()
        config.headers.Authorization = user.access
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.serve.interceptors.response.use(
      ({ data }) => {
        return data
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  http<T = any>(config: AxiosRequestConfig) {
    return this.serve.request<any, T, any>(config)
  }
}
