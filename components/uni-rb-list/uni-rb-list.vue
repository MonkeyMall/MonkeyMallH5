<template>
  <view>
    <view
      v-if="templatePage===1"
      class="template-1"
    >
      <view class="text-bar pb">考研日报</view>
      <view
        v-for="(item, index) in listRb"
        :key="index"
        class="kyrb-item"
        @click="goRb(item.id)"
      >
        <view class="kyrb-item-left">
          <view class="title">{{ item.reportTitle }}</view>
          <view class="des">{{ item.reportSubtitle }}</view>
          <view class="text-b">
            <view class="text-b-left view">
              <i class="iconfont">&#xe78f;</i>{{ item.browseNum }}
            </view>
            <text>{{ item.createTime }}</text>
          </view>
        </view>
        <image
          v-if="COS_CDN_PREFIX_http"
          :src="item.reportCoverUrl ? COS_CDN_PREFIX_http + item.reportCoverUrl : defaultImg.newsImg"
        />
      </view>
    </view>
    <view
      v-else-if="templatePage===2"
      class="template-2"
    >
      <view class="text-bar pb">考研日报</view>
      <view
        v-for="(item, index) in listRb"
        :key="index"
        class="kyrb-item"
        @click="goRb(item.id)"
      >
        <image
          v-if="COS_CDN_PREFIX_http"
          :src="item.reportCoverUrl ? COS_CDN_PREFIX_http + item.reportCoverUrl : defaultImg.newsImg"
        />
        <view class="kyrb-item-left">
          <view class="title">{{ item.reportTitle }}</view>
          <view class="des">{{ item.reportSubtitle }}</view>
          <view class="text-b">
            <view class="text-b-left view">
              <i class="iconfont">&#xe78f;</i>{{ item.browseNum }}
            </view>
            <text>{{ item.createTime }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import config from '@/config/index'
export default {
  props: {
    listRb: {
      type: Array,
      default: () => []
    },
    templatePage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      COS_CDN_PREFIX_http: config.COS_CDN_PREFIX_http,
      defaultImg: this.$defaultImg
    }
  },
  methods: {
    // 跳转日报详情
    goRb(id) {
      this.$tab.navigateTo('/pageThe/home/info?id=' + id)
    },
  }
}
</script>

<style lang="scss" scoped>
.template-1 {
  .text-bar {
    height: 32rpx;
    line-height: 32rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: $uni-text-color;
    margin: 40rpx 0;
    text-indent: 21rpx;
    position: relative;

    &.pb {
      padding-bottom: 0;
    }

    &:before {
      content: '';
      display: block;
      width: 10rpx;
      height: 30rpx;
      border-radius: 16rpx;
      background: rgba(252, 81, 95, 1);
      position: absolute;
      top: 0rpx;
      left: 0rpx;
    }
  }
  .kyrb-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 26rpx;
    font-weight: 400;
    letter-spacing: 0px;
    color: $uni-text-color-grey;
    padding: 32rpx 0;

    &:first-of-type {
      padding-top: 0;
    }

    &:not(:last-child) {
      border-bottom: 2px solid $uni-color-bg;
    }

    &-left {
      width: 418rpx;

      .title {
        font-size: 28rpx;
        font-weight: 600;
        margin-bottom: 16rpx;
        color: $uni-text-color;
        @include overline(1);
      }

      .des {
        font-size: 26rpx;
        margin-bottom: 16rpx;
        @include overline(2);
      }

      .text-b {
        font-size: 26rpx;
        display: flex;
        align-items: center;

        .view {
          display: flex;
          align-items: center;
        }

        .iconfont {
          margin-right: 8rpx;
        }

        text {
          margin-left: 32rpx;
        }
      }
    }

    image {
      width: 220rpx;
      height: 126rpx;
      border-radius: 8rpx;
      overflow: hidden;
    }
  }
}
.template-2 {
  .text-bar {
    font-size: 32rpx;
    font-weight: 600;
    color: $uni-text-color;
    padding: 40rpx 34rpx;
    position: relative;

    &.pb {
      padding-bottom: 0;
    }

    &:before {
      content: '';
      display: block;
      width: 10rpx;
      height: 30rpx;
      border-radius: 16rpx;
      background: rgba(255, 142, 28, 1);
      position: absolute;
      top: 46rpx;
      left: 8rpx;
    }
  }
  .kyrb-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26rpx;
    font-weight: 400;
    letter-spacing: 0px;
    color: $uni-text-color-grey;
    padding: 32rpx 0;

    &:first-of-type {
      padding-top: 0;
    }

    &:not(:last-child) {
      border-bottom: 2px solid $uni-color-bg;
    }

    &-left {
      width: 418rpx;

      .title {
        font-size: 28rpx;
        font-weight: 600;
        margin-bottom: 16rpx;
        color: $uni-text-color;
        @include overline(1);
      }

      .des {
        margin-bottom: 16rpx;
        @include overline(2);
      }

      .text-b {
        display: flex;
        align-items: center;

        .view {
          display: flex;
          align-items: center;
        }

        .iconfont {
          margin-right: 8rpx;
        }

        text {
          margin-left: 32rpx;
        }
      }
    }

    image {
      width: 260rpx;
      height: 150rpx;
      border-radius: 8rpx;
      overflow: hidden;
    }
  }
}
</style>
