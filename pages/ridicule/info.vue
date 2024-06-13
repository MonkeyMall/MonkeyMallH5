<template>
  <view class="ridicule">
    <view class="ridicule-info">
        <view class="ridicule-info-title">标题</view>
        <view class="ridicule-info-cons">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
    </view>
    <view class="ridicule-pl">
      <view class="ridicule-pl-item">
        <view class="header">
          <image class="ridicule-pl-header" src="" mode="aspectFill"></image>
          <text>帅龙龙</text>
        </view>
        <view class="ridicule-pl-cons">品龙的内容</view>
        <view class="date">2024-02-02</view>
      </view>
      <view class="ridicule-pl-item">
        <view class="header">
          <image class="ridicule-pl-header" src="" mode="aspectFill"></image>
          <text>帅龙龙</text>
        </view>
        <view class="ridicule-pl-cons">品龙的内容</view>
        <view class="date">2024-02-02</view>
      </view>
    </view>
    <view class="plBtn" @click="openDialog">评 论</view>
    <uv-popup ref="popup">
      <view>
        <text>出淤泥而不染，濯清涟而不妖</text>
      </view>
    </uv-popup>
  </view>
</template>

<script>
// import workIndexTemplate2 from '@/pages/work/components/workIndexTemplate2.vue'

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more',
      show: false
    }
  },
  onShow() {
    
  },
  components: {
    
  },
  onShareAppMessage(options) {
    
  },
  methods: {
    openDialog() {
      this.$refs.popup.open('bottom')
    }
  }
}
</script>

<style lang="scss" scoped>
.ridicule {
  padding: 30rpx;
  &-info{
    padding: 20rpx;
    background-color: #fff;
    &-title{
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
      color: $uni-text-color;
    }
    &-cons{
      font-size: 28rpx;
      color: $uni-text-color;
    }
  }
  &-pl {
    padding: 20rpx;
    background-color: #fff;
    margin-top: 30rpx;
    &-item {
      &:not(:last-child) {
        border-bottom: 1px solid $uni-border-color;
      }
      padding: 30rpx 0;
      .header {
        display: flex;
        image {
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
          margin-right: 10rpx;
        }
        text {
          font-size: 28rpx;
          color: $uni-text-color;
          font-weight: bold;
        }
      }
      .ridicule-pl-cons {
        font-size: 24rpx;
        color: $uni-text-color;
      }
      .date {
        display: flex;
        justify-content: flex-end;
        font-size: 24rpx;
        color: $uni-text-color-grey;
      }
    }
  }
  .plBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    background-color: $uni-text-color-tag-2;
    font-size: 40rpx;
    color: #fff;
    z-index: 100;
  }
}
</style>