import myAxios from '@/utils/http'

export default {
  /**
   * 获取首页数据
   * @returns
   */
  getIndex: () => myAxios.http({ url: '/api/index', method: 'GET' }),
  /**
   * 登录
   * @param data
   * @returns
   */
  login: (data: any) =>
    myAxios.http({ url: '/api/auth/login', method: 'POST', data }),
  /**
   * 登录
   * @param data
   * @returns
   */
  logout: () => myAxios.http({ url: '/api/auth/logout', method: 'POST' }),
  /**
   * 商品详情
   * @param good
   * @returns
   */
  getDetail: (good: any) =>
    myAxios.http({ url: `/api/goods/${good}`, method: 'GET' }),
  /**
   * 收藏
   * @param goods
   * @returns
   */
  collects: (goods: any) =>
    myAxios.http({ url: `/api/collects/goods/${goods}`, method: 'POST' }),
  /**
   * 收藏列表
   * @returns
   */
  getCollects: (data: any) =>
    myAxios.http({ url: `/api/collects`, method: 'GET', data }),
  /**
   * 添加到购物车
   * @param data
   * @returns
   */
  addToCart: (data: any) =>
    myAxios.http({ url: '/api/carts', method: 'POST', data }),
  /**
   * 获取购物车
   */
  getCart: () =>
    myAxios.http({
      url: '/api/carts',
      method: 'GET',
      data: { include: 'goods' }
    }),
  /**
   *
   * @param data 选中
   * @returns
   */
  check: (data: any) =>
    myAxios.http({ url: '/api/carts/checked', method: 'PATCH', data }),
  /**
   * 获取用户信息
   * @returns
   */
  getUser: () => myAxios.http({ url: '/api/user', method: 'GET' })
}
