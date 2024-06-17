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
    this.getUserProfile()
    // setToken('eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjkxYjg5ZDM2LTZmZDQtNGRmMi05YmEwLWFlY2IyNmIwOTVhYiIsInVzZXJuYW1lIjoi5qyy54Gr5qeD5raFIn0.ECYn5TG6-kHMHk_7wgAbAGZm-g6Q1rLKqOWJC0SVi9mUm-dA3OpI-4v-8SSqJAL_UjiJ_sYgQ8p4u2WWQSQe_A')
  },
  onShow: function () {
  },
  onHide: function () {
  },
  data() {
    return {
      code: '',
      secret:'81f356ecc783b0b947de502cb1ec9134',
      encryptedData: '',
      iv: '',
      header: '',
      userName: '',
      sessionKey: '',
      openid: ''
    }
  },
  created() {
  },
  methods: {
    initConfig() {
      this.globalData.config = config
    },
    getUserProfile() {
      let _this = this
      const accountInfo = uni.getAccountInfoSync();
      const appId = accountInfo.miniProgram.appId;
      if (!uni.getStorageSync('userInfo')) {
        uni.login({
          success(res_) {
            _this.code = res_.code
            if (res_.code) {
              uni.getUserInfo({
                success: function(res) {
                  console.log('用户信息：', res)
                  _this.encryptedData = res.encryptedData;
                  _this.iv = res.iv;
                  _this.header = res.userInfo.avatarUrl;
                  // _this.userName = res.userInfo.nickName;
                  _this.userInfo = res.userInfo;
                  wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+ appId+'&secret='+_this.secret+'&js_code='+_this.code+'&grant_type=authorization_code',
                    success: function (res) {
                      console.log('获取openid:', res)
                      _this.sessionKey = res.data.session_key;
                      _this.openid = res.data.openid;
                      uni.setStorageSync('openid', _this.openid)
                      uni.setStorageSync('header', _this.header)
                      uni.setStorageSync('userInfo', JSON.stringify(_this.userInfo))
                    }
                  })
                }
              })
            }
          }
        })
      }
    },
    async checkLogin() {
      console.log('执行了')
    }
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/static/scss/index.scss';
</style>
