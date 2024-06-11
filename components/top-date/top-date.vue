<template>
  <view>
    <view
      v-if="styleNum === 1"
      class="flexBox"
    >
      <view class="doIndex-header">
        <image
          v-if="templateNum === 1"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/common/common-tl.png"
          mode="scaleToFill"
          :class="'imgs' + templateNum"
        />
        <image
          v-if="templateNum === 2"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/common/common-tl-2.png"
          mode="scaleToFill"
          :class="'imgs' + templateNum"
        />
        <view class="doIndex-header-left">
          <view class="days">距离{{dateInfo.time}}考研还有<text>{{dateInfo.days}}</text>天</view>
          <view class="fSize22">{{dateInfo.content}}</view>
        </view>

      </view>
      <view
        class="doIndex-right"
        @click="goChatBot"
      >
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/chatbot.png" />
      </view>
    </view>
    <view
      v-else-if="styleNum === 2"
      :class="[templateNum === 1 ? 'temp1' : 'temp2', 'cutDown']"
    >
      <image
        src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/2-1.png"
        mode="scaleToFill"
      />
      距离<text>{{dateInfo.time}}</text>考研还有<text class="day">{{dateInfo.days}}</text>天
    </view>
  </view>
</template>
<script>
import { selectCountdownDays } from '@/api/comm'
export default {
  props: {
    styleNum: {
      type: Number,
      default: 1
    },
    // templateNum: {
    //   type: Number,
    //   default: 1
    // }
  },
  data() {
    return {
      dateInfo: {
        time: 2023,
        days: 0,
        content: ''
      },
      templateNum: Number(uni.getStorageSync('templateNum')) || 1
    }
  },
  created() {
    this.selectCountdownDays()
  },
  methods: {
    // 倒计时
    async selectCountdownDays() {
      const { code, data } = await selectCountdownDays()
      if (code !== 200) return
      this.dateInfo = data
    },
    goChatBot() {
      this.$tab.navigateTo('/pageFour/chat/chatBot')
    }
  }
}
</script>
<style lang="scss" scoped>
.flexBox {
  display: flex;
  justify-content: space-between;
}
.doIndex-header {
  // width: 425rpx;
  height: 86rpx;
  padding: 26rpx 16rpx;
  @include flexBetween;
  &-left {
    height: 100%;
    font-size: 26rpx;
    color: $uni-text-color-blank;
    @include columnAlignStart;
    justify-content: center;
    .days {
      font-size: 28rpx;
      color: $uni-text-color;
      display: flex;
      align-items: center;
      // margin-bottom: 20rpx;
      text {
        font-size: 40rpx;
        font-weight: 600;
        color: $uni-color-primary;
        margin: 0 8rpx;
      }
    }
  }
  image {
    width: 106rpx;
    height: 106rpx;
    margin-right: 8rpx;
    &.imgs2 {
      width: 161rpx;
      height: 133rpx;
    }
  }
  .fSize22 {
    font-size: 24rpx;
    color: #333333;
    // margin-top: 14rpx;
  }
}
.doIndex-right {
  width: 80rpx;
  height: 80rpx;
  margin-right: 32rpx;
  image {
    width: 80rpx;
    height: 80rpx;
  }
}

.cutDown {
  width: 100%;
  line-height: 80rpx;
  text-align: center;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  &.temp1 {
    margin-top: 32rpx;
    background: $uni-bg-color-tag;
  }
  &.temp2 {
    margin-bottom: 32rpx;
    background: rgba(255, 250, 235, 1);
  }
  image {
    width: 72rpx;
    height: 72rpx;
    margin-right: 16rpx;
  }
  text {
    margin: 0 8rpx;
  }
  .day {
    font-size: 40rpx;
    margin: 0 16rpx;
    color: $uni-color-primary;
  }
}
</style>