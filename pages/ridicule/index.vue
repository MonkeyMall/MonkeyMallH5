<template>
    <view class="ridicule">
      <view class="ridicule-item">
        <!-- <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt=""> -->
        <view class="ridicule-item-cons">
          <view class="ridicule-item-cons-title">标题</view>
          <view class="ridicule-item-cons-content">内容内容内容内容内容内容内容内容内容内容内容</view>
        </view>
        <view class="ridicule-item-tags">
          <view class="ridicule-item-tags-item xljt">心灵鸡汤</view>
          <view class="ridicule-item-tags-item gztk">工作调侃</view>
        </view>
      </view>
      <view class="ridicule-item" @click="toPage()">
        <!-- <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt=""> -->
        <view class="ridicule-item-cons">
          <view class="ridicule-item-cons-title">标题</view>
          <view class="ridicule-item-cons-content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
        </view>
        <view class="ridicule-item-tags">
          <view class="ridicule-item-tags-item xljt">心灵鸡汤</view>
          <view class="ridicule-item-tags-item shgw">生活感悟</view>
          <view class="ridicule-item-tags-item gztk">工作调侃</view>
        </view>
      </view>
      <uni-load-more :status="loadingStatus"></uni-load-more>
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
    }
  },
  onShow() {
    
  },
  components: {
    
  },
  onShareAppMessage(options) {
    
  },
  methods: {
    toPage() {
      uni.navigateTo({
        url: '/pages/ridicule/info'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ridicule {
  padding: 30rpx;
  &-item {
    padding: 20rpx;
    background: #fff;
    border: 8rpx;
    margin-bottom: 20rpx;
    &-cons {
      &-title{
        font-size: 30rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
        color: $uni-text-color;
      }
      &-content{
        font-size: 28rpx;
        color: $uni-text-color;
        @include overline(4) 
      }
    }
    &-tags {
      display: flex;
      justify-content: flex-end;
      gap: 10rpx;
      margin-top: 20rpx;
      &-item {
        padding: 5rpx 10rpx;
        border-radius: 10rpx;
        font-size: 24rpx;
        color: $uni-text-color;
        &.xljt {
          background: $uni-text-color-tag-2;
          color: #fff;
        }
        &.shgw {
          background: $uni-text-color-tag-3;
          color: #fff;
        }
        &.gztk {
          background: $uni-text-color-tag-4;
          color: #fff;
        }
      }
    }
  }
}
</style>