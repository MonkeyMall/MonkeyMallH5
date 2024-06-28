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
            <view class="iconfont" @click="collectFn">&#xe60a;</view>
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
      <view class="label">工作感受</view>
      <view class="pl-list">
        <view class="pl-list-ul">
          <view class="pl-list-li" v-for="(item, index) in componyCommentList" :key="index">
            <view>{{ item.userId.username}}</view>
            <view  class="pl-list-li-des">{{ item.componyContents}}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 评论公司按钮 -->
    <view class="add-btn" @click="addPlFn">
      <view class="iconfont">&#xe600;</view>
     </view>
     <uv-popup ref="popup">
      <view class="login-form">
        <view class="login-form-item">
          <uv-textarea
            v-model="componyContents"
            height="255rpx"
            border="none"
            placeholder="请输入您的在职感受。"
            count
            maxlength="200"
          ></uv-textarea>
          <view class="pl-btn" @click="submitPlFn()">评 论</view>
        </view>
      </view>
    </uv-popup>
  </view>
</template>

<script>
import {
  getComponyList,
  setCommentsComponyAdd,
  getCommentsComponyList,
  commentsCollect,
} from '@/api/guoguo.js'

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      name: '',
      info: null,
      name: '',
      id: '',
      componyContents: '', // 公司评论的内容
      componyCommentList: [], // 公司评论列表
    }
  },
  onLoad(options) {
    this.name = options.name
    this.id = options.id
    this.getList({
      name: options.name,
      limte: 10,
      page: 1
    })
    this.getComponyCommentListFn('refash')
  },
  methods: {
    // 公司详情
    async getList(obj) {
      const data = await getComponyList({
        ...obj
      })
      console.log('datalist', data)
      this.info = data.data[0]
    },
    // 点击评论公司按钮
    addPlFn() {
      let token = uni.getStorageSync('token') || ''
      if (!token) {
        uni.navigateTo({
          url: '/pages/login'
        })
      } else {
        this.$refs.popup.open('bottom')
      }
    },
    // 获取公司的评论列表
    async getComponyCommentListFn() {
      const data = await getCommentsComponyList({
        page: 1,
        componyId: this.id
      })
      console.log('datalist', data)
      this.componyCommentList = data.data || []
    },
    async submitPlFn() {
      const data = await setCommentsComponyAdd({
        componyId: this.id,
        componyContents: this.componyContents
      })
      if (data.code === 200) {
        this.getComponyCommentListFn('refash')
        this.$refs.popup.close()
      }
    },
    // 收藏公司
    async collectFn() {
      const data = await commentsCollect({
        componyId: this.id
      })
      if (data.code === 200) {
        uni.showToast({
          title: '收藏成功！',
          icon: 'none'
        })
      }
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        .iconfont {
          font-size: 44rpx;
        }
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
    // height: 100%;
    font-size: 30rpx;
    color: $uni-color-fz;
    background: #f3fbfb;
    text-align: center;
    padding: 10rpx;
    border-radius: 14rpx;
  }
  &-des {
    flex: 1;
    // margin: 10rpx 0;
    font-size: 28rpx;
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
.label {
  font-size: 30rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  &::before {
    content: '';
    display: inline-block;
    width: 8rpx;
    height: 34rpx;
    background: $uni-color-fz;
    border-radius: 8rpx;
    margin-right: 10rpx;
  }
}
.pl-list {
  padding: 20rpx;
  border-radius: 10rpx;
  background: #fff;
  font-size: 28rpx;
  color: #333;
  &-li {
    padding: 0 10rpx;
    border-radius: 4rpx;
    &:not(:last-child) {
      padding-bottom: 30rpx;
      border-bottom: 1px solid #f3fbfb;
      margin-bottom: 30rpx;
    }
    &-des {
      font-size: 24rpx;
      padding: 10rpx 10rpx 20rpx 10rpx;
      background: #f3fbfb;
      margin-top: 10rpx;
    }
  }
}
.add-btn {
  width: 100rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $uni-color-fz;
  border-radius: 50%;
  position: fixed;
  bottom: 100rpx;
  right: 30rpx;
  z-index: 999;
  color: #fff;
}
.login-form {
  height: 450rpx;
  background-color: #ffffff;
  overflow: hidden;
  z-index: 1;
  padding: 30rpx;
  position: relative;
  .login-form-item {
    border-radius: 10rpx;
    border: 1px solid #e5e5e5;
    padding: 30rpx;
  }
  .pl-btn {
    width: calc(100% - 60rpx);
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 80rpx;
    text-align: center;
    background-color: $uni-color-fz;
    font-size: 34rpx;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 30rpx;
  }
}
</style>