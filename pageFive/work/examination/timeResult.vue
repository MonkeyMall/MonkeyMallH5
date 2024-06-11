<template>
  <view class="page result">
    <view class="titlrs">
      详情
    </view>
    <view class="result-title">{{ title }}</view>
    <view class="result-status">考试结束</view>
    <view class="result-nums">
      <view class="label">考试情况</view>
      <view class="result-nums-cons">
        <view class="result-nums-cons-item">
          <view class="result-nums-cons-item-left">
            <text class="result-nums-cons-item-left-label">总用时</text>
            <text class="result-nums-cons-item-left-num">{{ timer }}</text>
          </view>
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/examination/left.png"
            mode="scaleToFill" class="topRight" />
        </view>
        <view class="result-nums-cons-item">
          <view class="result-nums-cons-item-left">
            <text class="result-nums-cons-item-left-label"> 一共 </text>
            <text class="result-nums-cons-item-left-num">{{ a }} 题</text>
          </view>
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/examination/right.png"
            mode="scaleToFill" class="topRight" />
        </view>
      </view>
    </view>
    <view class="result-list">
      <view class="result-list-item" v-for="(item, index) in list.topicList" :key="index">
        <view class="label" v-if="index != list.length - 1">第{{ index + 1 }}题</view>
        <text v-if="index != list.length - 1">{{ item }} 秒</text>
      </view>
    </view>
    <view class="result-back" @click="backListFn">返回列表</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      timer: 0,
      title: null,
      a: null,
      id: null,
      isShow: true
    };
  },
  onLoad(options) {
    console.log(getCurrentPages(), '-----');
    console.log(options, 'options')
    //	进入结果页面说明倒计时结束		清除 未完成计时的 时间
    uni.removeStorageSync('wanchengtime')
    this.id = options.id
    this.title = options.title
    let arr = JSON.parse(uni.getStorageSync("examinationMode"))
    let index = arr.findIndex(item => item.id == this.id)
    arr.forEach(item => {
      if (item.id == options.id) {
        this.list = item;
      }
    })
    this.list.exitTime = null;
    arr[index] = this.list

    console.log(arr, '结果也全部数据')
    uni.setStorageSync("examinationMode", JSON.stringify(arr))

    this.list.topicList.forEach(item => {
      this.timer = this.timer * 1 + item * 1
    })
    this.timer = Math.floor(this.timer / 60) ? Math.floor(this.timer / 60) + '分' : '' + this.timer % 60 + '秒';

    this.a = this.list.topicList.length;
  },
  mounted() {

  },
  methods: {
    backListFn() {
      //  返回列表的时候，情况当前计时数据的 剩余时间 ，剩余秒数，题目时间数组
      uni.setStorageSync(`${this.list.id}examinationModeFlag`, true)   //  如果是点击返回列表，说明单次倒计时结束
      console.log(this.list);
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  padding: 30rpx;
  color: $uni-color-primary;
  background: $uni-text-color-inverse;

  .titlrs {
    font-size: 32rpx;
    font-weight: 600;
    line-height: 44.8px;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    padding-top: 65rpx;
  }
}

.result {
  position: relative;

  &-title {
    font-size: 40rpx;
    text-align: center;
    padding-top: 32rpx;
  }

  &-status {
    font-size: 32rpx;
    text-align: center;
    color: $uni-text-color;
    margin-top: 16rpx;
  }

  &-nums {
    margin-top: 32rpx;

    .label {
      font-size: 32rpx;
      color: $uni-text-color;
    }

    &-cons {
      margin-top: 32rpx;
      @include flexBetween;

      &-item {
        width: 330rpx;
        height: 127rpx;
        border-radius: 8rpx;
        background: $uni-color-bg;
        @include flexBetween;

        &-left {
          padding-left: 16rpx;
          @include columnAlignStart;
          justify-content: center;

          &-label {
            font-size: 26rpx;
            color: $uni-text-color;
            // padding: 16rpx 0;
          }

          &-num {
            font-size: 32rpx;
            font-weight: 600;
            color: $uni-text-color;
            margin-top: 16rpx;
          }
        }

        image {
          width: 106rpx;
          height: 106rpx;
        }
      }
    }
  }

  &-list {
    padding: 40rpx 32rpx;
    height: 927rpx;
    margin-bottom: 68rpx;
    overflow-y: scroll;

    &-item {
      @include flexBetween;
      margin-bottom: 64rpx;

      .label {
        font-size: 32rpx;
        color: $uni-text-color;
      }

      text {
        font-size: 32rpx;
        color: $uni-color-primary;
      }
    }
  }

  &-back {
    width: 690rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 16rpx;
    background: $uni-text-color-inverse;
    border: 2px solid $uni-color-primary;
    position: fixed;
    bottom: 68rpx;
    left: 50%;
    margin-left: -345rpx;
  }
}
</style>