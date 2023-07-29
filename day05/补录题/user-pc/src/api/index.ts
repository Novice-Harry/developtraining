import {
  type ILoginData,
  type IGetUserListData,
  type IAddUserData,
  type IEditUserData,
  type IDeleteUserData,
  type IChangeUserStatusData
} from '@/utils/type'
import { MyAxios } from '@/utils/http'
const newAxios = new MyAxios('/api')

export const API = {
  /**
   * 登录
   * @param data
   * @returns
   */
  login: (data: ILoginData) =>
    newAxios.http({
      url: 'login',
      method: 'POST',
      data
    }),
  /**
   * 获取用户列表
   * @param data
   * @returns
   */
  getUserList: (data: IGetUserListData) =>
    newAxios.http({
      url: 'users',
      method: 'GET',
      data
    }),
  /**
   * 添加用户
   * @param data
   * @returns
   */
  addUser: (data: IAddUserData) =>
    newAxios.http({
      url: 'users',
      method: 'POST',
      data
    }),
  /**
   * 编辑用户
   * @param data
   * @returns
   */
  editUser: (data: IEditUserData) =>
    newAxios.http({
      url: 'users/' + data.id,
      method: 'PUT',
      data
    }),
  /**
   * 删除用户
   * @param id
   * @returns
   */
  deleteUser: (data: IDeleteUserData) =>
    newAxios.http({
      url: 'users/' + data.id,
      method: 'DELETE'
    }),
  /**
   * 修改用户状态
   * @param data
   * @returns
   */
  changeUserStatus: (data: IChangeUserStatusData) =>
    newAxios.http({
      url: `users/${data.uId}/state/${data.type}`,
      method: 'PUT'
    })
}
