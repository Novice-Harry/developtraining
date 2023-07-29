import axios, { type AxiosRequestConfig } from 'axios'

const serve = axios.create({
  baseURL: '/api'
})

serve.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    config.headers.token = token ? token : ''
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
serve.interceptors.response.use(
  ({ data }) => {
    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const http = <T = any>(config: AxiosRequestConfig) => {
  return serve.request<any, T, any>(config)
}
