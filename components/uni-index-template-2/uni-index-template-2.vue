<template>
  <uni-self-header
    :boxHeight="226"
    :linearColor="linearColor"
    :hasBack="false"
    :scrollTop="scrollTop"
    :title="titleName"
  >
    <view class="index">
      <view class="top">
        <topdate :templateNum="2" />
      </view>
      <!-- 轮播图 -->
      <view class="swipter-box">
        <uni-swipter-s
          :positionValue="0"
          :platformValue="1"
        ></uni-swipter-s>
      </view>
      <view class="bgbox">
        <view class="text-bar">择校工具</view>
        <view class="index-icons">
          <view
            class="index-icons-item item1"
            @click="handcheck('/pageSec/AIchooseschool/index')"
          >
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/home-ai.png"
              mode="scaleToFill"
            ></image>
            AI择校
          </view>
          <view
            class="index-icons-item item2"
            @click="handcheck('/pageSec/checkthemajor/index?title=调剂查询')"
          >
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/home-tj.png"
              mode="scaleToFill"
            ></image>
            调剂查询
          </view>
          <view
            class="index-icons-item item3"
            @click="handcheck('/pageSec/checkcolleges/index')"
          >
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/home-cyx.png"
              mode="scaleToFill"
            ></image>
            查院校
          </view>
          <view
            class="index-icons-item item4"
            @click="handcheck('/pageThe/schoolcomparison/contrastselection')"
          >
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/home-yxdb.png"
              mode="scaleToFill"
            ></image>
            院校对比
          </view>
          <view
            class="index-icons-item item5"
            @click="handcheck('/pageSec/checkthemajor/index?title=查专业')"
          >
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/home-czy.png"
              mode="scaleToFill"
            ></image>
            查专业
          </view>
          <view
            class="index-icons-item item6"
            @click="handcheck('/pageSec/countrylineinquiry/index')"
          >
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/home-gjx.png"
              mode="scaleToFill"
            ></image>
            国家线查询
          </view>
        </view>
        <!-- 考研日历 -->
        <view class="text-bar">考研月历</view>
        <view class="ky-calder">
          <view class="ky-calder-left">
            <view class="ky-calder-left-text">
              <text>{{ mounth }}</text>
              <text class="year">Year</text>
            </view>
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/home-bg.png"
              mode="scaleToFill"
              class="ky-calder-left-img1"
            />
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/8.png"
              mode="scaleToFill"
              class="ky-calder-left-img2"
            />
          </view>
          <view class="ky-calder-right">
            <view class="ky-calder-right-date-box">
              <view
                v-for="(item,index) in mounthList"
                :key="index"
                class="ky-calder-right-date-box-item"
              >
                <view class="b-text">
                  <view>{{ item.month }}</view>
                  <view>{{ item.content }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <slot></slot>
      </view>
    </view>
  </uni-self-header>
</template>

<script>
import topdate from '@/components/top-date/top-date'
import { monthList } from '@/api/comm'

export default {
  props: {
    titleName: {
      type: String,
      default: ''
    },
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  components: {
    topdate
  },
  data() {
    return {
      mounth: '',
      mounthList: [],
      linearColor: 'linear-gradient(to bottom,rgba(255, 246, 219, 1) 10%,rgba(255, 255, 255, 0) 100%)',
      current: 0,
      swiperDotIndex: 0,
      data: [{
        image: 'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/banner/banner01.png'
      }],
    }
  },
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  created() {
    this.getMonthList()
  },
  methods: {
    // 考研月历
    async getMonthList() {
      const { data } = await monthList()
      this.mounth = data.time
      this.mounthList = data.list
    },
    handcheck(url) {
      this.$tab.navigateTo(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  padding: 30rpx 0 0;
  // background: $uni-text-color-inverse;
}
.swipter-box {
  padding: 0 30rpx;
}
.top {
  margin-bottom: 38rpx;
}
.bgbox {
  background: #fff;
  padding: 0 30rpx;
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
.text-bar {
  font-size: 32rpx;
  font-weight: 600;
  color: $uni-text-color;
  padding: 40rpx 0;
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
    background: rgba(255, 142, 28, 1);
    position: absolute;
    top: 46rpx;
    left: 0rpx;
  }
}
.index-icons {
  @include flexBetween;
  flex-wrap: wrap;
  &-item {
    margin-bottom: 32rpx;
    width: 328rpx;
    height: 132rpx;
    line-height: 132rpx;
    font-size: 32rpx;
    font-weight: 600;
    display: flex;
    // flex-direction: column;
    align-items: center;
    // justify-content: space-between;

    image {
      width: 80rpx;
      height: 80rpx;
      margin: 9rpx;
    }

    text {
      margin-top: 16rpx;
      font-size: 26rpx;
      font-weight: 600;
      line-height: 34rpx;
      color: $uni-text-color;
    }
  }
  .item1 {
    border-radius: 16rpx;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(227, 238, 255, 0.5) 100%
    );
    box-shadow: 0rpx 2rpx 16rpx rgba(235, 240, 255, 1);
  }
  .item2 {
    border-radius: 16rpx;
    background: linear-gradient(
      135.95deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 235, 204, 0.5) 100%
    );
    box-shadow: 0rpx 2rpx 16rpx rgba(235, 240, 255, 1);
  }
  .item3 {
    border-radius: 16rpx;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(214, 243, 255, 0.5) 100%
    );
    box-shadow: 0rpx 2rpx 16rpx rgba(235, 240, 255, 1);
  }
  .item4 {
    border-radius: 16rpx;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(232, 227, 255, 0.5) 100%
    );
    box-shadow: 0rpx 2rpx 16rpx rgba(235, 240, 255, 1);
  }
  .item5 {
    border-radius: 16rpx;
    background: linear-gradient(
      144.6deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 244, 242, 0.5) 100%
    );
    box-shadow: 0rpx 2rpx 16rpx rgba(235, 240, 255, 1);
  }
  .item6 {
    border-radius: 16rpx;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(224, 233, 255, 0.5) 100%
    );
    box-shadow: 0rpx 2rpx 16rpx rgba(235, 240, 255, 1);
  }
}

.st {
  display: flex;
  justify-content: space-between;
  color: $uni-text-color-inverse;
  margin-top: 40rpx;

  &-en {
    width: 412rpx;
    height: 443rpx;
    border-radius: 16rpx;
    background: linear-gradient(
      135.5deg,
      rgba(199, 216, 255, 1) 0%,
      rgba(23, 86, 251, 1) 100%
    );
    box-shadow: 3rpx 6rpx 16rpx 2rpx rgba(53, 108, 246, 0.4);
    position: relative;
    font-size: 32rpx;
    position: relative;

    image {
      width: 329rpx;
      height: 271rpx;
      position: absolute;
      bottom: 48rpx;
      right: 0;
    }
  }

  &-math {
    width: 246rpx;
    height: 443rpx;
    border-radius: 16rpx;
    background: linear-gradient(
      -45deg,
      rgba(255, 141, 26, 1) 0%,
      rgba(255, 212, 102, 1) 100%
    );
    box-shadow: 3rpx 6rpx 16rpx 2rpx rgba(255, 232, 204, 1);
    position: relative;

    image {
      width: 174rpx;
      height: 157rpx;
      position: absolute;
      bottom: 100rpx;
      right: 0;
    }
  }

  .title {
    font-size: 32rpx;
    font-weight: 600;
    letter-spacing: 0px;
    position: absolute;
    top: 32rpx;
    left: 32rpx;
  }

  .des {
    font-size: 24rpx;
    font-weight: 400;
    letter-spacing: 0px;
    position: absolute;
    top: 93rpx;
    left: 32rpx;
  }

  .startCp {
    // width: 124rpx;
    line-height: 40rpx;
    border-radius: 40rpx;
    padding: 5rpx 14rpx;
    background: rgba(255, 255, 255, 0.4);
    font-size: 32rpx;
    text-align: center;
    position: absolute;
    bottom: 36rpx;
    left: 32rpx;
  }
}

.ky-calder {
  width: 712rpx;
  height: 165rpx;
  opacity: 1;
  border-radius: 16rpx 0px 0px 16rpx;
  background: rgba(255, 250, 235, 1);
  position: relative;
  display: flex;

  .ky-calder-left {
    width: 200rpx;
    height: 100%;
    position: relative;

    .ky-calder-left-img1 {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .ky-calder-left-img2 {
      width: 70rpx;
      height: 22rpx;
      position: absolute;
      top: 76rpx;
      left: 39rpx;
    }

    .ky-calder-left-text {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 36rpx;
      font-weight: 600;
      position: absolute;
      top: 0;
      left: -20rpx;
      z-index: 1;
      color: $uni-color-primary-fz;

      .year {
        font-size: 28rpx;
        font-weight: 400;
        margin-top: 40rpx;
      }
    }
  }

  .ky-calder-right {
    width: 500rpx;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 0;
      display: none;
    }
    &-date-box {
      // width: 10000rpx;
      width: max-content;
      padding-top: 65rpx;
      padding-left: 50rpx;
      display: flex;

      &-item {
        width: 128rpx;
        height: 4rpx;
        background: rgba(255, 142, 28, 1);
        position: relative;
        margin-left: 13rpx;
        margin-right: 13rpx;
        // &:before {
        //   content: '';
        //   display: block;
        //   width: 24rpx;
        //   height: 24rpx;
        //   border-radius: 24rpx;
        //   border: 2px solid rgba(255, 142, 28, 1);
        //   position: absolute;
        //   left: -10rpx;
        //   top: -12rpx;
        //   background: $uni-color-primary-fz;
        // }

        &:after {
          content: '';
          display: block;
          width: 11rpx;
          height: 11rpx;
          border-radius: 11rpx;
          background: rgba(255, 142, 28, 1);
          position: absolute;
          left: -17rpx;
          top: -3rpx;
        }

        .b-text {
          width: 120rpx;
          font-size: 20rpx;
          color: $uni-text-color;
          text-align: center;
          position: absolute;
          left: -54rpx;
          bottom: -80rpx;
        }
      }
    }
  }
}

.use-tips-cons {
  width: 100%;
  max-height: 568rpx;
  padding-top: 125rpx;
  font-size: 28rpx;
  color: #666666;
  overflow: auto;
}
</style>