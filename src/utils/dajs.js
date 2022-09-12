import dayjs from 'dayjs'// 导入dayjs
import Vue from 'vue'
import 'dayjs/locale/zh-cn' // 使用本地化语言
import relativeTime from 'dayjs/plugin/relativeTime' // 导入本地化语言
dayjs.locale('zh-cn')// 导入处理时间的插件
dayjs.extend(relativeTime) // 使用插件
Vue.filter('timer', (t) => {
  return dayjs().to(dayjs(t))
})
