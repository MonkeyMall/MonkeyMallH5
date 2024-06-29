<template>
  <view class="mineIndexBox">
    <view>
      <view class="header" v-if="userInfo">
        <image
          :src="host + userInfo.header"
          mode="scaleToFill"
        />
        <view class="name">{{ userInfo.username }}</view>
      </view>
      <view v-else class="loginBtn" @click="goLogin">登 录</view>
      <view class="uset-list">
        <view class="uset-list-item" @click="goPage('/pages/ridicule/add')">
          <view class="uset-list-item-label">
            <view class="iconfont">&#xe644;</view>
            <view>我要提问</view>
          </view>
          <view class="iconfont right">&#xe840;</view>
        </view>
        <view class="uset-list-item">
          <view class="uset-list-item-label">
            <view class="iconfont">&#xe6bf;</view>
            <view>我的侃言</view>
          </view>
          <view class="iconfont right">&#xe840;</view>
        </view>
        <view class="uset-list-item" @click="goPage('/pages/compony/collect')">
          <view class="uset-list-item-label">
            <view class="iconfont">&#xe60a;</view>
            <view>公司收藏</view>
          </view>
          <view class="iconfont right">&#xe840;</view>
        </view>
        <view class="uset-list-item">
          <view class="uset-list-item-label">
            <view class="iconfont">&#xe60a;</view>
            <view>侃言收藏</view>
          </view>
          <view class="iconfont right">&#xe840;</view>
        </view>
        <view class="uset-list-item">
          <view class="uset-list-item-label">
            <view class="iconfont">&#xe618;</view>
            <view>我的订单</view>
          </view>
          <view class="iconfont right">&#xe840;</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import config from '@/config/index.js'
export default {
  data() {
    return {
      host: config.COS_CDN_PREFIX_http,
      userInfo: uni.getStorageSync('userInfoJson') ? JSON.parse(uni.getStorageSync('userInfoJson')) : ''
    }
  },
  components: {
  },
  onShow() {
    
  },
  computed: {
    
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
    goLogin() {
      uni.navigateTo({
        url: '/pages/login/index'
      })
    },
    goPage(url) {
      let token = uni.getStorageSync('token') || ''
      if (!token) {
        uni.navigateTo({
          url: '/pages/login'
        })
      } else {
        uni.navigateTo({
          url
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loginBtn {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background: #fff;
  color: #000;
  font-size: 32rpx;
  border-radius: 10rpx;
}
.mineIndexBox {
  padding: 20rpx;
}
.header {
  display: flex;
  align-items: center;
  gap: 30rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 10rpx;
  image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }
  .name {
    font-size: 32rpx;
    font-weight: bold;
  }
}
.uset-list {
  font-size: 28rpx;
  margin-top: 30rpx;
  .uset-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30rpx 20rpx;
    background: #fff;
    &:not(:last-child) {
      border-bottom: 1rpx solid #f5f5f5;
    }
    .uset-list-item-label {
      flex: 1;
      display: flex;
      gap: 16rpx;
      align-items: center;
    }
    .right {
      font-size: 40rpx;
    }
  }
}
</style>