<template>
  <view class="ridicule">
    <view class="ridicule-info" v-if="list.length">
        <view class="ridicule-info-title">{{ list[0].contentId.title }}</view>
        <view class="ridicule-info-cons">{{ list[0].contentId.content }}</view>
    </view>
    <view class="ridicule-pl" v-if="list.length">
      <view class="ridicule-pl-item" v-for="(item,index) in list" :key="index">
        <view class="header">
          <image class="ridicule-pl-header" :src="host + 'public/images/monkeymall/logo.png'" mode="aspectFill"></image>
          <text v-if="item.creatUserId">{{ item.userId.username }} 回复 {{ item.creatUserId.username }}</text>
          <text v-else>{{ item.userId.username }}</text>
        </view>
        <view class="ridicule-pl-cons">{{ item.commentContents }}</view>
        <view class="date">
          <view @click="openDialog(1, item)">回复</view>
          <view>{{ timestampToTime(item.startTime) }}</view>
        </view>
      </view>
    </view>
    <view class="add-btn" @click="openDialog(2)">
      <view class="iconfont">&#xe600;</view>
     </view>
    <uv-popup ref="popup">
      <view class="login-form">
        <view v-if="hfMessage" class="hf-message">
          <text v-if="hfPerson" class="hf-person">@{{ hfPerson }}</text>
          {{ hfMessage }}
        </view>
        <view class="login-form-item">
          <uv-textarea
            v-model="formPl.commentContents"
            height="200rpx"
            border="none"
            placeholder="请输入您的评论"
            count
            maxlength="100"
          ></uv-textarea>
        </view>
        <view class="pl-btn" @click="submitPlFn()">{{hfPerson ? '回 复' : '留 言'}}</view>
      </view>
    </uv-popup>
  </view>
</template>

<script>
import {
  getCommentList,
  addCommentRidicule
} from '@/api/guoguo.js'
import {
  timestampToTime
} from '@/utils/index.js'
import config from '@/config/index.js'
export default {
  data() {
    return {
      host: config.COS_CDN_PREFIX_http,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more',
      show: false,
      id: '',
      title: '',
      content: '',
      list: [],
      hfPerson: '',
      hfMessage: '',
      formPl: {
        contentId: '',//评论侃言的ID
        commentContents: '',//评论内容
        creatUserId: ''// 被评论人
      }
    }
  },
  onShow() {
    this.getList()
  },
  onLoad(options) {
    console.log(options)
    this.id = options.id
    this.formPl.contentId = options.id
  },
  components: {
    
  },
  onShareAppMessage(options) {
    
  },
  methods: {
    timestampToTime,
    openDialog(type, item) {
      let token = uni.getStorageSync('token') || ''
      if (!token) {
        uni.navigateTo({
          url: '/pages/login'
        })
      } else {
        if (type === 1) {
          this.formPl.creatUserId = item.userId._id
          this.hfPerson = item.userId.username
          this.hfMessage = item.commentContents
        } else {
          this.hfPerson = ''
          this.hfMessage = ''
        }
        this.$refs.popup.open('bottom')
      }
    },
    async getList() {
      const data = await getCommentList({
        page: 1,
        contentId: this.id
      })
      console.log('datalist', data)
      this.list = data.data
    },
    async submitPlFn() {
      const data = await addCommentRidicule({
        contentId: this.id,
        commentContents: this.formPl.commentContents,
        creatUserId: this.formPl.creatUserId || ''
      })
      if (data.code === 200) {
        this.getList('refash')
        this.$refs.popup.close()
      }
    },
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
        align-items: center;
        margin-bottom: 20rpx;
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
        padding-left: 60rpx;
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
    height: 550rpx;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
    z-index: 1;
    padding: 30rpx 30rpx 0;
    position: relative;
    .hf-message {
      font-size: 28rpx;
      font-weight: 500;
      margin-bottom: 30rpx;
      line-height: 1.5;
    }
    .hf-person {
      font-size: 26rpx;
      color: #999;
      margin-right: 18rpx;
    }
    .login-form-item {
      border: 1px solid #e5e5e5;
      // padding: 20rpx;
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
</style>