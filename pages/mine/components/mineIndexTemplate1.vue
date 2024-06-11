<template>
  <!-- :style="{ height: `${windowHeight}px` }" -->
  <view class="mine-container">
    <!--顶部个人信息栏-->
    <slot></slot>
    <view class="content-section">
      <view class="menu-list">
        <view class="list-cell list-cell-arrow" @click="handleToInfo('/pageSec/mine/info/index')">
          <view class="menu-item-box">
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/myindex/icon-gerenzhuye.svg"
              mode=""></image>
            <view>个人资料</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleToInfo('/pageSec/mine/notification/index')">
          <view class="menu-item-box">
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/myindex/icon-xiaoxitzhi.svg"
              mode=""></image>
            <view>消息通知</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleToInfo('/pageSec/mine/orderlist/index')">
          <view class="menu-item-box">
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/myindex/icon-wodedingdan.svg"
              mode=""></image>
            <view>我的订单</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleToInfo('/pageFive/mine/feedback/index')">
          <view class="menu-item-box">
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/myindex/icon-wentifankui.svg"
              mode=""></image>
            <view>意见反馈</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow redBoxRain" @click="handleToInfo('redBoxRain')">
          <view class="menu-item-box">
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/myindex/icon-w0de-linghongbao.svg"
              mode=""></image>
            <view>领红包</view>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import storage from '@/utils/storage'
import { getPhone, getAvatar } from '@/utils/auth'
import { participateActivities } from '@/api/comm'
export default {
  data() {
    return {
      name: getPhone(),
      avatar: getAvatar() || 'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/default/default_avatar.png',
      version: getApp().globalData.config.appInfo.version
    }
  },
  onShow() {
    this.name = getPhone()
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
    // 获取用户信息
    console.log('userinfo', this.$store)
    // setTimeout(() => {
    //   wx.setTabBarItem({
    //     index: 0,
    //     text: 'text',
    //     iconPath: '/path/to/iconPath',
    //     selectedIconPath: '/path/to/selectedIconPath'
    //   })
    //   wx.setTabBarItem({
    //     index: 1,
    //     text: 'text',
    //     iconPath: '/path/to/iconPath',
    //     selectedIconPath: '/path/to/selectedIconPath'
    //   })
    //   wx.setTabBarItem({
    //     index: 2,
    //     text: 'text',
    //     iconPath: '/path/to/iconPath',
    //     selectedIconPath: '/path/to/selectedIconPath'
    //   })
    // }, 1000)
  },
  methods: {
    handleToInfo(url) {
      if (url === 'redBoxRain') {
        participateActivities().then(res => {
          if (res.code == 200) {
            this.$tab.navigateTo('/pageFour/redBoxRain/index')
          }
        })
      } else {
        this.$tab.navigateTo(url)
      }
    },
    handleToEditInfo() {
      this.$tab.navigateTo('/pages/mine/info/index')
    },
  }
}
</script>

<style lang="scss" scoped>
// page {
//   min-height: 100vh;
//   background-color: #fff !important;
// }

.titlrs {
  font-size: 32rpx;
  font-weight: 600;
  line-height: 44.8px;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  padding-top: 100rpx;
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
      padding-top: 40rpx;
    }

    .cu-avatar {
      width: 160rpx;
      height: 160rpx;
      border: 2px solid #eaeaea;

      .icon {
        font-size: 40px;
      }
    }

    .user-info {
      margin-left: 24rpx;
      padding-top: 40rpx;

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
    margin-top: 210rpx;

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
      border-bottom: 1rpx solid #f6f8fd;
      // &.redBoxRain {
      //   border-bottom: 0;
      //   &::after {
      //     border-bottom: 0px;
      //   }
      // }
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