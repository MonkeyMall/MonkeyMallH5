<template>
  <view class="normal-login-container">
    <view class="logo-content">
      <image style="width: 100%;"
        src="https://education-1323054692.cos.ap-beijing.myqcloud.com/miniTeacher/static/images/loginT.png"
        mode="widthFix">
      </image>
      <view class="title">
        <view class="hellow">您好，</view>
        <view>欢迎使用研毅boss助手</view>
      </view>
    </view>
    <view class="login-form">
      <view class="login-form-item">
        <view class="login-form-item-label">手机号</view>
        <view class="login-form-item-input">
          <input type="number" v-model="loginForm.username" class="input" placeholder="请输入您的手机号" maxlength="30" />
          </view>
      </view>
      <view class="login-form-item">
        <view class="login-form-item-label">密码</view>
        <view v-if="!lookPass" class="login-form-item-input">
          <input v-model="loginForm.password" type="password" class="input" placeholder="请输入您的密码" maxlength="20" />
        </view>
        <view v-else class="login-form-item-input">
          <input v-model="loginForm.password" type="text" class="input" placeholder="请输入您的密码" maxlength="20" />
        </view>
        <image class="iconEye" v-if="!lookPass" @click="forgetPass"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/miniTeacher/static/images/noEye.png"
          mode="scaleToFill" />
  
        <image class="iconEye" v-else @click="forgetPass"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/miniTeacher/static/images/eye.png"
          mode="scaleToFill" />
      </view>
    </view>
    <view class="action-btn">
      <button @click="handleLogin" class="login-btn cu-btn block bg-blue lg round">登录</button>
    </view>
  </view>
</template>

<script>
import {
  getCodeImg
} from '@/api/login'

export default {
  data() {
    return {
      isAgree: [0],
      hobby: [{
        text: '',
        value: 1
      }],
      lookPasss: false,
      checkbox1: 0,
      codeUrl: "",
      captchaEnabled: true,
      lookPass: false,
      // 用户注册开关
      register: false,
      globalConfig: getApp().globalData.config,
      loginForm: {
        username: "", // 18535051000 13699153452
        password: "", //"123456",
        header: uni.getStorageSync('header'),
        openid: uni.getStorageSync('openid')
      }
    }
  },
  created() {
  },
  methods: {
    // quertse() { //	取消
    //   this.$refs.popup.close()
    // },
    forgetPass() {
      this.lookPass = !this.lookPass
    },
    // 用户注册
    handleUserRegister() {
      this.$tab.redirectTo(`/pages/register`)
    },
    // 获取图形验证码
    getCode() {
      getCodeImg().then(res => {
        console.log('验证码信息：', res)
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
        if (this.captchaEnabled) {
          this.codeUrl = 'data:image/gif;base64,' + res.img
          this.loginForm.uuid = res.uuid
        }
      })
    },
    // 登录方法
    async handleLogin() {
      if (this.loginForm.username === "") {
        this.$modal.msgError("请输入您的账号")
      } else if (this.loginForm.password === "") {
        this.$modal.msgError("请输入您的密码")
      } else {
        this.pwdLogin()
      }
    },
    // 密码登录
    async pwdLogin() {
      let _that = this
      console.log('提交的参数', this.loginForm)
      this.$store.dispatch('Login', this.loginForm).then((res) => {
        // console.log('登录成功后的res：', res)
        this.$tab.reLaunch('/pages/index')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.xyx {
  color: #366ff5;

}

.normal-login-container {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;

  .logo-content {
    width: 100%;
    position: relative;

    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333333;
      line-height: 38rpx;
      position: absolute;
      bottom: 150rpx;
      left: 54rpx;

      .hellow {
        margin-top: 16rpx;
      }
    }
  }

  .login-form {
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    margin-top: -40rpx;
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
    z-index: 1;
    padding: 0 54rpx;

    &-item {
      padding-top: 50rpx;
      padding-bottom: 24rpx;
      border-bottom: 2rpx solid #f3f6fc;
      position: relative;

      &-label {
        font-size: 32rpx;
        font-weight: 500;
        color: #333333;
        margin-bottom: 40rpx;
      }

      &-input {
        padding-right: 60rpx;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        &.noPadd {
          padding-right: 0rpx;
        }

        .input {
          width: 100%;
          height: 100%;
        }

        .login-code-img {
          width: 160rpx;
          height: 60rpx;
        }
      }

      .iconEye {
        width: 44rpx;
        height: 44rpx;
        position: absolute;
        right: 0;
        bottom: 22rpx;
      }
    }
  }

  .noPass {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    font-weight: 400;
    color: #366ff5;
    margin-top: 32rpx;
    padding-left: 54rpx;

    .lock {
      width: 44rpx;
      height: 44rpx;
      margin-right: 16rpx;
    }
  }

  .action-btn {
    width: 690rpx;
    height: 80rpx;
    background: #366ff5;
    border-radius: 68rpx 68rpx 68rpx 68rpx;
    margin: 105rpx auto 0;
  }

  .iphone-bottom {
    width: 100%;
    text-align: center;
    font-size: 24rpx;
    font-weight: 400;
    position: fixed;
    bottom: 40rpx;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333333;

    /deep/ .uni-data-checklist .checklist-group .checklist-box .checkbox__inner {
      border-radius: 50%;
    }

    /deep/ .uni-data-checklist .checklist-group .checklist-box {
      margin-right: 0;
    }

    image {
      width: 44rpx;
      height: 44rpx;
    }

    text {
      color: #366ff5;
    }
  }

  .noAgree {
    // width: 24rpx;
    // height: 24rpx;
    // border-radius: 12rpx;
    // border: 2rpx solid #999999;
    // margin-right: 10rpx;
  }

  .agree {
    width: 24rpx;
    height: 24rpx;
    border-radius: 12rpx;
    border: 2rpx solid #366ff5;
    margin-right: 10rpx;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 12rpx;
      height: 12rpx;
      border-radius: 6rpx;
      background: #366ff5;
      position: absolute;
      top: 25%;
      left: 25%;

    }
  }
}

.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

}

.cu-avatar {
  width: 148rpx;
  height: 148rpx;
  border: 0px solid #eaeaea;
  background: rgba(153, 153, 153, 0);

  .icon {
    font-size: 40px;
  }
}

.bgImg {
  position: fixed;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0;
  z-index: -1;
}


.top {
  padding: 54rpx 0 32rpx 54rpx;
  display: flex;

  >image {
    width: 148rpx;
    height: 148rpx;
  }

  .right {
    margin-left: 41rpx;
    height: 150rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 500;
    color: #333333;
    padding: 24rpx 0;

    .right2 {
      font-size: 28rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      color: #333333;
    }

    .img {
      width: 54rpx;
      height: 24rpx;
      margin-left: 16rpx;
    }

  }
}

.content {
  width: 100%;
  flex: 1;
  background: #fff;
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  overflow: hidden;

  .menu-item-box {
    margin: 32rpx auto 32rpx 46rpx;
    height: 45rpx;
    display: flex;
    align-items: center;
    font-size: 32rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 500;
    color: #333333;

    image {
      width: 32rpx;
      height: 32rpx;
      margin-right: 19rpx;
    }
  }

  .list {
    margin: 0 30rpx;
    padding: auto 16rpx;
    box-shadow: 0rpx 4rpx 16rpx 8rpx #F3F6FC;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    overflow: hidden;
  }
}

/deep/ .uni-list--border-top,
.uni-list--border-top {
  height: 0 !important;
}

/deep/ .uni-list-item {
  height: 100rpx !important;

  .uni-list-item__content-title {
    font-size: 28rpx !important;
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .uni-list-item__extra-text {
    font-size: 28rpx !important;
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }
}

.bcbtns {
  width: 690rpx;
  height: 82rpx;
  opacity: 1;
  border-radius: 50rpx;
  margin: 0 auto;
  background-color: #366FF5;
  color: $uni-text-color-inverse;
  text-align: center;
  line-height: 80rpx;
  font-size: 32rpx;
  font-weight: 500;
  margin-top: 80rpx;
}

.popquits {
  width: 532rpx;
  height: 257rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  padding-top: 40rpx;
  position: relative;

  .titles {
    font-size: 32rpx;
    font-weight: 600;
    line-height: 44.8rpx;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }

  .conse {
    font-size: 24rpx;
    font-weight: 600;
    letter-spacing: 0px;
    line-height: 33.6rpx;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    margin-top: 24rpx;
    margin-bottom: 40rpx;
  }

  .btns {
    width: 100%;
    display: flex;
    border-radius: 16rpx;
    position: absolute;
    bottom: 0;

    text {
      display: block;
      height: 82rpx;
      line-height: 80rpx;
      width: 50%;
      position: absolute;
      text-align: center;
      bottom: 0;
      font-size: 28rpx;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      border-radius: 16rpx;
    }

    .quses {
      right: 0;
      background-color: #366FF5;
      border-radius: 16rpx 0rpx 16rpx 0rpx;
      color: $uni-text-color-inverse;
    }
  }
}

.titlrs {
  font-size: 32rpx;
  font-weight: 500;
  line-height: 45px;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  padding-top: 100rpx;
  position: relative;
}

.icoblase {
  position: absolute;
  display: block;
  top: 100rpx;
  left: 38rpx;
}
</style>