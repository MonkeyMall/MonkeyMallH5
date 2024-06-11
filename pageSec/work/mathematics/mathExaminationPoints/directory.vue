<template>
  <view class="page section-list">
    <view class="section-list-header">
      <view class="section-list-header-left">
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/exercise/book.png"
          mode="scaleToFill"
        />
      </view>
      <view class="section-list-header-right">
        <view class="section-list-header-right-title">马克思主义基本原理概论</view>
        <view class="section-list-header-right-jd">
          学习进度：
          <text>40%</text>
          <view class="bar">
            <view
              class="barRed"
              style="width: 50%"
            ></view>
          </view>
        </view>
        <view class="section-list-header-right-zql">已练习：845 / 4000 正确率：78.56%</view>
      </view>
    </view>
    <view class="section-list-label">章节目录</view>
    <view class="section-list-list">
      <view
        class="section-list-list-item"
        @click="jumpDoing"
      >
        <view class="section-list-list-item-title">第一章 马克思主义基本原理概论</view>
      </view>
      <view class="section-list-list-item">
        <view class="section-list-list-item-title">第二章 马克思主义基本原理概论</view>
      </view>
      <view class="section-list-list-item">
        <view class="section-list-list-item-title">第三章 马克思主义基本原理概论</view>
      </view>
      <view class="section-list-list-item">
        <view class="section-list-list-item-title">第四章 马克思主义基本原理概论</view>
      </view>
      <view class="section-list-list-item">
        <view class="section-list-list-item-title">第五章 马克思主义基本原理概论</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    jumpDoing(item) {
      this.$tab.navigateTo('/pageSec/work/english/wrongQuestion')
      // this.$tab.navigateTo('/pageSec/work/exercise/section/doing')
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 24rpx 30rpx;
  background: $uni-color-bg;
}
.section-list {
  &-header {
    border-radius: 16rpx;
    background: $uni-bg-color;
    padding: 32rpx 16rpx;
    font-size: 24rpx;
    font-weight: 600;
    color: $uni-text-color;
    @include alignCenter;
    &-left {
      width: 94rpx;
      height: 110rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    &-right {
      margin-left: 16rpx;
      &-title {
        font-size: 32rpx;
        font-weight: 600;
        color: $uni-text-color;
      }
      &-jd {
        @include alignCenter;
        margin: 16rpx 0 24rpx;
        text {
          font-size: 28rpx;
        }
        .bar {
          width: 288rpx;
          height: 8rpx;
          border-radius: 8rpx;
          background: $uni-bg-color-tag;
          position: relative;
          margin-left: 40rpx;
          .barRed {
            height: 8rpx;
            border-radius: 8rpx;
            background: $uni-color-primary;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
      // &-zql {
      //   line-height: normal;
      // }
    }
  }
  &-label {
    font-size: 28rpx;
    font-weight: 600;
    color: $uni-text-color;
    margin: 32rpx 0 32rpx 17rpx;
  }
  &-list {
    &-item {
      border-radius: 24rpx;
      background: $uni-bg-color;
      padding: 32rpx 16rpx;
      font-size: 24rpx;
      font-weight: 600;
      color: $uni-text-color;
      margin-bottom: 24rpx;
      &-cons {
        margin-top: 30rpx;
        @include flexBetween;
        &-jd {
          font-size: 26rpx;
          font-weight: 400;
          color: $uni-text-color-grey;
        }
        &-btn {
          width: 120rpx;
          line-height: 40rpx;
          border-radius: 224rpx;
          background: $uni-color-primary-fz;
          font-size: 26rpx;
          font-weight: 400;
          color: $uni-color-primary;
          text-align: center;
        }
      }
    }
  }
}
</style>
