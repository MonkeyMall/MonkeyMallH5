<template>
  <view class="mineIndexBox">
    <view v-if="userInfo">
      用户名：{{ userInfo.username }}
    </view>
    <view v-else class="loginBtn" @click="goLogin">登录</view>
  </view>
</template>

<script>
import { randomAcquisition } from '@/api/work/english'
import mineIndexTemplate1 from '@/pages/mine/components/mineIndexTemplate1.vue'
import { getPhone, getAvatar } from '@/utils/auth'
import { setTabBar } from '@/utils/utils'
import { getWetchatName } from '@/utils/auth'

export default {
  data() {
    return {
      userInfo: JSON.parse(uni.getStorageSync('userInfoJson')) || ''
    }
  },
  components: {
    mineIndexTemplate1
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
</style>