<template>
  <!-- :style="{height: `${windowHeight}px`}" -->
  <view class="mine-container">
    <!--顶部个人信息栏-->
    <slot></slot>
    <view class="mine-li">
      <view class="mine-li-item" @click="handleToInfo('/pageSec/mine/info/index')">
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/mine-zl.png"
          mode="scaleToFill" />
        <view>
          <view class="title">我的个人资料</view>
          <view class="des">查看我的个人资料</view>
        </view>
      </view>
      <view class="mine-li-item" @click="handleToInfo('/pageSec/mine/orderlist/index')">
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/mine-dd.png"
          mode="scaleToFill" />
        <view>
          <view class="title">我的订单</view>
          <view class="des">查看我的个人订单</view>
        </view>
      </view>
    </view>
    <view class="content-section">
      <view class="menu-list">
        <view class="list-cell list-cell-arrow" @click="handleToInfo('/pageSec/mine/notification/index')">
          <view class="menu-item-box">
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/myindex/icon-xiaoxitzhi.svg"
              mode=""></image>
            <view>消息通知</view>
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
        <view class="list-cell list-cell-arrow" @click="handleToInfo('redBoxRain')">
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
import { participateActivities } from '@/api/comm'
export default {
  data() {
    return {
      name: this.$store.state.user.name,
      version: getApp().globalData.config.appInfo.version
    }
  },
  computed: {
    avatar() {
      return this.$store.state.user.avatar
    },
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  created() {
    // 获取用户信息
    console.log('userinfo', this.$store)
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
    handleToLogin() {
      this.$tab.navigateTo('/pages/login')
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color;
}

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
  // background: linear-gradient(to bottom, #FFF6DB, #f6f8fd);
  background: linear-gradient(#fff6db 0%, #ffffff 100%);

  // background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5));
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

  .mine-li {
    display: flex;

    .mine-li-item {
      display: flex;
      width: 330rpx;
      height: 138rpx;
      background: $uni-bg-color;
      // box-shadow: 0px 2rpx 16rpx  #FFC44B;
      box-shadow: 0px 2rpx 16rpx rgba(255, 196, 75, 0.1);
      border-radius: 16rpx;
      margin-top: 160rpx;
      margin-left: 30rpx;

      image {
        width: 88rpx;
        height: 80rpx;
        margin: 36rpx 16rpx;
      }

      .title {
        font-size: 28rpx;
        font-weight: 600;
        margin-top: 24rpx;
        margin-bottom: 16rpx;
      }

      .des {
        font-size: 24rpx;
        font-weight: 400;
        color: $uni-text-color-grey;
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
      padding: 26rpx 0;
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