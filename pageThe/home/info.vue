<template>
  <view class="info" v-if="infoData">
    <view class="info-title">{{ infoData.reportTitle }}</view>
    <view class="info-header">
      <image :src="infoData.avatar ? COS_CDN_PREFIX_http + infoData.avatar : defaultImg.userImg" mode="scaleToFill" />
      <view class="info-right">
        <view class="info-right-name">{{ infoData.nickName }}</view>
        <view>{{ infoData.createTime }}</view>
      </view>
    </view>
    <view class="info-cons">
      <uv-parse :content="infoData.reportText"></uv-parse>
    </view>
    <!-- <view class="info-tags">
      <view
        class="info-tag"
        v-for="(item, index) in reportLabel"
        :key="index"
      >

      </view>
    </view> -->
    <button :class="[zanTag === '0' ? 'active' : '', 'info-zan-btn cu-btn']" @click="zanFn">
      <i v-show="zanTag === '1'" class="iconfont">&#xe63c;</i>
      <i v-show="zanTag !== '1'" class="iconfont">&#xe63b;</i>
      {{ infoData.likeNum }}
    </button>
    <view class="imgs-list">
      <image :src="COS_CDN_PREFIX_http + item.avatar" mode="scaleToFill" v-for="(item, index) in infoData.list"
        :key="index" />
    </view>
  </view>
</template>

<script>
import { selectOneForApplet, researchReportLike } from '@/api/comm'
import config from '@/config/index'
export default {
  components: {
  },
  data() {
    return {
      id: 0,
      infoData: null,
      defaultImg: this.$defaultImg,
      COS_CDN_PREFIX_http: config.COS_CDN_PREFIX_http,
      zanTag: '0' // 0 未点赞 1 已点赞
    }
  },
  onLoad(options) {
    this.id = options.id
    this.getInfo(options.id)
  },
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '日报详情',
      path: `/pageThe/home/info`,
    };
  },
  methods: {
    async getInfo(id) {
      const { data } = await selectOneForApplet(id)
      this.infoData = data
      // this.reportLabel = data.reportLabel.split(',')
      this.zanTag = data.flag
    },
    async zanFn() {
      let obj = {
        researchReportId: this.id
      }
      const { code, data } = await researchReportLike(obj)
      console.log(123, data, code)
      if (code !== 200) return
      this.zanTag = data.flag
      console.log(222, data.likeNum)
      this.infoData.likeNum = data.likeNum
      this.infoData.list = data.list
      // this.getInfo(this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  min-height: 100vh;
  padding: 46rpx 30rpx;
  background: #fff;

  &-title {
    font-size: 28rpx;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  &-header {
    display: flex;
    align-items: center;
    margin-top: 24rpx;

    image {
      width: 64rpx;
      height: 64rpx;
      border-radius: 64rpx;
      margin-right: 24rpx;
    }

    .info-right {
      font-size: 22rpx;
      font-weight: 400;
      letter-spacing: 0px;
      color: rgba(51, 51, 51, 1);
      display: flex;
      flex-direction: column;
      align-items: self-start;

      &-name {
        font-size: 24rpx;
      }
    }
  }

  &-cons {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 32rpx;
    line-height: 50rpx;
  }

  &-tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 48rpx;

    .info-tag {
      padding: 7rpx 16rpx;
      border-radius: 16rpx;
      background: rgba(246, 248, 253, 1);
      font-size: 24rpx;
      font-weight: 400;
      text-align: center;
      color: rgba(53, 104, 245, 1);
      margin-right: 32rpx;
    }
  }

  &-zan-btn {
    width: 190rpx;
    height: 70rpx;
    line-height: 70rpx;
    border-radius: 16rpx;
    background: rgba(224, 224, 224, 1);
    box-shadow: 0px 2rpx 12rpx rgba(253, 242, 241, 1);
    font-size: 32rpx;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    margin: 50rpx auto 0;
    text-align: center;
    display: block;

    &.active {
      background: rgba(252, 81, 95, 1);
      box-shadow: 0px 2rpx 12rpx rgba(253, 242, 241, 1);
      color: #ffffff;

      .iconfont {
        color: #ffffff;
      }
    }

    .iconfont {
      margin-right: 26rpx;
      color: #fff;
    }
  }

  .imgs-list {
    display: flex;
    flex-wrap: wrap;
    margin: 24rpx auto;
    justify-content: center;

    image {
      width: 44rpx;
      height: 44rpx;
      border-radius: 44rpx;
      margin-left: -20rpx;
      overflow: hidden;
    }
  }
}
</style>