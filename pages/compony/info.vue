<template>
  <view>
    <view class="compony-list" v-if="info">
      <view class="compony-list-item">
        <image
          :src="info.logo"
          mode="scaleToFill"
        />
        <view class="compony-list-item-right">
          <view class="compony-list-item-right-title">
            <text>{{ info.name }}</text>
          </view>
          <view class="compony-list-item-right-address">
            <text>{{ info.address }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="info-box">
      <view class="compony-info">
        <view class="compony-info-lable">基础信息</view>
        <view class="compony-info-des">
          <view>行业： {{ info.industry }}</view>
          <view>规模： {{ info.scale }}</view>
          <view>工资范围： {{ info.wage }}</view>
          <view>成立时间： 2024年3月11日</view>
        </view>
      </view>
      <view class="compony-other">
        <view>融资情况： {{ info.financing }}</view>
        <view>五险： {{ info.accumulation === '1' ? '有' : '无'}}</view>
        <view>一金： {{ info.insurance === '1' ? '有' : '无' }}</view>
        <view>福利： {{ info.welfare }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getComponyList
} from '@/api/guoguo.js'
// import { listForApplet } from '@/api/comm'
// import { getWetchatName } from '@/utils/auth'
// import config from '@/config'

export default {
  data() {
    return {
      name: '',
      info: null,
      name: ''
    }
  },
  onLoad(options) {
    this.getList({
      name: options.name,
      limte: 10,
      page: 1
    })
  },
  methods: {
    async getList(obj) {
      const data = await getComponyList({
        ...obj
      })
      console.log('datalist', data)
      this.info = data.data[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.compony-list {
  padding: 0 30rpx;
  border-radius: 10rpx;
  margin-top: 30rpx;
  &-item {
    display: flex;
    align-items: center;
    gap: 30rpx;
    padding: 30rpx;
    background: #fff;
    image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 10rpx;
      overflow: hidden;
    }
    &-right {
      flex: 1;
      &-title {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      &-address {
        font-size: 28rpx;
        @include overline(2);
      }
      &-tags {
        font-size: 24rpx;
        display: flex;
        gap: 10rpx;
        color: #999;
      }
    }
  }
}
.info-box {
  padding: 30rpx;
}
.compony-info {
  display: flex;
  gap: 10rpx;
  padding: 20rpx;
  border-radius: 10rpx;
  background: #fff;
  &-lable {
    width: 50rpx;
    height: 100%;
    font-size: 30rpx;
    color: $uni-color-fz;
    background: #f3fbfb;
    text-align: center;
    padding: 10rpx;
    border-radius: 14rpx;
  }
  &-des {
    flex: 1;
    margin: 10rpx 0;
    font-size: 24rpx;
    color: #333;
    background: #f3fbfb;
    border-radius: 4rpx;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.compony-other {
  padding: 20rpx;
  border-radius: 10rpx;
  background: #fff;
  font-size: 28rpx;
  color: #333;
  margin-top: 20rpx;
}
</style>