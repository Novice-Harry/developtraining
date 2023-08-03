import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

import { useUserStore } from '@/stores/user'

class FAxios {
  serve: AxiosInstance
  constructor(baseURL: string) {
    this.serve = axios.create({ baseURL })
    // 请求拦截
    this.serve.interceptors.request.use(
      (config) => {
        const userStore = useUserStore()
        config.headers.Authorization = userStore.getToken()
        if (config.method?.toUpperCase() === 'GET') {
          config.params = config.data
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    // 响应拦截
    this.serve.interceptors.response.use(
      ({ data }) => data,
      (error) => Promise.reject(error)
    )
  }

  http<T = any>(config: AxiosRequestConfig) {
    return this.serve.request<any, T, any>(config)
  }
}

export default new FAxios('https://api.shop.eduwork.cn/')
