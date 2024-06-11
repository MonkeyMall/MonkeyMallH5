<template>
  <view class="imgBox">
    <view class="cardBox">
      <image :src="url" mode="widthFix"></image>
      <view>请联系老师免费查看</view>
    </view>
  </view>
</template>

<script>
import config from '@/config/index'
import { getAppInfo } from '@/utils/auth'
export default {
  data() {
    return {
      url: config.COS_CDN_PREFIX_http + getAppInfo().qrcodeurl || ''
    }
  },
  watch: {
    
  },
  onPullDownRefresh() {
    
  },
  onShow() {
   
  },
  onReachBottom() {
    
  },
  onPageScroll(e) {
    
  },
  onShareAppMessage(options) {
    
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.imgBox {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .cardBox {
    width: 400rpx;
    display: flex;
    padding: 50rpx 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 20rpx;
    // background: linear-gradient(135.5deg, #c7d8ff 0%, #1756fb 100%);
    box-shadow: 0px 10px 20px 0px rgba(23, 86, 251, 0.2);
  }
  image {
    width: 300rpx;
    height: 300rpx;
    margin-bottom: 30rpx;
  }
}
</style>