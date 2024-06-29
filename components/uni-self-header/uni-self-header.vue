<template>
  <view class="self-header-page">
    <view class="linear-box"
      :style="{ 'height': !isWhite ? obj.top + obj.height + boxHeight + 'px' : obj.top + obj.height + 'px', 'background': !isWhite ? linearColor : '#ffffff', 'zIndex': !isWhite ? '-1' : '10' }">
    </view>
    <view class="self-header-page-title" :style="{ 'top': obj.top + 'px', 'lineHeight': obj.height + 'px' }">
      <i v-if="hasBack" class="iconfont" @click="back">&#xe609;</i>
      <view class="titBox" :style="{ 'fontSize': isIos ? '32rpx' : '36rpx', 'fontWeight': isIos ? '600' : '400' }">
        {{ title }}
      </view>
    </view>
    <view class="slot-view"
      :style="{ 'top': obj.top + obj.height + 'px' }">
      <slot></slot>
    </view>
  </view>
</template>
<script>
import { getWetchatName } from '@/utils/auth'

/**
 * title 标题
 * 
 * boxHeight 线性渐变色-盒子高度
 * 
 * linearColor 线性渐变色
 */

export default {
  name: 'UniSelfHeader',
  props: {
    title: {
      type: String,
      default: getWetchatName() || '考研一起卷'
    },
    boxHeight: {
      type: Number,
      default: 0
    },
    linearColor: {
      type: String,
      default: ''
    },
    hasBack: {
      type: Boolean,
      default: false
    },
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      top: 0,
      obj: {
        width: 0,
        height: 0,
        top: 0,
        pageTop: 0
      },
      isWhite: false,
      isIos: uni.getSystemInfoSync().platform === 'ios'
      // fontSizeNum: 16
    }
  },
  onLoad() {

  },
  mounted() {
    // this.fontSizeNum = uni.getSystemInfoSync().fontSizeSetting
    this.jnbtn()
    this.getStatusHeight()
    console.log('global的数据', getApp())
  },
  watch: {
    scrollTop(n) {
      // console.log('页面滚动的高度：', n)
      if (n > 10) {
        // 背景为白色
        this.isWhite = true
        // wx.setNavigationBarColor({
        //   backgroundColor: '#ffffff',
        //   animation: {
        //     duration: 400,
        //     timingFunc: 'easeIn'
        //   },
        //   success: () => {
        //     console.log('导航栏背景颜色设置成功')
        //   },
        //   fail: () => {
        //     console.log('导航栏背景颜色设置失败')
        //   },
        //   complete: () => {
        //     console.log('导航栏背景颜色设置结束')
        //   },
        // })
      } else {
        // 其他为渐变色
        this.isWhite = false
      }
    }
  },
  methods: {
    // 获取右上角胶囊按钮的参数
    jnbtn() {
      let jn = uni.getMenuButtonBoundingClientRect();
      let obj = {
        width: jn.width,
        height: jn.height,
        top: jn.top,
        pageTop: jn.top + jn.height
      }
      this.obj = obj;
      this.top = jn.top + jn.height - 24 + 'px'
      // console.log('获取右上角胶囊按钮的参数:', obj)
      return obj;
    },
    // 小程序获取顶部状态栏的高度
    getStatusHeight() {
      // console.log('获取状态栏的参数:', uni.getSystemInfoSync(), uni.getSystemInfoSync().statusBarHeight)
      return uni.getSystemInfoSync().statusBarHeight;
    },
    back() {
      // console.log('点击返回按钮')
      this.$tab.navigateBack()
    }
  }
}
</script>
<style lang="scss" >
.self-header-page {
  position: relative;

  .linear-box {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  &-title {
    width: 100%;
    line-height: 32rpx;
    font-size: 16rpx;
    font-weight: 400;
    letter-spacing: 0px;
    color: rgba(51, 51, 51, 1);
    position: fixed;
    left: 0;
    z-index: 10;

    .iconfont {
      z-index: 100;
      font-size: 52rpx;
      position: absolute;
      top: 0rpx;
      left: -26rpx;
      font-weight: 500;
      color: $uni-text-color;
    }

    .titBox {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 36rpx;
      // font-family: normal;
    }
  }
}

.slot-view {
  position: relative;
}
</style>
