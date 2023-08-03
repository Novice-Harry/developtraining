// 整个项目的数据类新约束都放在这里

// 登录页
/**
 * 登录请求数据
 */
export interface ILoginForm {
  email: string
  password: string
}

/**
 * 用户列表请求数据
 */
export interface IGetUsersData {
  current: number
  name: string
  email: string
  phone: string
}
/**
 * 单个用户数据类型
 */
export interface IUserData {
  avatar: null
  avatar_url: string
  created_at: string
  email: string
  id: number
  is_locked: number
  name: string
  openid: null
  phone: null
  total: number
  unum: number
  updated_at: string
}
/**
 * 用户列表响应数据
 */
export interface IGetUsersResult {
  data: IUserData[]
  meta: {
    pagination: {
      total: number
    }
  }
}
/**
 * 添加用户请求数据
 */
export interface IAddUserData {
  name: string
  email: string
  password: string
}
/**
 * 编辑用户请求数据
 */
export interface IEditUserData {
  name: string
  email: string
  users: number
}
