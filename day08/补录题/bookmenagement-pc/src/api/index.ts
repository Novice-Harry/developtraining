import MyAxios from '@/utils/http'
import type {
  ILoginForm,
  IGetUsersData,
  IAddUserData,
  IEditUserData
} from '@/utils/type'

export const API = {
  /**
   * 登录
   * @param data
   * @returns
   */
  login: (data: ILoginForm) =>
    MyAxios.http({ url: 'api/auth/login', method: 'POST', data }),
  /**
   * 退出登录
   * @returns
   */
  logout: () => MyAxios.http({ url: 'api/auth/logout', method: 'POST' }),
  /**
   * 获取用户列表
   * @param data
   * @returns
   */
  getUsers: (data: IGetUsersData) =>
    MyAxios.http({ url: 'api/admin/users', method: 'GET', data }),
  /**
   * 启用禁用
   * @param user 用户id
   * @returns
   */
  lockUser: (user: number) =>
    MyAxios.http({ url: `api/admin/users/${user}/lock`, method: 'PATCH' }),
  /**
   * 添加用户
   * @param data
   * @returns
   */
  addUser: (data: IAddUserData) =>
    MyAxios.http({ url: '/api/admin/users', method: 'POST', data }),
  /**
   * 编辑用户
   * @param data
   * @returns
   */
  editUser: (data: IEditUserData) =>
    MyAxios.http({
      url: `/api/admin/users/${data.users}`,
      method: 'PUT',
      data
    }),
  /**
   * 用户详情
   * @param user
   * @returns
   */
  getDetail: (user: string) =>
    MyAxios.http({ url: `api/admin/users/${user}`, method: 'GET' })
}
