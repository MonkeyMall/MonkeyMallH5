<template>
  <view class="work-container">
    <!-- 轮播图 -->
    <uni-swipter-s
      :positionValue="1"
      :platformValue="1"
    ></uni-swipter-s>
    <topdate :styleNum="2" />
    <view class="batCons">
      <view
        class="bar-item"
        @click="goFqFn('tomato')"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/4.png"
          mode="scaleToFill"
        />
        <text>番茄</text>
      </view>
      <view
        class="bar-item"
        @click="goZjsFn"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/2.png"
          mode="scaleToFill"
        />
        <text>正计时</text>
      </view>
      <view
        class="bar-item"
        @click="goDjsFn()"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/3.png"
          mode="scaleToFill"
        />
        <text>倒计时</text>
      </view>
      <view
        class="bar-item"
        @click="goFqFn('custom')"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/7.png"
          mode="scaleToFill"
        />
        <text>自定义</text>
      </view>
      <view
        class="bar-item"
        @click="goFn('examination')"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/6.png"
          mode="scaleToFill"
        />
        <text>考试</text>
      </view>
    </view>
    <view
      class="cp"
      @click="goFn('appraisal')"
    >
      <view class="cp-text">
        <text>测评</text>满足不同阶段测评需求
      </view>
      <view class="startCp">去测评</view>
      <image
        src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/5.png"
        mode="scaleToFill"
      />
    </view>
    <view class="st">
      <view
        class="st-en"
        @click="goFn('english')"
      >
        <view class="title">刷外语</view>
        <view class="des">高效备考之选</view>
        <view class="startCp">去刷题</view>
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/9.png"
          mode="scaleToFill"
        />
      </view>
      <view class="cp-left">
        <view
          class="st-math"
          @click="goFn('mathematics')"
        >
          <view class="title">刷数学</view>
          <view class="des">知识点关系一目了然</view>
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/8.png"
            mode="scaleToFill"
          />
        </view>
        <view
          class="st-zz"
          @click="goFn('exercise')"
        >
          <view class="title">刷政治</view>
          <view class="des">名师总结随时背诵</view>
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/10.png"
            mode="scaleToFill"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import topdate from '@/components/top-date/top-date'
export default {
  data() {
    return {
      current: 0,
      swiperDotIndex: 0,
      data: [{
        image: 'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/banner/banner01.png'
      }]
    }
  },
  components: {
    topdate
  },
  methods: {
    clickBannerItem(item) {
      console.info(item)
    },
    goFn(type) {
      this.$tab.navigateTo(`/pageFive/work/${type}/index`)
    },
    // 点击正计时
    goZjsFn() {
      this.$tab.navigateTo(`/pageSec/timerPage/positiveTiming/index?mode=positiveTiming`)
    },
    //	点击倒计时
    goDjsFn() {
      this.$tab.navigateTo(`/pageSec/timerPage/countdown/index?mode=countdown`)
    },
    //	点击番茄
    goFqFn(val) {
      this.$tab.navigateTo(`/pageFive/tomato/index?custom=` + val)
    },
  }
}
</script>

<style lang="scss" scoped>
.work-container {
  min-height: 100vh;
  background: $uni-text-color-inverse;
  color: $uni-text-color;
}
swiper {
  height: 292rpx;
}
.work-container {
  padding: 30rpx;

  .swiper-item {
    width: 100%;
    height: 100%;
  }

  .cp {
    width: 100%;
    height: 160rpx;
    position: relative;
    font-size: 24rpx;
    color: $uni-text-color-grey;
    border-radius: 16rpx;
    // background: $uni-bg-color-tag;
    box-shadow: 0px 4px 16px 4px rgba(245, 248, 255, 1);
    margin-top: 40rpx;
    overflow: hidden;
    &-text {
      display: flex;
      align-items: baseline;
      position: absolute;
      top: 32rpx;
      left: 16rpx;
    }
    text {
      font-size: 28rpx;
      font-weight: 600;
      color: $uni-text-color;
      margin-right: 24rpx;
    }
    .startCp {
      width: 136rpx;
      line-height: 40rpx;
      border-radius: 40rpx;
      padding: 2rpx 24rpx;
      font-size: 26rpx;
      border: 2rpx solid $uni-text-color;
      position: absolute;
      bottom: 16rpx;
      left: 16rpx;
      color: $uni-text-color;
      text-align: center;
    }
    image {
      width: 172rpx;
      height: 144rpx;
      position: absolute;
      top: 40rpx;
      right: 24rpx;
    }
  }
  .st {
    margin-top: 30rpx;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 28rpx;
      font-weight: 600;
      line-height: 39rpx;
      color: $uni-text-color;
      position: absolute;
    }
    .des {
      font-size: 24rpx;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 30px;
      color: $uni-text-color-grey;
      position: absolute;
    }
    .startCp {
      width: 136rpx;
      line-height: 40rpx;
      border-radius: 40rpx;
      padding: 2rpx 24rpx;
      font-size: 26rpx;
      border: 2rpx solid $uni-text-color;
      position: absolute;
      bottom: 40rpx;
      left: 16rpx;
      color: $uni-text-color;
      text-align: center;
    }
    &-en {
      width: 330rpx;
      height: 286rpx;
      border-radius: 16rpx;
      // background: $uni-bg-color-tag;
      box-shadow: 0px 4px 16px 4px rgba(245, 248, 255, 1);
      position: relative;
      overflow: hidden;
      .title {
        top: 32rpx;
        left: 16rpx;
      }
      .des {
        top: 80rpx;
        left: 16rpx;
      }
      .startCp {
        bottom: 40rpx;
        left: 16rpx;
      }
      image {
        width: 156rpx;
        height: 156rpx;
        position: absolute;
        bottom: -24rpx;
        right: -8rpx;
      }
    }
    .cp-left {
      display: flex;
      flex-direction: column;
      align-items: baseline;
    }
    &-math {
      margin-bottom: 30rpx;
      image {
        width: 107rpx;
        height: 80rpx;
        position: absolute;
        bottom: 24rpx;
        right: -30rpx;
      }
    }
    &-zz {
      image {
        width: 91rpx;
        height: 80rpx;
        position: absolute;
        bottom: 24rpx;
        right: -10rpx;
      }
    }
    &-zz,
    &-math {
      width: 330rpx;
      height: 128rpx;
      border-radius: 16rpx;
      // background: $uni-bg-color-tag;
      box-shadow: 0px 4px 16px 4px rgba(245, 248, 255, 1);
      position: relative;
      overflow: hidden;
      .title {
        top: 24rpx;
        left: 16rpx;
      }
      .des {
        bottom: 18rpx;
        left: 16rpx;
      }
    }
  }
  .batCons {
    display: flex;
    justify-content: space-between;
    margin-top: 52rpx;
    .bar-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 26rpx;
      font-weight: 600;
      color: $uni-text-color;
      image {
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 20rpx;
      }
    }
  }
}
</style>
