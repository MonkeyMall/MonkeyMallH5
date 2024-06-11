<template>
  <view class="iphone">
    <view class="iphone-top">
      <image
        :src="appInfo ? COS_CDN_PREFIX_http + appInfo.websiteLogo : 'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/logo1.png'"
        mode="scaleToFill"
      />
      <view class="title">{{appInfo.websiteName || '考研一起卷'}}</view>
    </view>
    <view class="iphone-center">
      <button
        type="default"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
      >手机号授权登录</button>
      <view
        @click="cancleAgreeFn"
        class="cancle-btn"
      >取消</view>
    </view>
    <view
      class="iphone-bottom"
      @click="checkFn"
    >
      <image
        v-show="!isAgree"
        src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/nocheck.png"
        mode="scaleToFill"
      />
      <image
        v-show="isAgree"
        src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/check.png"
        mode="scaleToFill"
      />
      我已阅读并同意<text @click.stop="goFn(1, '用户协议')">《用户协议》</text>和<text @click.stop="goFn(2, '隐私政策')">《隐私政策》</text>
    </view>
    <!-- 关闭提示弹窗 -->
    <uni-popup
      ref="popup2"
      type="center"
      :is-mask-click='false'
    >
      <view class="endPopup">
        <view class="endPopupTop">用户隐私保护指引</view>
        <view class="endPopupMiddle">
          欢迎加入考研小程序,在使用系统前，请您务必审慎阅读<text @click.stop="goFn(2, '考研小程序隐私保护指引')">《考研小程序隐私保护指引》</text>，并充分理解相关协议条款。当您点击同意并继续使用产品服务时，即表示您已理解并同意该条款内容。如您拒绝，将无法进入小程序。
        </view>
        <view class="endPopupBottom">
          <text @click="cancleFn"> 不同意 </text>
          <text @click="agreeFn"> 同意 </text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import config from '@/config/index'
import { setToken, setPhone, setUserId, setOpenId, getTeacherId, setTenantId, setAvatar, setWetchatName, getAppInfo } from '@/utils/auth'
import {
  selectTemplate,
  getUv
} from '@/api/comm'
import {
  handcode,
  handphone
} from '@/api/login'
export default {
  data() {
    return {
      isAgree: false,
      codeUrl: "",
      captchaEnabled: true,
      // 用户注册开关
      register: false,
      ifExist: false,
      userId: '',
      globalConfig: getApp().globalData.config,
      loginForm: {
        username: "admin",
        password: "admin123",
        code: "",
        uuid: ''
      },
      promoterId: getTeacherId() || '',
      referer: '',
      COS_CDN_PREFIX_http: config.COS_CDN_PREFIX_http,
      appInfo: getAppInfo() || null
    }
  },
  created() {
  },
  onLoad(options) {
    console.log('这里走了吗', options)
    this.referer = options.referer || ''
  },
  mounted() {
    this.$refs.popup2.open('center')
  },
  watch: {
    '$store.getters.appInfo':{
      handler(newVal, oldVal) {
        console.log('更新数据', newVal)
        this.appInfo = newVal
      },
      deep: true
    }
  },
  onShow() {
  },
  methods: {
    goFn(num, data) {
      uni.navigateTo({
        url: `/pages/zdyi?id=${num}&data=${data}`
      })
    },
    checkFn() {
      this.isAgree = !this.isAgree
    },
    cancleAgreeFn() {
      let pages = getCurrentPages();
      console.log(11, pages)
      if (pages.length === 1 && pages[0].route == 'pages/login') {
        uni.reLaunch({
          url: '/pages/index'
        });
        return;
      }
      this.$tab.navigateBack()
    },
    // 点击同意
    agreeFn() {
      this.isAgree = true
      this.getUserProfile()
    },
    // 点击不同意
    cancleFn() {
      this.isAgree = false
      this.$refs.popup2.close()
      uni.navigateBack()
    },
    getUserProfile() {
      let that = this
      const accountInfo = uni.getAccountInfoSync();
      const appId = accountInfo.miniProgram.appId;
      wx.login({
        success(res_) {
          let data = {
            code: res_.code,
            appId
          }
          console.log(111, data)
          handcode(data).then(async (response) => {
            console.log(response.data)
            // ifExist true 不调手机号  false 调用 
            // that.ifExist = response.data.ifExist
            that.userId = response.data.userId
            setUserId(response.data.userId)
            setPhone(response.data.phonenumber)
            setOpenId(response.data.openId)
            await getUv(response.data.userId)
            if (response.data.ifExist) { // 有手机号
              if (response.data.token) {
                setToken(response.data.token)
                that.$store.dispatch('GetInfo')
                // setWetchatName(response.data.info.miniProgramName)
                const { code, data } = await selectTemplate()
                uni.setStorageSync('templateNum', data)
              }
              if (response.data.phone) setPhone(response.data.phonenumber)
              if (response.data.tenantId) setTenantId(response.data.tenantId)
              if (response.data.avatar) setAvatar(response.data.avatar)
              that.$refs.popup2.close()
              // 跳转到之前的来源页要跳转的位置
              if (that.referer === 'payinfo') {
                that.$tab.redirectTo('/pages/pay/index')
              } else {
                if (response.data.token) {
                  const { data } = await selectTemplate()
                  uni.setStorageSync('templateNum', data)
                  that.$tab.navigateBack()
                } else {
                  uni.showModal({
                    title: '温馨提示',
                    content: '当前用户未在机构中录入，请联系老师授权账号！',
                    showCancel: false,
                    confirmColor: "#fc515f",
                    confirmText: '联系老师',
                    success: function (res) {
                      if (res.confirm) {
                        uni.navigateTo({
                          url: '/pages/teacherImg'
                        })
                        // const phoneNumber = getAppInfo().phonenumber || '' // 替换成要拨打的电话号码
                        // if (phoneNumber) {
                        //   wx.makePhoneCall({
                        //     phoneNumber: phoneNumber
                        //   })
                        // }
                        // uni.navigateBack()
                      }
                    }
                  })
                }
              }
            } else {
              that.$refs.popup2.close()
              return false
            }
          })
        }
      })
    },
    getPhoneNumber(e) {
      console.log('执行这里了？', e)
      if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
        // 拒绝获取手机号权限
        this.$modal.msgError('登录失败！')
        return
      }
      if (!this.isAgree) {
        this.$modal.msgError('请先同意用户协议和隐私政策！')
        return
      }
      // let useGetPhone = this.getUserProfile()
      if (e.detail.code) {
        this.handphnoe(e.detail.code)
      }
    },
    handphnoe(code) {
      let that = this
      let data = {
        code: code,
        userId: that.userId,
        promoterId: that.promoterId,
      }
      handphone(data).then(response => {
        console.log(response)
        // if (response.data.token) setToken(response.data.token)
        if (response.data.phonenumber) {
          setPhone(response.data.phonenumber)
        }
		    this.getUserProfile()
      })
    },
  }
}
</script>

<style lang="scss">
page {
  background-color: #ffffff;
}

.iphone {
  width: 100%;
  min-height: 100%;

  &-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $uni-text-color;
    font-size: 32rpx;
    font-weight: 600;

    image {
      width: 144rpx;
      height: 144rpx;
      margin-top: 156rpx;
    }

    .title {
      margin-top: 32rpx;
    }
  }

  &-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 200rpx;

    button {
      width: 494rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 16rpx;
      color: $uni-text-color-inverse;
      background: $uni-color-primary;
    }

    .cancle-btn {
      width: 494rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 16rpx;
      color: $uni-color-primary;
      background: $uni-text-color-inverse;
      border: 1px solid $uni-color-primary;
      margin-top: 56rpx;
    }
  }

  &-bottom {
    width: 100%;
    text-align: center;
    font-size: 26rpx;
    font-weight: 600;
    color: $uni-text-color;
    position: fixed;
    bottom: 80rpx;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      width: 44rpx;
      height: 44rpx;
    }
  }
}

.endPopup {
  width: 532rpx;
  // height: 262rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  overflow: hidden;

  .endPopupTop {
    font-size: 32rpx;
    font-weight: 600;
    padding-top: 40rpx;
  }

  .endPopupMiddle {
    padding: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: left;

    text {
      color: $uni-color-primary;
    }
  }

  .endPopupBottom {
    width: 100%;
    height: 80rpx;
    display: flex;
    line-height: 80rpx;

    > text {
      width: 50%;
      text-align: center;
      font-size: 28rpx;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }

    > text:nth-child(2) {
      color: #fff;
      background: $uni-color-primary;
      font-size: 28rpx;
      font-weight: 600;
      border-radius: 16rpx 0 16rpx 0;
    }
  }
}
</style>