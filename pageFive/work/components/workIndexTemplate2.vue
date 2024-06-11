<template>
  <view class="work-container">
    <topdate :styleNum="2" />
    <!-- 轮播图 -->
    <uni-swipter-s
      :positionValue="1"
      :platformValue="1"
    ></uni-swipter-s>
    <view class="st-title">科目刷题</view>
    <!-- 科目刷题 -->
    <view class="st">
      <view class="cp-left">
        <view
          class="st-math"
          @click="goFn('english')"
        >
          <view class="title">刷外语
            <text>English</text>
          </view>
          <view class="des">高效备考之选</view>
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/st-english.png"
            mode="scaleToFill"
          />
        </view>
        <view
          class="st-zz"
          @click="goFn('mathematics')"
        >
          <view class="title">刷数学
            <text>Math</text>
          </view>
          <view class="des">逻辑关系一目了然</view>
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/st-math.png"
            mode="scaleToFill"
          />
        </view>
      </view>
      <view
        class="st-en"
        @click="goFn('exercise')"
      >
        <view class="title">刷政治
          <text>Political</text>
        </view>
        <view class="des">名师总结随时背诵</view>
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/st-zz.png"
          mode="scaleToFill"
        />
      </view>
    </view>
    <view class="st-title">考试测评</view>
    <!-- 测评 -->
    <view
      class="st"
      @click="goFn('appraisal')"
    >
      <view
        class="st-zz"
        @click="goFn('exercise')"
      >
        <view class="title">测评
          <text class="cp-english">Evaluation</text>
        </view>
        <view class="des">考试检测，自我诊断</view>
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/st-ces.png"
          mode="scaleToFill"
        />
      </view>
    </view>
    <view class="st-title">计时工具</view>
    <view class="batCons">
      <view
        class="bar-item"
        @click="goFqFn('tomato')"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/st-fq.png"
          mode="scaleToFill"
        />
        <text>番茄</text>
      </view>
      <view
        class="bar-item"
        @click="goZjsFn"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/st-zjs.png"
          mode="scaleToFill"
        />
        <text>正计时</text>
      </view>
      <view
        class="bar-item"
        @click="goDjsFn()"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/st-djs.png"
          mode="scaleToFill"
        />
        <text>倒计时</text>
      </view>
      <view
        class="bar-item"
        @click="goFqFn('custom')"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/st-zdy.png"
          mode="scaleToFill"
        />
        <text>自定义</text>
      </view>
      <view
        class="bar-item"
        @click="goFn('examination')"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/st-ks.png"
          mode="scaleToFill"
        />
        <text>考试</text>
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
      this.$tab.navigateTo(`/pages/work/${type}/index`)
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
  background: $uni-text-color-inverse;
  color: $uni-text-color;
}
.work-container {
  padding: 30rpx;

  .swiper-item {
    width: 100%;
    height: 100%;
  }
  .cutDown {
    width: 100%;
    line-height: 80rpx;
    text-align: center;
    font-size: 32rpx;
    font-weight: 600;
    border-radius: 80rpx;
    background: rgba(255, 250, 235, 1);
    margin-bottom: 32rpx;
    text {
      margin: 0 8rpx;
    }
    .day {
      font-size: 40rpx;
      margin: 0 16rpx;
      color: $uni-color-primary;
    }
  }
  .cp {
    width: 100%;
    height: 160rpx;
    position: relative;
    font-size: 22rpx;
    color: $uni-text-color-grey;
    border-radius: 16rpx;
    background: $uni-bg-color-tag;
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
      width: 126rpx;
      line-height: 40rpx;
      border-radius: 40rpx;
      padding: 2rpx 24rpx;
      font-size: 26rpx;
      border: 2rpx solid $uni-text-color;
      position: absolute;
      bottom: 16rpx;
      left: 16rpx;
      color: $uni-text-color;
    }
    image {
      width: 172rpx;
      height: 144rpx;
      position: absolute;
      top: 40rpx;
      right: 24rpx;
    }
  }
  .st-title {
    font-size: 32rpx;
    font-weight: 600;
    line-height: 45rpx;
    margin: 40rpx 16rpx;
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
      font-size: 22rpx;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 30px;
      color: $uni-text-color-grey;
      position: absolute;
    }
    .startCp {
      width: 126rpx;
      line-height: 40rpx;
      border-radius: 40rpx;
      padding: 2rpx 24rpx;
      font-size: 26rpx;
      border: 2rpx solid $uni-text-color;
      position: absolute;
      bottom: 40rpx;
      left: 16rpx;
      color: $uni-text-color;
    }
    &-en {
      width: 330rpx;
      height: 286rpx;
      border-radius: 16rpx;
      background: $uni-bg-color;
      position: relative;
      overflow: hidden;
      box-shadow: 0px 4rpx 16rpx 4rpx #f5f8ff;
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
        bottom: -20rpx;
        right: 16rpx;
      }
    }
    .cp-left {
      display: flex;
      flex-direction: column;
      align-items: baseline;
      .st-math {
        image {
          width: 130rpx;
          height: 130rpx;
          bottom: -21rpx;
          right: -12rpx;
        }
        text {
          font-size: 24rpx;
          font-weight: 400;
          color: $uni-text-color-placeholder;
          margin-left: 8rpx;
        }
      }
      .st-zz {
        image {
          width: 94rpx;
          height: 105rpx;
          bottom: -13rpx;
          right: 2rpx;
        }
        text {
          font-size: 24rpx;
          font-weight: 400;
          color: #2bc7a0;
          margin-left: 8rpx;
        }
      }
    }
    .st-en {
      text {
        font-size: 24rpx;
        font-weight: 400;
        color: #ff7f03;
        margin-left: 8rpx;
      }
    }
    .st-zz {
      image {
        width: 124rpx;
        height: 124rpx;
        bottom: -14rpx;
        right: -11rpx;
      }
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
      background: $uni-bg-color;
      position: relative;
      overflow: hidden;
      box-shadow: 0rpx 4rpx 16rpx 4rpx #f5f8ff;
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
  .cp-english {
    font-size: 24rpx;
    font-weight: 400;
    margin-left: 8rpx;
    color: #3568f5;
  }
  .batCons {
    display: flex;
    justify-content: space-between;
    margin-top: 56rpx;
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
