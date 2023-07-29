import { http } from '@/utils/http'
interface mhrIlogindata {
  username: string
  password: string
  userType: number
}
export const API = {
  /**
   * 登录
   * @param data
   * @returns
   */
  loginApi: (data: mhrIlogindata) =>
    http({
      url: '/user/login',
      method: 'POST',
      data
    }),
  /**
   * 获取用户菜单数据
   * @returns
   */
  getMenuApi: () =>
    http({
      url: '/user/getMenuList',
      method: 'GET'
    }),
  /**
   * 用户信息
   * @param data
   * @returns
   */
  getUserInfo: (data: { id: number }) =>
    http({
      url: '/user/getInfo',
      method: 'GET',
      params: data
    })
}
