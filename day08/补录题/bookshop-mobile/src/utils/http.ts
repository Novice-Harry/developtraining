import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { useCounterStore } from '@/stores/counter'

class MyAxios {
  serve: AxiosInstance
  constructor(baseURL: string) {
    this.serve = axios.create({
      baseURL
    })

    this.serve.interceptors.request.use(
      (config) => {
        const counter = useCounterStore()
        config.headers.Authorization = counter.token
        if (config.method?.toUpperCase() === 'GET') {
          config.params = config.data
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.serve.interceptors.response.use(
      ({ data }) => data,
      (error) => Promise.reject(error)
    )
  }

  http<T = any>(config: AxiosRequestConfig) {
    return this.serve.request<any, T, any>(config)
  }
}

export default new MyAxios('https://api.shop.eduwork.cn/')
