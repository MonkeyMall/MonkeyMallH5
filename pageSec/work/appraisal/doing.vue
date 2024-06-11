<template>
  <view class="section-do showBtn">
    <view class="section-do-header">
      <view class="clock">
        <i class="iconfont">&#xe60c;</i>
        <text>{{ time }}</text>
      </view>
      <view class="section-do-header-right">
        <view
          :class="[ isJc ? 'jc' : '', 'item']"
          @click="dtkFn"
        >
          <i class="iconfont">&#xe626;</i>
          <text>答题卡</text>
        </view>
        <view class="item nums">
          <text class="currentNum">{{ info.orderId }}</text>
          <text class="allNum">/{{ info.allCount }}</text>
        </view>
      </view>
    </view>
    <choice
      :infoData="info"
      :courseOutlineType="courseOutlineType"
      @setResult="setResult"
    />

    <view v-show="isCheckResult">
      <view :class="[answerInfo.isCorrect === '0' ? 'error' : '', 'question-ok']">
        <view class="isOk">{{answerInfo.isCorrect === '1' ? '回答正确' : '回答错误'}}</view>
        <view class="isOk-item">正确答案：<text>{{ answerInfo.answerOption }}</text></view>
        <view class="isOk-item answerY">你的答案：<text>{{ answerInfo.answer }}</text></view>
      </view>

      <view class="doing-tab">
        <view
          :class="[tabType === 'analysis' ? 'isActive' : '','doing-tab-item', 'analysis']"
          @click="clickTabFn('analysis')"
        >答案解析</view>
        <view
          :class="[tabType === 'work' ? 'isActive' : '','doing-tab-item', 'work']"
          @click="clickTabFn('work')"
        >记笔记</view>
      </view>
      <!-- 答案解析/记笔记 -->
      <view class="tab-cons">
        <view
          class="analysis-cons"
          v-if="tabType === 'analysis'"
        >
          <view v-html="answerInfo.questionsAnalysis"></view>
        </view>
      </view>
    </view>

    <!-- 上一题/下一题按钮 -->
    <view class="question-btns">
      <button
        class="question-btn-item previous cu-btn"
        @click="clickBtnFn('previous')"
      >上一题</button>
      <button
        class="question-btn-item next cu-btn"
        @click="clickBtnFn('next')"
      >下一题</button>
    </view>
    <!-- 答题卡 -->
    <uni-popup
      ref="popupDtk"
      type="bottom"
    >
      <view class="takeNote">
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
                :class="[item.isFinish ? 'answer-item' : 'unfinsh answer-item']"
                @click="clickAnswerFn(item)"
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
                :class="[item.isFinish ? 'answer-item' : 'unfinsh answer-item']"
                @click="clickAnswerFn(item)"
              >{{ item.orderId }}</view>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
// import Comment from '../components/comment.vue'
// import labelBar from '../components/labelBar.vue'
import choice from '@/pageSec/work/exercise/components/choice.vue'
import { cutDownMixins } from '@/mixins/index'
import {
  selectNextQuestion,
  selectAnwserCardList
} from '@/api/work/evaluation.js'
export default {
  components: {
    // labelBar,
    // Comment,
    choice
  },
  data() {
    return {
      courseOutlineType: 0, //0 政治  2数学
      examinationId: '',	// 试卷id
      questionId: '', // 试题id
      userAnswer: '', // 学生答案选项
      // orderId: '', // 当前试题序号
      // allCount: 0, // 试题总数
      toPage: '', // -1上一题 1下一题
      selectResult: [], // 选择的选项
      info: {
        orderId: ''
      },
      singleList: [],
      moreList: [],

      tabType: 'analysis',
      zxOrRm: 'zx',
      note: '', // 记笔记内容
      isJc: false, // 是否纠错
      isCheckResult: false, // 控制是否显示对答案
      courseid: 0,
      type: 0, // 0 政治 1 外语 2数学
      affiliationModule: 0,// 所属模块 0名师题库 1精选题库 2真题题库 3每日题库
      isReviewTask: 0, // 是否为复习任务  0 否  1是
      collectStatus: '2', // 收藏状态 0 收藏  2取消收藏
      myNotesList: [], // 我的笔记列表
      allComment: [], // 所有评论
      answerInfo: {
        answer: '', // 学生答案
        answerOption: '', // 正确答案
        questionsAnalysis: '', // 解析
        isCorrect: '2' // 是否正确  0错误1正确 2未答题
      }
    }
  },
  mixins: [cutDownMixins],
  async onLoad(options) {
    console.log('onLoad', options)
    this.courseOutlineType = options.courseOutlineType || 0
    this.examinationId = options.examinationId || ''
    this.info.orderId = options.orderId || ''
    await this.getNextInfo()
  },
  created() {

  },
  watch: {

  },
  methods: {
    // 获取下一题信息
    async getNextInfo(duration) {
      let obj = {
        examinationId: this.examinationId, // 试卷id
        orderId: this.info ? this.info.orderId : '', // 当前试题序号
        toPage: this.toPage, // -1上一题 1下一题
        userAnswer: this.userAnswer // 学生答案选项
      }
      if (duration) obj.duration = duration
      console.log('保存的数据', obj)
      const { data } = await selectNextQuestion(obj)
      console.log('下一题', data)
      if (!data) return
      this.questionId = data.questionId || 0
      this.info = data
      this.questionsType = data.questionsType
      this.questionEndTime = data.endTime
      this.userAnswer = data.userAnswer
      if (this.info.studyStatus === 2) {
        this.$tab
          .redirectTo(
            `/pageSec/work/appraisal/evlationResult?examinationId=${this.examinationId}`
          )
        return
      }
    },
    // 获取答题卡信息
    async getResultData(examinationId) {
      const { data } = await selectAnwserCardList(examinationId)
      this.singleList = data.singleList || []
      this.moreList = data.moreList || []
    },
    clickTabFn(type) {
      this.tabType = type
      if (type === 'work') {
        this.getMyNotes()
        this.getAllComment(0)
      }
    },
    // 用户选完答案的选项
    setResult(arr) {
      console.log('选择结果', arr)
      this.selectResult = arr
      this.userAnswer = arr
    },
    // 点击答题卡
    dtkFn() {
      this.$refs.popupDtk.open()
      this.getResultData(this.examinationId)
    },
    // 点击答题卡跳到指定的题目
    async clickAnswerFn(item) {
      this.info.orderId = item.orderId || ''
      this.toPage = undefined
      await this.getNextInfo()
      this.$refs.popupDtk.close()
    },
    // 点击上一题、下一题按钮
    async clickBtnFn(type) {
      // previous next
      if (type === 'next') {
        this.toPage = '1'
        this.stopIntervalFn()
        if (this.info.orderId === this.info.allCount) {
          // 到最后一题了
          this.clearIntervalFn()
          await this.getNextInfo(this.duration)
          this.$tab
            .redirectTo(
              `/pageSec/work/appraisal/answerSheet?examinationId=${this.examinationId}&duration=${this.duration}&courseOutlineType=${this.courseOutlineType}`
            )
          return
        }
        await this.getNextInfo(this.duration)
      } else {
        // 上一题
        if (this.info.orderId <= 1) {
          uni.showToast({
          title: '已经是第一题了',
          icon: 'none'
        })
          // this.$modal.toast('已经是第一题了')
          return
        } else {
          this.toPage = '-1'
          await this.getNextInfo()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: $uni-color-primary-fz;
}
.section-do {
  &.showBtn {
    padding-bottom: 200rpx;
  }
  &-header {
    padding: 30rpx;
    background: $uni-text-color-inverse;
    font-size: 26rpx;
    color: $uni-text-color;
    @include flexBetween;
    .iconfont {
      font-size: 30rpx;
      margin-right: 16rpx;
    }
    .clock {
      font-size: 26rpx;
      color: $uni-text-color;
    }
    &-right {
      @include flexBetween;
      align-items: baseline;
      .item {
        @include flexBetween;
        align-items: flex-end;
        margin-right: 32rpx;
        font-size: 24rpx;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        text-align: end;
        .currentNum {
          font-size: 32rpx;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
        }
        .allNum {
          color: rgba(153, 153, 153, 1);
        }
      }
      .sc {
        font-size: 26rpx;
        .iconfont {
          color: $uni-color-tag;
        }
      }
      .jc {
        .iconfont {
          color: rgba(43, 199, 160, 1);
        }
      }
    }
  }
}

.check {
  padding: 80rpx 30rpx;
  background: $uni-text-color-inverse;
  .check-question {
    line-height: 80rpx;
    text-align: center;
    font-size: 32rpx;
    font-weight: 600;
    border-radius: 16rpx;
    color: $uni-text-color-inverse;
    background: $uni-color-primary;
    &.disabled {
      background: rgba(153, 153, 153, 0.4);
    }
    // border: 2rpx solid $uni-color-primary;
  }
}

.question-ok {
  height: 182rpx;
  border-radius: 16rpx;
  background: $uni-text-color-inverse;
  position: relative;
  display: flex;
  margin: 32rpx auto 0;
  background: $uni-text-color-inverse;
  // @include alignCenter;
  &.error {
    .isOk {
      background: $uni-color-primary;
    }
    .answerY {
      text {
        color: $uni-color-primary;
      }
    }
  }
  .isOk {
    width: 150rpx;
    line-height: 56rpx;
    text-align: center;
    opacity: 1;
    border-radius: 16rpx 0px 16rpx 0rpx;
    background: $uni-color-fz;
    color: $uni-bg-color;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    &-item {
      height: 50rpx;
      text-align: center;
      margin-top: 88rpx;
      // @include flexCenter;
      position: relative;
      &:after {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background: $uni-bg-color-grey;
      }
      // &:nth-child(1){
      //   border-right: 1px solid $uni-bg-color-grey;
      // }
    }
  }
  .isOk-item {
    flex: 1;
    // @include alignCenter;
  }
  text {
    color: $uni-color-fz;
  }
}
.doing-tab {
  padding-top: 32rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: $uni-text-color;
  background: $uni-text-color-inverse;
  border-radius: 16rpx 16rpx 0 0;
  margin-top: 32rpx;
  display: flex;
  &-item {
    position: relative;
    // color: $uni-color-primary;
    flex: 1;
    text-align: center;
    padding-bottom: 40rpx;
    &.isActive {
      color: $uni-color-primary;
      &::after {
        content: '';
        display: block;
        width: 24rpx;
        height: 8rpx;
        border-radius: 8rpx;
        background: $uni-color-primary;
        position: absolute;
        bottom: 16rpx;
        left: calc((100% - 24rpx) / 2);
      }
    }
  }
}
.analysis-cons {
  font-size: 28rpx;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 50rpx;
  color: $uni-text-color;
  border-radius: 0 0 16rpx 16rpx;
}
.tab-cons {
  padding: 0 46rpx 46rpx 46rpx;
  background: $uni-text-color-inverse;
  min-height: 200rpx;
}

.question-btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32rpx;
  font-weight: 600;
  position: fixed;
  bottom: 30px;
  left: 0;
  padding: 0 32rpx;
  .question-btn-item {
    width: 330rpx;
    line-height: 80rpx;
    border-radius: 8rpx;
    text-align: center;
  }
  .previous {
    color: $uni-color-primary;
    border: 2px solid $uni-color-primary;
    background: $uni-color-primary-fz;
  }
  .next {
    color: $uni-color-primary-fz;
    background: $uni-color-primary;
    border: 2px solid $uni-color-primary;
  }
}

.takeNote {
  background: $uni-color-bg-gray;
  padding: 32rpx;
  &-header {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    font-weight: 400;
    color: $uni-text-color;
    padding: 20rpx 40rpx;
    border-radius: 16rpx;
    background: $uni-text-color-inverse;
    image {
      width: 64rpx;
      height: 64rpx;
      margin-right: 36rpx;
    }
  }
  .service-comment-text {
    margin-top: 24rpx;
    position: relative;
    textarea {
      width: 690rpx;
      height: 370rpx;
      font-size: 26rpx;
      padding: 32rpx 16rpx;
      background: #fff;
    }
    text {
      font-size: 28rpx;
      color: #999999;
      position: absolute;
      bottom: 13rpx;
      right: 18rpx;
    }
  }
  .submitTakeNote {
    width: 690rpx;
    line-height: 80rpx;
    border-radius: 16rpx;
    background: $uni-color-primary;
    font-size: 32rpx;
    font-weight: 600;
    text-align: center;
    color: $uni-text-color-inverse;
    margin-top: 32rpx;
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
</style>
