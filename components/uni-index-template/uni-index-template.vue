<template>
  <uni-self-header
    :boxHeight="82"
    :linearColor="linearColor"
    :hasBack="false"
    :scrollTop="scrollTop"
    :title="titleName"
  >
    <view>
      <view class="top">
        <topdate />
      </view>
      <view class="index">
        <!-- 轮播图 -->
        <uni-swipter-s
          :positionValue="0"
          :platformValue="1"
        ></uni-swipter-s>
        <view class="index-icons">
          <view
            class="index-icons-item"
            @click="handcheck('/pageSec/checkcolleges/index')"
          >
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/1.png"
              mode="scaleToFill"
            />
            <text>查院校</text>
          </view>
          <view
            class="index-icons-item"
            @click="handcheck('/pageSec/checkthemajor/index?title=查专业&isTJ=0')"
          >
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/2.png"
              mode="scaleToFill"
            />
            <text>查专业</text>
          </view>
          <view
            class="index-icons-item"
            @click="handcheck('/pageThe/schoolcomparison/contrastselection')"
          >
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/3.png"
              mode="scaleToFill"
            />
            <text>院校对比</text>
          </view>
          <view
            class="index-icons-item"
            @click="handcheck('/pageSec/countrylineinquiry/index', 'gjxcx')"
          >
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/4.png"
              mode="scaleToFill"
            />
            <text>国家线查询</text>
          </view>
        </view>
        <view class="st">
          <view
            class="st-en"
            @click="handcheck('/pageSec/AIchooseschool/index')"
          >
            <view class="title">AI智能择校</view>
            <view class="des">大数据推荐最优院校</view>
            <view class="startCp">马上择校</view>
            <image
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/5.png"
              mode="scaleToFill"
            />
          </view>
          <view
            class="st-math"
            @click="handcheck('/pageSec/checkthemajor/index?title=调剂查询&isTJ=1')"
          >
            <view class="title">调剂查询</view>
            <view class="des">智能匹配好院校</view>
            <view class="startCp">立即使用</view>
            <image
              class="tjsy"
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/6.png"
              mode="scaleToFill"
            />
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
              src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/7.png"
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
                :class="[item.flag === '0' ? 'active' : '','ky-calder-right-date-box-item']"
              >
                <i
                  v-if="item.flag === '0'"
                  class="iconfont active"
                >&#xe645;</i>
                <i
                  v-else
                  class="iconfont default"
                >&#xe644;</i>
                <view class="b-text">
                  <view>{{ item.month }}</view>
                  <view>{{ item.content }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- 考研日报 -->
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
      linearColor: 'linear-gradient(to bottom,rgba(255, 232, 227, 1),rgba(255, 255, 255, 1))',
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
    handcheck(url, type) {
      this.$donut.event('addIndexTabFour')
      this.$tab.navigateTo(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  padding: 0 30rpx 0;
  background: $uni-text-color-inverse;
  margin-top: -2rpx;
}

.top {
  margin-bottom: 38rpx;
  padding-top: 29rpx;
}

.index-icons {
  margin-top: 40rpx;
  @include flexBetween;

  &-item {
    width: 144rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    image {
      width: 80rpx;
      height: 80rpx;
    }

    text {
      margin-top: 16rpx;
      font-size: 26rpx;
      font-weight: 600;
      line-height: 34rpx;
      color: $uni-text-color;
    }
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
    width: 248rpx;
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
      right: 16rpx;
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
    font-size: 26rpx;
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
    padding: 5rpx 18rpx;
    background: rgba(255, 255, 255, 0.4);
    font-size: 28rpx;
    text-align: center;
    position: absolute;
    bottom: 36rpx;
    left: 32rpx;
  }
}
.tjsy {
  bottom: 104rpx !important;
}

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
    top: 2rpx;
    left: 0rpx;
  }
}
// .kyrb-item {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-end;
//   font-size: 26rpx;
//   font-weight: 400;
//   letter-spacing: 0px;
//   color: $uni-text-color-grey;
//   padding: 32rpx 0;

//   &:first-of-type {
//     padding-top: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 2px solid $uni-color-bg;
//   }

//   &-left {
//     width: 418rpx;

//     .title {
//       font-size: 28rpx;
//       font-weight: 600;
//       margin-bottom: 16rpx;
//       color: $uni-text-color;
//       @include overline(1);
//     }

//     .des {
//       font-size: 26rpx;
//       margin-bottom: 16rpx;
//       @include overline(2);
//     }

//     .text-b {
//       font-size: 26rpx;
//       display: flex;
//       align-items: center;

//       .view {
//         display: flex;
//         align-items: center;
//       }

//       .iconfont {
//         margin-right: 8rpx;
//       }

//       text {
//         margin-left: 32rpx;
//       }
//     }
//   }

//   image {
//     width: 220rpx;
//     height: 126rpx;
//     border-radius: 8rpx;
//     overflow: hidden;
//   }
// }

.use-tips-cons {
  width: 100%;
  max-height: 568rpx;
  padding-top: 125rpx;
  font-size: 28rpx;
  color: #666666;
  overflow: auto;
}

.ky-calder {
  width: 712rpx;
  height: 165rpx;
  opacity: 1;
  border-radius: 16rpx 0px 0px 16rpx;
  background: $uni-color-primary-fz;
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
      height: 24rpx;
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
      left: -22rpx;
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
    position: absolute;
    top: 0;
    left: 180rpx;
    height: 100%;
    padding-left: 50rpx;
    &::-webkit-scrollbar {
      width: 0;
      display: none;
    }
    &-date-box {
      // width: 10000rpx;
      width: max-content;
      padding-top: 45rpx;
      padding-left: 50rpx;
      display: flex;

      &-item {
        width: 174rpx;
        height: 4rpx;
        background: $uni-color-primary;
        position: relative;
        margin-right: 20rpx;
        &:last-child {
          // width: 0;
          background: #fff7f8;
        }
        .iconfont.default,
        .iconfont.active {
          border-radius: 10rpx;
          position: absolute;
          left: -20rpx;
          top: -8rpx;
          font-size: 20rpx;
          color: $uni-color-primary;
        }
        // &:before {
        //   content: '';
        //   display: block;
        //   width: 24rpx;
        //   height: 24rpx;
        //   border-radius: 24rpx;
        //   border: 2rpx solid $uni-color-primary;
        //   position: absolute;
        //   left: -10rpx;
        //   top: -10rpx;
        //   background: $uni-color-primary-fz;
        //   box-sizing: border-box;
        // }
        // &.active {
        //   &:after {
        //     content: '';
        //     display: block;
        //     width: 10rpx;
        //     height: 10rpx;
        //     border-radius: 10rpx;
        //     background: $uni-color-primary;
        //     position: absolute;
        //     left: 0rpx;
        //     top: -3rpx;
        //   }
        // }
        .b-text {
          width: 170rpx;
          font-size: 26rpx;
          color: $uni-text-color;
          text-align: center;
          position: absolute;
          left: -50%;
          bottom: -90rpx;
        }
      }
    }
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

.use-tips-cons {
  width: 100%;
  max-height: 568rpx;
  padding-top: 125rpx;
  font-size: 28rpx;
  color: #666666;
  overflow: auto;
}
</style>