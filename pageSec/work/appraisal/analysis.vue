<template>
  <view>
    <view
      v-if="analysisList.length"
      class="section-do showBtn"
    >
      <view
        v-for="(item, index) in analysisList"
        :key="index"
      >
        <choice
          :ref="choiceRef + index"
          :infoData="item"
          :courseOutlineType="courseOutlineType"
          :onlyRead="true"
          @setResult="setResult"
        />
        <view :class="[item.isCorrect === '0' || item.isCorrect === '2' ? 'error' : '', 'question-ok']">
          <view class="isOk">{{item.isCorrect === '1' || item.isCorrect === '2' ? '回答正确' : '回答错误'}}</view>
          <view class="isOk-item">正确答案：<text>{{ item.answerOption }}</text></view>
          <view class="isOk-item answerY">你的答案：<text>{{ item.userAnswer }}</text></view>
        </view>

        <view class="doing-tab">
          <view :class="[tabType === 'analysis' ? 'isActive' : '','doing-tab-item', 'analysis']">答案解析</view>
        </view>
        <!-- 答案解析/记笔记 -->
        <view class="tab-cons">
          <view
            class="analysis-cons"
            v-if="tabType === 'analysis'"
          >
            <view
              v-if="courseOutlineType == '2' && item.remark"
              style="padding-top: 12rpx;"
            >
              <view
                v-for="(item1, index) in item.questionsAnalysis"
                :key="index"
                style="display: inline-flex;"
              >
                <text v-if="item1.type === 'chinese'">{{ item1.nodes }}</text>
                <rich-text
                  v-else
                  class="rich-text"
                  :nodes="item1.nodes"
                ></rich-text>
              </view>
            </view>
            <uv-parse
              v-else
              :content="item.questionsAnalysis"
            ></uv-parse>
            <!-- <uv-parse :content="item.questionsAnalysis"></uv-parse> -->
          </view>
        </view>
      </view>
    </view>
    <view v-else>
      <uni-default-page
        value="4"
        tic="暂无数据"
        btntext="返回上一级"
      ></uni-default-page>
    </view>
  </view>
</template>

<script>
import choice from '@/pageSec/work/exercise/components/choice.vue'
import uniDefaultPage from '@/pageSec/components/uni-default-page/uni-default-page.vue';
import parse from "@rojer/katex-mini";
import {
  selectAllAnalysisList,
  selectWrongAnalysisList
} from '@/api/work/evaluation.js'
export default {
  components: {
    // labelBar,
    // Comment,
    uniDefaultPage,
    choice
  },
  data() {
    return {
      pageType: '', // allQuestion(全部解析) errorQuestion(错题解析)
      examinationId: '',	// 试卷id
      analysisList: [], // 解析列表
      courseOutlineType: 0, //0 政治  2数学




      questionId: '', // 试题id
      userAnswer: '', // 学生答案选项
      // orderId: '', // 当前试题序号
      // allCount: 0, // 试题总数
      toPage: '', // -1上一题 1下一题
      selectResult: [], // 选择的选项
      info: {
        orderId: ''
      },

      tabType: 'analysis',
      zxOrRm: 'zx',
      note: '', // 记笔记内容
      isJc: false, // 是否纠错
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
  async onLoad(options) {
    console.log('onLoad', options)
    this.examinationId = options.examinationId || ''
    this.pageType = options.pageType || ''
    this.courseOutlineType = options.courseOutlineType || 0
    if (this.pageType === 'allQuestion') {
      // 全部解析页面
      await this.getAllComment()
    } else if (this.pageType === 'errorQuestion') {
      // 错题解析页面
      uni.setNavigationBarTitle({ title: '错题解析' })
      await this.getErrorComment()
    }
  },
  created() {

  },
  watch: {

  },
  methods: {
    // 数学公式字符窜转义
    mathFormulaFn(parsedString) {
      let parsedArray = parsedString ? parsedString.split("$") : []
      parsedArray = parsedArray.filter(item => item != '')
      var reg = /[\u4e00-\u9fa5\uff01-\uffff]/; // 定义中文的Unicode范围
      let arr = []
      if (parsedArray.length > 0) {
        parsedArray.forEach(item => {
          let obj = {}
          if (!reg.test(item)) { // 公式
            obj.type = 'formula'
            obj.nodes = parse(item, {
              throwError: true,
              displayMode: true,
            })
          } else {
            obj.type = 'chinese'
            obj.nodes = item
          }
          arr.push(obj)
        })
      }
      return arr
    },
    // 获取全部解析列表
    async getAllComment() {
      const { rows } = await selectAllAnalysisList(this.examinationId)
      if (this.courseOutlineType == '2') {
        rows.map(item => {
          item.questionsAnalysis = this.mathFormulaFn(item.questionsAnalysis)
        })
      }
      this.analysisList = rows || []
      console.log('全部解析列表', rows)
    },
    // 获取错题解析列表
    async getErrorComment() {
      const { rows } = await selectWrongAnalysisList(this.examinationId)
      if (this.courseOutlineType == '2') {
        rows.map(item => {
          item.questionsAnalysis = this.mathFormulaFn(item.questionsAnalysis)
        })
      }
      this.analysisList = rows || []
      console.log('错题解析列表', rows)
    },
    // 用户选完答案的选项
    setResult(arr) {
      console.log('选择结果', arr)
      this.selectResult = arr
      this.userAnswer = arr
    },
    // 点击上一题、下一题按钮
    async clickBtnFn(type) {
      // previous next
      if (type === 'next') {
        this.toPage = '1'
        this.stopIntervalFn()
        if (this.info.orderId === this.info.allCount) {
          // 到最后一题了
          await this.getNextInfo(this.duration)
          this.$tab
            .redirectTo(
              `/pageSec/work/appraisal/answerSheet?examinationId=${this.examinationId}&duration=${this.duration}`
            )
          return
        }
        await this.getNextInfo(this.duration)
      } else {
        // 上一题
        if (this.info.orderId <= 1) {
          this.$modal.toast('已经是第一题了')
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
    // padding-bottom: 200rpx;
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
    // flex: 1;
    margin-left: 32rpx;
    text-align: left;
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
  padding: 0 32rpx 0 32rpx;
  margin-bottom: 32rpx;
  background: $uni-text-color-inverse;
  min-height: 100rpx;
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
