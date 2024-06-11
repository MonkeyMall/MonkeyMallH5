<template>
  <view class="doIndex-tab">
    <view class="doIndex-tab-item" @click="goPage(0)">
      <view class="doIndex-tab-item-text">坚持天数</view>
      <view class="doIndex-tab-item-day">{{ formData.signDays || 0 }}天</view>
      <view class="doIndex-tab-item-pm">
        <image style="margin-bottom: 13rpx;"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/sx-5.png"
          mode="scaleToFill" />
        <text>排名：</text>
        <text class="nums" v-if="!formData.signDays || formData.signDays == 0">--</text>
        <text class="nums" v-else>{{ formData.signRank || 0 }}</text>
      </view>
      <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/sx-top-1.png"
        mode="scaleToFill" class="imagTag" />
    </view>
    <view class="doIndex-tab-item" @click="goPage(1)">
      <view class="doIndex-tab-item-text">正确率</view>
      <view class="doIndex-tab-item-day">{{ formData.rate || 0 }}</view>
      <view class="doIndex-tab-item-pm">
        <image style="margin-bottom: 13rpx;"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/sx-5.png"
          mode="scaleToFill" />
        <text>排名：</text>
        <text class="nums" v-if="!formData.rate || formData.rate.split('%')[0] == '0.00'">--</text>
        <text class="nums" v-else>{{ formData.rightRateRank || 0 }}</text>
      </view>
      <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/sx-top-2.png"
        mode="scaleToFill" class="imagTag imagTag2" />
    </view>
  </view>
</template>

<script>
import { selectRankInfo } from '@/api/work/math'
import { selectRankInfoPolitics } from '@/api/work/english'
export default {
  components: {

  },
  props: {
    type: {
      type: Number,
      default: 2 // 0 政治 1 外语 2数学
    },
    courseOutlineType: {
      type: Number,
      default: 2 // 0 政治 1 外语 2数学
    },
  },
  data() {
    return {
      formData: {}
    }
  },
  mounted() {
    console.log('执行-mounted')
    this.selectRankInfoFn()
  },
  methods: {
    selectRankInfoFn() {
      console.log('类型：', this.type)
      if (this.type === 0) {
        selectRankInfoPolitics().then(res => {
          if (res.code === 200) {
            this.formData = res.data
          }
        })
      } else {
        selectRankInfo().then(res => {
          if (res.code === 200) {
            this.formData = res.data
            // this.$emit('mathJd', {
            //   count1: res.data.count1,
            //   count2: res.data.count2,
            //   count3: res.data.count3,
            //   count4: res.data.count4
            // })
          }
        })
      }
    },
    goPage(val) {
      console.log(this.courseOutlineType, '22222222courseOutlineType')
      this.$tab.navigateTo(`/pageFive/work/rankingList/index?TabIndex=${val}&courseOutlineType=${this.courseOutlineType}`)
    },
  }
}
</script>

<style lang="scss" scoped>
.doIndex-tab {
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
      margin: 13rpx 0 11rpx 18rpx;
    }

    &-pm {
      @include alignCenter;
      margin-left: 9rpx;

      image {
        width: 45rpx;
        height: 45rpx;
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

    .imagTag2 {
      width: 90rpx;
      transform: scale(1.3);
      margin-top: 8rpx;
    }
  }
}
</style>