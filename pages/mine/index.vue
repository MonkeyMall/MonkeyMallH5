<template>
  <view class="mineIndexBox">
    <mineIndexTemplate1 v-if="templatePage === 1">
      <uni-self-header :boxHeight="150" :linearColor="linearColor" :hasBack="false" :title="title">
        <view class="header-section">
          <view class="flex  justify-between">
            <view class="flex">
              <view v-if="!avatar" class="cu-avatar xl round bg-white">
                <view class="iconfont icon-people text-gray icon"></view>
              </view>
              <image v-if="avatar" @click="handleToLogin" :src="avatar" class="cu-avatar xl round" mode="widthFix">
              </image>
              <view v-if="!name" @click="handleToLogin" class="login-tip">
                登录
              </view>
              <view v-if="name" @click="handleToInfo('/pages/mine/info/index')" class="user-info">
                <view class="u_title">
                  {{ name }}
                </view>
                <view class="qianmingse">{{ discourseStr }}</view>
              </view>
            </view>
          </view>
        </view>
      </uni-self-header>
    </mineIndexTemplate1>
    <mineIndexTemplate2 v-else-if="templatePage === 2" :titleName="title">
      <uni-self-header :boxHeight="120" :linearColor="linearColor" :hasBack="false" :title="title">
        <view class="header-section">
          <view class="flex  justify-between">
            <view class="flex">
              <view v-if="!avatar" class="cu-avatar xl round bg-white">
                <view class="iconfont icon-people text-gray icon"></view>
              </view>
              <image v-if="avatar" @click="handleToAvatar" :src="avatar" class="cu-avatar xl round" mode="widthFix">
              </image>
              <view v-if="!name" @click="handleToLogin" class="login-tip">
                登录
              </view>
              <view v-if="name" @click="handleToInfo('/pages/mine/info/index')" class="user-info">
                <view class="u_title">
                  {{ name }}
                </view>
                <view class="qianmingse">{{ discourseStr }}</view>
              </view>
            </view>
          </view>
        </view>
      </uni-self-header>
    </mineIndexTemplate2>
  </view>
</template>

<script>
import { randomAcquisition } from '@/api/work/english'
import mineIndexTemplate1 from '@/pages/mine/components/mineIndexTemplate1.vue'
import mineIndexTemplate2 from '@/pages/mine/components/mineIndexTemplate2.vue'
import { getPhone, getAvatar } from '@/utils/auth'
import { setTabBar } from '@/utils/utils'
import { getWetchatName } from '@/utils/auth'

export default {
  data() {
    return {
      title: '考研一起卷',
      isIos: uni.getSystemInfoSync().platform === 'ios',
      linearColor: 'linear-gradient(to bottom,rgba(255, 232, 227, 1),rgba(255, 255, 255, 1))',
      name: this.addSpacesToPhoneNumber(getPhone()) || '',
      avatar: getAvatar() || 'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/default/default_avatar.png',
      version: getApp().globalData.config.appInfo.version,
      templatePage: Number(uni.getStorageSync('templateNum')) || 1, // 模板
      templatePage: 2, // 模板
      discourseStr: ''
    }
  },
  components: {
    mineIndexTemplate1,
    mineIndexTemplate2
  },
  onShow() {
    this.templatePage = Number(uni.getStorageSync('templateNum')) || 1
    this.name = this.addSpacesToPhoneNumber(getPhone()) || ''
    this.getRandomAcquisition()
    setTabBar()
    if (getWetchatName()) this.title = getWetchatName()
  },
  computed: {
    // avatar() {
    //   return this.$store.state.user.avatar
    // },
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  created() {

  },
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: getWetchatName(),
      path: '/pages/mine/index',
    };
  },
  methods: {
    addSpacesToPhoneNumber(phoneNumber) {
      if (!phoneNumber) return ''
      // return phoneNumber.slice(0, 3) + ' ' + phoneNumber.slice(3, 7,) + ' ' + phoneNumber.slice(7)
      return phoneNumber.slice(0, 3) + ' ' + '****' + ' ' + phoneNumber.slice(7)
    },
    // 获取激励语
    getRandomAcquisition() {
      randomAcquisition().then(res => {
        if (res.code === 200) {
          this.discourseStr = res.data.discourseStr
        }
      })
    },
    handleToLogin() {
      if (getPhone()) {
        return
      }
      this.$tab.navigateTo('/pages/login')
    },
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: $uni-bg-color;
}

.mineIndexBox {
  min-height: 100vh;
  background: #fff;
}

.titlrs {
  font-size: 36rpx;
  font-weight: 400;
  line-height: 44.8px;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  padding-top: 100rpx;
}

.flex {
  display: flex;
}

.mine-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #ffe8e3, #f6f8fd);

  .header-section {
    padding: 30rpx 45rpx;

    .login-tip {
      display: block;
      margin-left: 24rpx;
      font-size: 32rpx;
      font-weight: 600;
      // padding-top: 40rpx;
    }

    .cu-avatar {
      width: 160rpx;
      height: 160rpx !important;
      // border: 2px solid #eaeaea;

      .icon {
        font-size: 40px;
      }
    }

    .user-info {
      margin-left: 24rpx;
      // padding-top: 40rpx;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .u_title {
        font-size: 32rpx;
        font-weight: 600;
      }

      .qianmingse {
        font-size: 26rpx;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
        text-align: left;
        margin-top: 10rpx;
      }
    }
  }

  .content-section {
    position: relative;
    margin-top: 40rpx;
    background-color: white;
    min-height: 70%;

    .menu-list {
      margin: 0;
      padding: 0 38rpx;

      .action-item {
        .icon {
          font-size: 28px;
        }

        .text {
          display: block;
          font-size: 13px;
          margin: 8px 0px;
        }
      }
    }

    .list-cell {
      padding: 32rpx 0;
      font-size: 28rpx;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
  }

  .list-cell-arrow::before {
    border-color: #0d0d0d !important;
  }

  .menu-item-box {
    image {
      width: 32rpx;
      height: 32rpx;
      margin-right: 19rpx;
    }
  }
}
</style>