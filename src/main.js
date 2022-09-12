import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式组件
import './styles/index.less'
// 导入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入flexible
import 'lib-flexible'
// 引入dayjs
import './utils/dajs'
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
