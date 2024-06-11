<template>
  <view class="page">
    <view class="answer-header">
      <text>总分：{{fullScore}}分</text>
      <text>题量：{{allCount}}题</text>
      <text>未答：{{totalNotAns}}题</text>
    </view>
    <view class="answer-list">
      <view
        v-if="singleList.length"
        class="answer-list-item answer-list-1"
      >
        <label>单选题</label>
        <view class="answer-list-item-box">
          <view
            v-for="(item, index) in singleList"
            :key="index"
            :class="[item.isFinish === 0 ? 'unfinsh' : '','answer-item']"
            @click="goQuestion(item)"
          >{{ item.orderId }}</view>
        </view>
      </view>
      <view
        v-if="moreList.length"
        class="answer-list-item answer-list-2"
      >
        <label>多选题</label>
        <view class="answer-list-item-box">
          <view
            v-for="(item, index) in moreList"
            :key="index"
            :class="[item.isFinish === 0 ? 'unfinsh' : '','answer-item']"
            @click="goQuestion(item)"
          >{{ item.orderId }}</view>
        </view>
      </view>
    </view>
    <button
      class="submit question-btn-item next cu-btn"
      @click="submitAnswerCard"
    >提交</button>
  </view>
</template>

<script>
import {
  selectAnwserCardList,
  updateType
} from '@/api/work/evaluation.js'
export default {
  components: {
  },
  data() {
    return {
      singleList: [],
      moreList: [],
      fullScore: '', // 总分
      allCount: '', // 题量
      totalNotAns: '', // 未答题数
      // duration: '', // 学习时长
      examinationId: '', // 试题ID
      courseOutlineType: 0, //0 政治  2数学
    }
  },
  onLoad(option) {
    // this.duration = option.duration
    this.examinationId = option.examinationId
    this.courseOutlineType = option.courseOutlineType
    this.getAnswerCardList(option.examinationId)
  },
  methods: {
    // 获取答题卡列表
    async getAnswerCardList(examinationId) {
      const { data } = await selectAnwserCardList(examinationId)
      this.singleList = data.singleList
      this.moreList = data.moreList
      this.fullScore = data.fullScore
      this.allCount = data.allCount
      this.totalNotAns = data.totalNotAns
    },
    // 提交答题卡
    async submitAnswerCard() {
      const { data, code } = await updateType({
        examinationId: this.examinationId,
        // duration: this.duration
      })
      if (code === 200) {
        uni.showToast({
          title: '提交成功',
          duration: 500
        })
        this.$tab.redirectTo(`/pageSec/work/appraisal/evlationResult?examinationId=${this.examinationId}&courseOutlineType=${this.courseOutlineType}`)
      }
    },
    // 点击跳转到对应的题
    goQuestion(item) {
      this.$tab.redirectTo(
        `/pageSec/work/appraisal/doing?examinationId=${item.examinationId}&orderId=${item.orderId}&courseOutlineType=${this.courseOutlineType}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 30rpx;
  min-height: 100vh;
  background: $uni-text-color-inverse;
}
.answer-header {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  font-weight: bold;
  color: $uni-text-color;
  margin-bottom: 40rpx;
  text {
    margin-right: 32rpx;
  }
}
.answer-list {
  &-item {
    label {
      font-size: 28rpx;
      font-weight: 400;
      color: $uni-text-color-grey;
    }
    &-box {
      display: flex;
      flex-wrap: wrap;
      margin-top: 32rpx;
      .answer-item {
        width: 56rpx;
        height: 56rpx;
        line-height: 56rpx;
        border-radius: 56rpx;
        text-align: center;
        font-size: 28rpx;
        color: $uni-text-color-grey;
        background: $uni-color-bg;
        margin-bottom: 32rpx;
        &:not(:nth-of-type(6n)) {
          margin-right: 70rpx;
        }
        &.unfinsh {
          color: $uni-color-primary;
          background: $uni-text-color-inverse;
          border: 1px solid $uni-color-primary;
        }
      }
    }
  }
}

.submit {
  width: 690rpx;
  line-height: 80rpx;
  border-radius: 16rpx;
  text-align: center;
  font-size: 32rpx;
  font-weight: 600;
  color: $uni-text-color-inverse;
  background: $uni-color-primary;
  position: fixed;
  bottom: 68rpx;
  left: 30rpx;
}
</style>
