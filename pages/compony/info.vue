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
            <view :class="['iconfont', isCollect ? 'isCollect' : '']" @click="collectFn">&#xe60a;</view>
          </view>
          <view class="compony-list-item-right-address">
            <view class="iconfont">&#xe606;</view>
            <text>{{ info.address }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="info-box">
      <view class="compony-info">
        <view class="compony-info-lable">基础信息</view>
        <view class="compony-info-des">
          <view>行业： <text v-for="(item, index) in info.industry.split(',')" :key="index">{{ dictHx(item, 'industryOptions') }}</text></view>
          <view>规模： {{ info.scale }}</view>
          <view>上班时间： {{ info.workTime }}</view>
          <view>成立时间： {{ info.createdDate }}</view>
        </view>
      </view>
      <view class="compony-other">
        <view class="li-item">
          <view class="item-label">
            <view class="iconfont">&#xe638;</view>
            融资情况
          </view>
          <view class="item-cons">{{ dictHx(info.financing, 'financingOptions') }}</view>
        </view>
        <view class="li-item">
          <view class="item-label">
            <view class="iconfont">&#xe66e;</view>
            工资范围
          </view>
          <view class="item-cons">{{ info.wage }}</view>
        </view>
        <view class="li-item">
          <view class="item-label">
            <view class="iconfont">&#xe60d;</view>
            五险
          </view>
          <view class="item-cons">{{ info.accumulation === '1' ? '有' : '无'}}</view>
        </view>
        <view class="li-item">
          <view class="item-label">
            <view class="iconfont">&#xe60d;</view>
            一金
          </view>
          <view class="item-cons">{{ info.insurance === '1' ? '有' : '无' }}</view>
        </view>
        <view class="li-item">
          <view class="item-label">
            <view class="iconfont">&#xe601;</view>
            福利
          </view>
          <view class="item-cons">
            <text class="item-cons-btn" v-for="(item, index) in info.welfare.split(',')" :key="index">{{ dictHx(item, 'welfareOptions') }}</text>
          </view>
        </view>
        <view class="li-item">
          <view class="item-label">
            <view class="iconfont">&#xe619;</view>
            官网
          </view>
          <view class="item-cons">{{ info.website }}</view>
        </view>
        <view class="li-item">
          <view class="item-label">
            <view class="iconfont">&#xe668;</view>
            注册资本
          </view>
          <view class="item-cons">{{ info.registeredCapital }}</view>
        </view>
        <view class="li-item">
          <view class="item-label">
            <view class="iconfont">&#xe617;</view>
            上班时间
          </view>
          <view class="item-cons">{{ info.workTime }}</view>
        </view>
        <view class="li-item">
          <view class="item-label">
            <view class="iconfont">&#xe606;</view>
            注册地址
          </view>
          <view class="item-cons">{{ info.addressZc }}</view>
        </view>
        <view class="li-item">
          <view class="item-label">
            <view class="iconfont">&#xe60b;</view>
            其他
          </view>
          <view class="item-cons">
            <text class="item-cons-btn" v-for="(item, index) in info.overTime.split(',')" :key="index">{{ dictHx(item, 'overTimeOptions') }}</text>
          </view>
        </view>
      </view>
      <view class="label">工作感受</view>
      <view class="pl-list">
        <view class="pl-list-ul">
          <view v-if="componyCommentList.length" class="pl-list-li" v-for="(item, index) in componyCommentList" :key="index">
            <view class="pl-list-li-header">
              <image
                :src="host + item.userId.header"
                mode="scaleToFill"
              />
              {{ item.userId.username}}
            </view>
            <view  class="pl-list-li-des">{{ item.componyContents}}</view>
          </view>
          <view class="empty-box" v-if="!componyCommentList.length">
            <view>暂无工作感受，快来加入评论吧！</view>
            <view class="joinMessageBtn" @click="addPlFn()">工作感受</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 评论公司按钮 -->
    <view class="add-btn" @click="addPlFn" v-if="componyCommentList.length">
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
          <view class="pl-btn" @click="submitPlFn()">工作感受</view>
        </view>
      </view>
    </uv-popup>
  </view>
</template>

<script>
import config from '@/config/index.js'
import {
  getComponyList,
  setCommentsComponyAdd,
  getCommentsComponyList,
  commentsCollect,
  getCompanyCollectIsCollect
} from '@/api/guoguo.js'
import {
  dictHx
} from '@/utils/index.js'
export default {
  data() {
    return {
      host: config.COS_CDN_PREFIX_http,
      // industryOptions,
      pageNum: 1,
      pageSize: 10,
      name: '',
      info: null,
      name: '',
      id: '',
      componyContents: '', // 公司评论的内容
      componyCommentList: [], // 公司评论列表
      isCollect: false // 是否收藏
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
    let token = uni.getStorageSync('token') || ''
    if (token) {
      this.isCollectFn()
    }
  },
  methods: {
    dictHx,
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
      let token = uni.getStorageSync('token') || ''
      if (!token) {
        uni.navigateTo({
          url: '/pages/login'
        })
      } else {
        const data = await commentsCollect({
          componyId: this.id,
          type: this.isCollect ? 0 : 1
        })
        if (data.code === 200) {
          this.isCollectFn()
          uni.showToast({
            title: '收藏成功！',
            icon: 'none'
          })
        }
      }
    },
    // 收藏公司状态
    async isCollectFn() {
      const data = await getCompanyCollectIsCollect({
        componyId: this.id
      })
      if (data.code === 200) {
        this.isCollect = data.isCollect
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
          &.isCollect {
            color: #ff6600;
          }
        }
      }
      &-address {
        display: flex;
        align-items: center;
        gap: 20rpx;
        color: #999;
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
    view {
      display: flex;
      gap: 10rpx;
    }
  }
}
.compony-other {
  padding: 20rpx;
  border-radius: 10rpx;
  background: #fff;
  font-size: 30rpx;
  color: #333;
  margin-top: 20rpx;
  .li-item {
    display: flex;
    gap: 10rpx;
    margin-bottom: 10rpx;
    .item-label {
      width: 180rpx;
      display: flex;
      gap: 8rpx;
      align-items: center;
      color: #111;
    }
    .item-cons {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      gap: 5rpx;
      .item-cons-btn {
        padding: 5rpx;
      }
    }
  }
}
.empty-box {
  height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30rpx;
  color: #999;
  .joinMessageBtn {
    width: 300rpx;
    line-height: 70rpx;
    text-align: center;
    border-radius: 70rpx;
    background: $uni-color-fz;
    color: #fff;
  }
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
  margin-bottom: 60rpx;
  border-radius: 10rpx;
  background: #fff;
  font-size: 28rpx;
  color: #333;
  &-li {
    padding: 0 10rpx;
    border-radius: 4rpx;
    .pl-list-li-header {
      display: flex;
      align-items: center;
      gap: 20rpx;
      image {
        width: 70rpx;
        height: 70rpx;
        border-radius: 20rpx;
        overflow: hidden;
      }
    }
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