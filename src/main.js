import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载Vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 自动设置rem基准值
import 'amfe-flexible'
// 加载全局样式
import './styles/index.less'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
