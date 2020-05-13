// 初始化dayjs想换配置
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// 配置中文语言包
dayjs.locale('zh-cn')
// 把处理相对时间代码包装成全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
