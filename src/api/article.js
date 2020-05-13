// 文章相关请求模块
import request from '@/utils/request'
// import store from '@/store/'
// 登录/注册
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
