<template>
  <view class="ridicule">
    <view class="ridicule-info" v-if="list.length">
        <view class="ridicule-info-title">{{ list[0].contentId.title }}</view>
        <view class="ridicule-info-cons">{{ list[0].contentId.content }}</view>
    </view>
    <view class="ridicule-pl" v-if="list.length">
      <view class="ridicule-pl-item" v-for="(item,index) in list" :key="index">
        <view class="header">
          <image class="ridicule-pl-header" src="" mode="aspectFill"></image>
          <text v-if="item.creatUserId">{{ item.userId.username }} 回复 {{ item.creatUserId.username }}</text>
          <text v-else>{{ item.userId.username }}</text>
        </view>
        <view class="ridicule-pl-cons">{{ item.commentContents }}</view>
        <view class="date">
          <view>回复</view>
          <view>{{ item.startTime }}</view>
        </view>
      </view>
    </view>
    <view class="plBtn" @click="openDialog">评 论</view>
    <uv-popup ref="popup">
      <view class="login-form">
        <view class="login-form-item">
          <view class="login-form-item-label">手机号</view>
          <view class="login-form-item-input">
            <input type="number" v-model="loginForm.username" class="input" placeholder="请输入您的手机号" maxlength="30" />
          </view>
        </view>
      </view>
    </uv-popup>
  </view>
</template>

<script>
import {
  getCommentList
} from '@/api/guoguo.js'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more',
      show: false,
      id: '',
      title: '',
      content: '',
      list: []
    }
  },
  onShow() {
    this.getList()
  },
  onLoad(options) {
    console.log(options)
    this.id = options.id
  },
  components: {
    
  },
  onShareAppMessage(options) {
    
  },
  methods: {
    openDialog() {
      this.$refs.popup.open('bottom')
    },
    async getList() {
      const data = await getCommentList({
        page: 1,
        contentId: this.id
      })
      console.log('datalist', data)
      this.list = data.data
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
        justify-content: space-between;
        font-size: 24rpx;
        color: $uni-text-color-grey;
        margin-top: 30rpx;
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
.login-form {
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    margin-top: -40rpx;
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
    z-index: 1;
    padding: 0 54rpx;

    &-item {
      padding-top: 50rpx;
      padding-bottom: 24rpx;
      border-bottom: 2rpx solid #f3f6fc;
      position: relative;

      &-label {
        font-size: 32rpx;
        font-weight: 500;
        color: #333333;
        margin-bottom: 40rpx;
      }

      &-input {
        padding-right: 60rpx;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        &.noPadd {
          padding-right: 0rpx;
        }

        .input {
          width: 100%;
          height: 100%;
        }

        .login-code-img {
          width: 160rpx;
          height: 60rpx;
        }
      }

      .iconEye {
        width: 44rpx;
        height: 44rpx;
        position: absolute;
        right: 0;
        bottom: 22rpx;
      }
    }
  }
</style>