<template>
  <view>
    <uni-swiper-dot class="uni-swiper-dot-box" :info="list" :current="current" field="content">
      <swiper circular class="swiper-box" :current="swiperDotIndex" autoplay interval="5000" @change="changeSwiper">
        <swiper-item v-for="(item, index) in list" :key="index">
          <view class="swiper-item" @click="clickBannerItem(item)">
            <image :src="item.bannerUrl ? COS_CDN_PREFIX_http + item.bannerUrl : defaultImg.bannerImg" />
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
</template>

<script>
import { selectAppletList } from '@/api/comm.js'
import config from '@/config/index'
export default {
  name: 'UniSwipterS',
  props: {
    positionValue: {
      type: Number,
      default: 0 // 位置 0 首页 1 刷题
    },
    platformValue: {
      type: Number,
      default: 0 // 平台 0 老师端 1 学生端
    }
  },
  data() {
    return {
      current: 0,
      COS_CDN_PREFIX_http: config.COS_CDN_PREFIX_http,
      list: [],
      tabList: ['/pages/index', '/pages/work/index', '/pages/mine/index'],
      defaultImg: this.$defaultImg,
    }
  },
  mounted() {
    this.getBanner()
  },
  onShow() { },
  methods: {
    isTabPage(path) {
      return this.tabList.includes(path)
    },
    async getBanner() {
      const { data } = await selectAppletList({
        positionValue: this.positionValue,
        platformValue: this.platformValue
      })
      this.list = data
    },
    clickBannerItem(item) {
      // 0 url 1 内部
      console.log(item)
      if (item.jumpType === '0') {
        this.$tab.navigateTo('/pages/common/webview/index?url=' + item.jumpUrl)
      } else {
        if (this.isTabPage(item.jumpUrl)) {
          // tab页面
          this.$tab.switchTab(item.jumpUrl)
        } else {
          // 其他页面
          this.$tab.navigateTo(item.jumpUrl)
        }
      }
    },
    changeSwiper(e) {
      this.current = e.detail.current
    }
  }
}
</script>

<style lang="scss">
swiper {
  height: 256rpx !important;
}

::v-deep .swiper {
  width: 690rpx;
  height: 256rpx;
}

.swiper-item {
  width: 690rpx;
  height: 256rpx;
  border-radius: 16rpx;
  overflow: hidden;

  image {
    width: 690rpx;
    height: 256rpx;
  }
}
</style>