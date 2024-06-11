import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission' // permission
import config from '@/config/index'
import DictData from '@/utils/dict/init'
import DictTag from '@/utils/dict/DictTag'
import wxobs from '@wxobs/miniprogram-sdk';
// import './uni.promisify.adaptor'
import {
	msg,
	json,
	modal
} from '@/utils/index.js'
Vue.prototype.$api = {
	msg,
	json,
	modal
};
Vue.component('DictTag', DictTag)
Vue.use(plugins)
Vue.prototype.$COS_CDN_PREFIX = config.COS_CDN_PREFIX
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$donut = wxobs
let defaultImg = {
  userImg: config.COS_CDN_PREFIX_http + '/mini/static/images/default/default_avatar.png', // 用户默认图片
  bannerImg: config.COS_CDN_PREFIX_http + '/mini/static/images/default/banner.png', // banner默认图片
  courseImg: config.COS_CDN_PREFIX_http + '/mini/static/images/default/course.png', // 课程默认图片
  schoolImg: config.COS_CDN_PREFIX_http + '/mini/static/images/default/school.png', // 学校默认图片
  newsImg: config.COS_CDN_PREFIX_http + '/mini/static/images/default/news.png', // 日报默认图片
}
Vue.prototype.$defaultImg = defaultImg
DictData.install()
App.mpType = 'app'

import { share } from './mixins/indexShare.js'

Vue.mixin(share)

const app = new Vue({
  ...App
})

app.$mount()
