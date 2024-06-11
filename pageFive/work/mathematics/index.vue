<template>
  <view class="page doIndex">
    <topdate />
    <!-- 0 政治 1 外语 2数学 -->
    <Top @mathJd="mathJd" :courseOutlineType="2" ref="topRef"></Top>
    <view
      class="math-icons"
      @click="goZtst"
    >
      <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/sx-2.png"></image>
      <view class="math-icons-content">
        <view class="math-icons-top">
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/yh.svg"></image>
          <text class="math-icons-top-tit">历年真题刷题</text>
        </view>
        <view class="math-icons-top2">精准实战体验</view>
        <view class="math-icons-bottom">
          <view class="math-icons-bottom-left">
            <view class="progress-big">
              <view
                class="progress-small"
                :style="'width:'+percent +'%'"
              ></view>
            </view>
            <!-- <progress
            class="math-icons-bottom-left-progress"
            :percent="percent"
            backgroundColor="#F4EBFF"
            activeColor="#8C7AFF"
            stroke-width="8"
            border-radius="5"
          /> -->
            <view class="math-icons-bottom-left-num">
              <text>{{formData.count1}}</text>
              <text>共 {{ formData.count2 }} 题</text>
            </view>
          </view>
          <view class="btn">去刷题</view>
        </view>
      </view>
    </view>
    <view class="doIndex-fl">
      <view class="doIndex-fl-content">
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/sx-1.png"></image>
        <view
          class="doIndex-fl-left"
          @click="Ztkdst()"
        >
          <view class="titleTop">
            <view class="title">
              真题考点刷题
            </view>
            <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/yh.svg"></image>
          </view>
          <view class="des">把握考点大方向</view>
          <view class="doIndex-fl-left-des"><text class="txt-first">{{formData.count3 || 0 }} </text>
            / {{formData.count4 || 0}}</view>
          <view class="btn">去刷题</view>

        </view>
      </view>
      <view class="doIndex-fl-right">
        <view class="doIndex-fl-right-img">
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/sx-4.png"
            mode="scaleToFill"
          />
          <view
            class="doIndex-fl-right-1"
            @click="toCollectPage()"
          >
            <view class="title yellowBox">我的收藏</view>
            <view class="des">精确定位回顾</view>

          </view>
        </view>
        <view
          class="doIndex-fl-right-img"
          style="margin-top: 32rpx;"
        >
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/sx-3.png"
            mode="scaleToFill"
          />
          <view
            class="doIndex-fl-right-2"
            @click="toFn()"
          >
            <view class="title blueBox">我的学习报告</view>
            <view class="des">智能分析，快速提高</view>

          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { selectRankInfo } from '@/api/work/math'
import topdate from '@/components/top-date/top-date'
import Top from '../components/top.vue'

export default {
  components: {
    topdate,
    Top
  },
  data() {
    return {
      percent: 0,
      formData: {
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0
      }
    }
  },
  mounted() {
  },
  onShow() {
    this.selectRankInfoFn()
    this.$refs.topRef.selectRankInfoFn()
  },
  onPullDownRefresh() {
    this.enablePullDownRefreshFn()
    uni.stopPullDownRefresh();//停止刷新
  },
  
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '数学刷题',
      path: '/pageFive/work/mathematics/index',
    };
  },
  methods: {
     // 下拉刷新回调
     enablePullDownRefreshFn() {
      console.log('下拉刷新-----')
      this.$refs.topRef.selectRankInfoFn()
      this.selectRankInfoFn()
    },
    selectRankInfoFn() {
      selectRankInfo().then(res => {
        if (res.code === 200) {
          this.percent = (res.data.count1 / res.data.count2 * 100).toFixed(2)
          this.formData = res.data
        }
      })
    },
    // mathJd(info) {
    //   this.formData = info
    // },
    jxtkFn() {
      this.$tab.navigateTo('/pageSec/work/exercise/section/list')
    },
    goPage(val) {
      this.$tab.navigateTo('/pageFive/work/rankingList/index?TabIndex=' + val)
    },
    goZtst() {
      this.$tab.navigateTo('/pageSec/work/mathematics/brushQuestions/index?TabFlag=true&courseOutlineType=2&affiliationmodule=4')
    },
    mstkFn() {
      this.$tab.navigateTo('/pageSec/work/mathematics/questionBank/index')
    },
    Ztkdst() {
      this.$tab.navigateTo('/pageSec/work/mathematics/mathExaminationPoints/index')
    },
    toCollectPage() {
      this.$tab.navigateTo('/pageSec/work/english/collectPage?courseOutlineType=2&type=0')
    },
    toFn() {
      this.$tab.navigateTo(`/pageSec/work/english/studyReport?typeVal=math`)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 30rpx;
  min-height: 100vh;
  background: $uni-bg-color;
}
.doIndex {
  &-header {
    width: 250rpx;
    height: 86rpx;
    padding: 26rpx 16rpx;
    @include flexBetween;
    &-left {
      width: 120rpx;
      height: 100%;
      font-size: 22rpx;
      color: $uni-text-color-blank;
      @include columnAlignStart;
      justify-content: center;
      .days {
        font-size: 28rpx;
        color: $uni-text-color;
        // margin-bottom: 20rpx;
        text {
          font-size: 32rpx;
          font-weight: 600;
          color: $uni-color-primary;
          margin-right: 8rpx;
        }
      }
    }
    image {
      width: 71rpx;
      height: 86rpx;
    }
  }
  &-tab {
    @include flexBetween;
    margin-top: 32rpx;
    // width: calc(100% - 60rpx);
    &-item {
      width: 330rpx;
      height: 168rpx;
      border-radius: 16rpx;
      background: $uni-text-color-inverse;
      box-shadow: 1px -1px 14px 3px rgba(153, 153, 153, 0.1);
      font-size: 22rpx;
      position: relative;
      &-text {
        font-weight: 600;
        margin: 16rpx 0 0 18rpx;
      }
      &-day {
        font-size: 32rpx;
        font-weight: 600;
        margin: 8rpx 0 8rpx 18rpx;
      }
      &-pm {
        @include alignCenter;
        margin-left: 18rpx;
        image {
          width: 34rpx;
          height: 34rpx;
          margin-right: 16rpx;
        }
        text {
          margin-right: 8rpx;
          font-weight: 400;
          &.nums {
            margin-right: 12rpx;
            font-weight: 600;
          }
        }
      }
      .imagTag {
        width: 80rpx;
        height: 80rpx;
        position: absolute;
        top: 44rpx;
        right: 24rpx;
      }
    }
  }
  &-icons {
    // width: calc(100% - 60rpx);
    // margin-left: 32rpx;
    margin-top: 48rpx;
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
        font-size: 24rpx;
        font-weight: 600;
        line-height: 34rpx;
        color: $uni-text-color;
      }
    }
  }
  &-fl {
    // width: calc(100% - 60rpx);
    display: flex;
    margin-top: 32rpx;
    &-content {
      position: relative;
      image {
        width: 330rpx;
        height: 292rpx;
      }
    }
    .titleTop {
      .title {
        font-size: 32rpx;
        font-weight: 600;
        color: #283e63;
        display: inline-block;
      }
      image {
        width: 26rpx;
        height: 24rpx;
        transform: scaleX(-1);
        margin-bottom: 10rpx;
        margin-left: 8rpx;
      }
    }

    .des {
      font-size: 24rpx;
      font-weight: 400;
      color: $uni-text-color-grey;
    }
    &-left {
      position: absolute;
      top: 0;
      width: 330rpx;
      flex: 1;
      margin-right: 30rpx;
      border-radius: 16rpx;
      overflow: hidden;

      .title {
        margin-top: 32rpx;
        margin-left: 16rpx;
      }
      .des {
        margin-top: 8rpx;
        margin-left: 24rpx;
      }
      .btn {
        width: 120rpx;
        line-height: 40rpx;
        text-align: center;
        border-radius: 40rpx;
        font-size: 26rpx;
        color: #0b2563;
        // border: 2rpx solid $uni-text-color;
        background: #ffffff;
        margin-top: 11rpx;
        margin-left: 24rpx;
      }
      .doIndex-fl-left-des {
        font-size: 24rpx;
        font-weight: 600;
        color: $uni-text-color-grey;
        margin-top: 72rpx;
        margin-left: 24rpx;
        text {
          color: $uni-color-primary;
        }
        .txt-first {
          margin-right: 8rpx;
        }
      }
      // image {
      //   width: 130rpx;
      //   height: 130rpx;
      //   position: absolute;
      //   right: 0;
      //   bottom: -10rpx;
      // }
    }
    &-right {
      margin-left: 30rpx;
      flex: 1;

      &-img {
        position: relative;
        height: 130rpx;
        image {
          width: 330rpx;
          height: 130rpx;
        }
      }
      &-1 {
        margin-bottom: 32rpx;
      }
      &-1,
      &-2 {
        width: 330rpx;
        height: 130rpx;
        border-radius: 16rpx;
        overflow: hidden;
        position: absolute;
        display: flex;
        top: 0;
        flex-direction: column;
        justify-content: center;
        .title {
          margin-bottom: 8rpx;
        }
        .yellowBox {
          color: #7d5319;
          font-size: 28rpx;
          font-weight: 600;
        }
        .blueBox {
          color: #283e63;
          font-size: 28rpx;
          font-weight: 600;
        }
        .title,
        .des {
          margin-left: 24rpx;
          margin-top: 8rpx;
        }
        image {
          width: 90rpx;
          height: 90rpx;
          position: absolute;
          bottom: -14rpx;
          right: 20rpx;
        }
      }
    }
  }
  .label {
    font-size: 32rpx;
    font-weight: 600;
    color: $uni-text-color;
    margin: 32rpx 0;
  }
}

.math-icons {
  width: 100%;
  height: 298rpx;
  opacity: 1;
  border-radius: 16rpx;
  background: $uni-bg-color-tag;
  margin-top: 32rpx;
  position: relative;
  overflow: hidden;
  image {
    width: 100%;
    height: 298rpx;
  }
  &-content {
    position: absolute;
    top: 0;
  }
  &-top {
    display: flex;
    // align-items: flex-end;
    color: $uni-text-color-grey;
    font-size: 22rpx;
    image {
      width: 40rpx;
      height: 40rpx;
      margin: 34rpx 0 0 17rpx;
    }
    &-tit {
      font-size: 40rpx;
      font-weight: 600;
      font-weight: 600;
      margin-top: 40rpx;
      color: $uni-text-color;
    }

    &-des {
      text {
        color: $uni-color-primary;
      }
    }
  }
  &-top2 {
    font-size: 26rpx;
    font-weight: 400;
    color: $uni-text-color-grey;
    margin-left: 57rpx;
    margin-top: 8rpx;
  }
  &-bottom {
    display: flex;
    // align-items: center;
    margin-top: 50rpx;
    &-left {
      width: 376rpx;
      height: 19rpx;
      margin-left: 57rpx;
      &-num {
        display: flex;
        justify-content: space-between;
        margin-top: 8rpx;
        font-size: 24rpx;
        > text:nth-child(1) {
          color: #8c7aff;
        }
      }
    }
    text {
      color: $uni-text-color-grey;
      font-size: 22rpx;
    }
    .btn {
      width: 195rpx;
      color: white;
      height: 56rpx;
      line-height: 56rpx;
      margin-left: 38rpx;
      text-align: center;
      border-radius: 40rpx;
      font-size: 24rpx;
      border: 1rpx solid #cccccc;
      background: linear-gradient(130.29deg, #ae9cff 0%, #8c7aff 100%);
    }
  }
  .progress-big {
    width: 376rpx;
    height: 16rpx;
    background: #f4ebff;
    border-radius: 442rpx;
    .progress-small {
      background: linear-gradient(
        130.29deg,
        rgb(210, 204, 252),
        rgb(140, 122, 255)
      );
      border-radius: 220rpx;
      height: 16rpx;
    }
  }
}
</style>