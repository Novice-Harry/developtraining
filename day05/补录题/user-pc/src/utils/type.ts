/**
 * 登录数据
 */
export interface ILoginData {
  username: string
  password: string
}
/**
 * 登录返回结果
 */
export interface ILoginResult {
  data: ISetUserInfoDate
  meta: { msg: string; status: number }
}
/**
 * 设置用户信息数据类型
 */
export interface ISetUserInfoDate {
  email: string
  id: number
  mobile: string
  rid: number
  token: string
  username: string
}
/**
 * 用户数据列表请求数据类型
 */
export interface IGetUserListData {
  query: string
  pagenum: number
  pagesize: number
}
/**
 * 用户数据列表响应数据类型
 */
export interface IGetUserListResult {
  data: {
    total: number
    pagenum: number
    users: IUserListItem[]
  }
  meta: {
    msg: string
    status: number
  }
}
/**
 * 用户列表数据类型
 */
export interface IUserListItem {
  id: number
  username: string
  mobile: string
  type: number
  email: string
  create_time: string
  mg_state: boolean
  role_name: string
}

export interface IMyDialogData {
  formLabelWidth: string
  dialogFormVisible: boolean
  title: string
  form: {
    username: ''
    password?: ''
    email: ''
    mobile: ''
    id?: number
  }
  rules: any
}
/**
 * 添加用户请求数据
 */
export interface IAddUserData {
  username: ''
  password?: ''
  email: ''
  mobile: ''
}
/**
 * 添加用户响应数据
 */
export interface IAddUserResult {
  data: {
    create_time: number
    email: string
    id: number
    mobile: string
    role_id: number
    username: string
  }
  meta: { msg: string; status: number }
}
/**
 * 编辑用户请求数据
 */
export interface IEditUserData {
  id: number
  email: string
  mobile: string
}
/**
 * 编辑用户响应数据
 */
export interface IEditUserResult {
  data: {
    email: string
    id: number
    mobile: string
    role_id: number
    username: string
  }
  meta: { msg: string; status: number }
}
/**
 * 删除用户请求数据
 */
export interface IDeleteUserData {
  id: number
}
/**
 * 删除用户响应数据
 */
export interface IDeleteUserResult {
  data: null
  meta: { msg: string; status: number }
}
/**
 * 修改用户状态请求数据
 */
export interface IChangeUserStatusData {
  uId: number
  type: boolean
}
/**
 * 修改用户状态响应数据
 */
export interface IChangeUserStatusResult {
  data: {
    email: string
    id: number
    mg_state: number
    mobile: string
    rid: number
    username: string
  }
  meta: { msg: string; status: number }
}
