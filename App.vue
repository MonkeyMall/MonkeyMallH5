<script>
import config from './config'
import { 
  setToken, 
  setOpenId, 
  getUserId, 
  setTenantId, 
  setWetchatName,
  setAppInfo,
  getAppInfo
} from '@/utils/auth'
 
import { setTabBar } from '@/utils/utils'
 
import {
  getByAppIdInformation,
  selectTemplate,
  getUv
} from '@/api/comm'
import {
  handcode
} from '@/api/login'
export default {
  onLaunch: function () {
    console.log('App Launch')
    // this.initApp()
    // setToken('eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjkxYjg5ZDM2LTZmZDQtNGRmMi05YmEwLWFlY2IyNmIwOTVhYiIsInVzZXJuYW1lIjoi5qyy54Gr5qeD5raFIn0.ECYn5TG6-kHMHk_7wgAbAGZm-g6Q1rLKqOWJC0SVi9mUm-dA3OpI-4v-8SSqJAL_UjiJ_sYgQ8p4u2WWQSQe_A')
  },
  onShow: function () {
    this.initApp()
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  data() {
    return {
    }
  },
  created() {
    console.log('App created')
    // 注册uView UI全局组件
    // if (!this.$uv) {
    //   this.$u = uView
    // }
  },
  methods: {
    // 初始化应用
    async initApp() {
      await getUv()
      // const accountInfo = uni.getAccountInfoSync()
      // const appId = accountInfo.miniProgram.appId
      // this.getAppIdInfo(appId)
      this.$store.dispatch('SetAppInfo').then((res) => {
        
      })
      if (getUserId()) {
        this.getUserProfile()
      }
      // console.log('执行了1')
      // 初始化应用配置
      this.initConfig()
      // 检查用户登录状态
      //#ifdef H5
      this.checkLogin()
      //#endif
    },
    initConfig() {
      this.globalData.config = config
    },
    // 根据appid获取小程序的信息
    async getAppIdInfo(appId) {
      const {code, data} = await getByAppIdInformation({appId})
      console.log('接口返回的数据', data)
      if (code === 200) {
        setWetchatName(data.miniProgramName)
        setAppInfo(data)
        // this.$store.dispatch('LogOut').then(() => {
        //   this.$tab.reLaunch('/pages/index')
        // })
        console.log('appinfo', getAppInfo())
      }
    },
    getUserProfile() {
      let _this = this
      const accountInfo = uni.getAccountInfoSync();
      const appId = accountInfo.miniProgram.appId;
      wx.login({
        success(res_) {
          let data = {
            code: res_.code,
            appId
          }
          handcode(data).then(async (response) => {
            setOpenId(response.data.openId)
            if (response.data.ifExist) { // 有手机号
              if (response.data.tenantId) setTenantId(response.data.tenantId)
              if (response.data.token) {
                setToken(response.data.token)
                _this.$store.dispatch('GetInfo')
                // setWetchatName(response.data.info.miniProgramName)
                _this.$donut.identify(String(response.data.userId), {
                  openId: response.data.openId,
                  phonenumber: response.data.phonenumber
                })
                
                const { data } = await selectTemplate()
                uni.setStorageSync('templateNum', data)
                setTabBar()
              }
            }
          })
        }
      })
    },
    async checkLogin() {
      console.log('执行了')
      // const modal = await this.$api.modal('删除后不可恢复哦~', '确定删除考试考试吗？', ['取消', '确定'])
      // if (!getPhone()) {
      //   this.$tab.reLaunch('/pages/login')
      // } else {
      //   if (!getToken()) {

      //   }
      // }
    }
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/static/scss/index.scss';
</style>
