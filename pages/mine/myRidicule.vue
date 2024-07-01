<template>
    <view class="ridicule">
      <view class="ridicule-item" @click="toPage(item)" v-for="(item, index) in list" :key="index">
        <!-- <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt=""> -->
        <view class="ridicule-item-cons">
          <view class="ridicule-item-cons-title">{{ item.title }}</view>
          <view class="ridicule-item-cons-content">{{ item.content }}</view>
        </view>
        <view class="ridicule-item-tags">
          <view class="ridicule-item-tags-item xljt" v-if="item.category === '心灵鸡汤'">心灵鸡汤</view>
          <view class="ridicule-item-tags-item shgw" v-else-if="item.category === '生活感悟'">生活感悟</view>
          <view class="ridicule-item-tags-item gztk" v-else>工作调侃</view>
        </view>
      </view>
      <uni-load-more :status="loadingStatus"></uni-load-more>
    </view>
</template>

<script>
import {
  getRidiculeMyList
} from '@/api/guoguo.js'

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more',
      list: []
    }
  },
  onReachBottom() {
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  onShow() {
    this.initData()
  },
  methods: {
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      if (this.list.length < this.total) {
        this.pageNum++
        await this.getList()
      } else {
        this.loadingStatus = 'nomore';
      }
    },
    initData() {
      this.list = []
      this.pageNum = 1
      this.loadingStatus = 'more'
      this.getList()
    },
    toPage(item) {
      console.log(11, item)
      uni.navigateTo({
        url: `/pages/ridicule/info?id=${item._id}`
      })
    },
    async getList() {
      const data = await getRidiculeMyList({
        limte: 10,
        page: this.pageNum
      })
      this.list = this.list.concat(data.data)
      this.total = data.count
      if (this.total <= 10) {
        this.loadingStatus = 'noMore'
      }
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