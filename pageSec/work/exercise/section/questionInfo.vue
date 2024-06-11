<template>
  <!-- class="section-do showBtn" -->
  <view class="section-do">
    <!-- 展示题的部分 -->
    <choice
      ref="choiceRef"
      :infoData="info"
      @setResult="setResult"
      :courseOutlineType="courseOutlineType"
      :onlyRead="onlyRead"
    />
    <!-- 正确答案、解析、评论 -->
    <view>
      <view class="doing-tab">
        <view
          :class="[tabType === 'analysis' ? 'isActive' : '', 'doing-tab-item', 'analysis']"
          @click="clickTabFn('analysis')"
        >答案解析</view>
        <view
          :class="[tabType === 'work' ? 'isActive' : '', 'doing-tab-item', 'work']"
          @click="clickTabFn('work')"
        >看笔记
        </view>
      </view>
      <!-- 答案解析/记笔记 -->
      <view class="tab-cons">
        <view
          class="analysis-cons"
          v-if="tabType === 'analysis'"
        >
          <view
            v-if="courseOutlineType == 2 && answerInfo.remark"
            style="padding-top: 12rpx;"
          >
            <view
              v-for="(item, index) in answerInfo.questionsAnalysis"
              :key="index"
              style="display: inline-flex;"
            >
              <text v-if="item.type === 'chinese'">{{ item.nodes }}</text>
              <rich-text
                v-else
                class="rich-text"
                :nodes="item.nodes"
              ></rich-text>
            </view>
          </view>

          <uv-parse
            v-else
            :content="answerInfo.questionsAnalysis"
          >
          </uv-parse>
        </view>
        <view
          class="work-cons"
          v-else
        >
          <labelBar
            rightType='none'
            leftText="我的笔记"
            :nums="myNotesList.length"
            @takeNoteFn="takeNoteFn"
          />
          <comment
            :all="false"
            :list="myNotesList"
            :disabled="true"
            v-if="myNotesList.length > 0"
          ></comment>
          <view v-else>
            <uni-default-page
              value="4"
              tic="暂无数据"
            ></uni-default-page>
          </view>
          <labelBar
            rightType='button'
            leftText="全部评论"
            :nums="allComment.length"
            @zxOrRmFn="zxOrRmFn"
          />
          <comment
            v-if="allComment.length > 0"
            :disabled="true"
            :all="true"
            :list="allComment"
            :zxOrRm="zxOrRm"
          >
          </comment>
          <view v-else>
            <uni-default-page
              value="4"
              tic="暂无数据"
            ></uni-default-page>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Comment from '../components/comment.vue'
import labelBar from '../components/labelBar.vue'
import choice from '../components/choice.vue'
import { defaultMixins } from '@/mixins/index'
import uniDefaultPage from '@/pageSec/components/uni-default-page/uni-default-page.vue';
import parse from "@rojer/katex-mini";

import {
  getQuestionDetailId,
  selectNotesListByOrder,
  selectMyNotesList,
} from '@/api/work/english.js'
export default {
  components: {
    labelBar,
    Comment,
    choice,
    uniDefaultPage,
  },
  data() {
    return {
      tabType: 'analysis',
      zxOrRm: 'zx',
      note: '', // 记笔记内容
      selectResult: [], // 选择的选项
      // isCheckResult: false, // 控制是否显示对答案
      info: null,
      courseid: 0, //试题id
      type: 0, // 0 政治 1 外语 2数学
      affiliationModule: 0,// 所属模块 0名师题库 1精选题库 2真题题库 3每日题库
      questionId: '', // 当前的试题ID
      isReviewTask: 0, // 是否为复习任务  0 否  1是
      orderId: 0, // 第几题
      allCount: 0, // 试题总数
      collectStatus: '2', // 收藏状态 0 收藏  2取消收藏
      myNotesList: [], // 我的笔记列表
      allComment: [], // 所有评论
      answerInfo: {
        answer: '', // 学生答案
        answerOption: '', // 正确答案
        questionsAnalysis: '', // 解析
        isCorrect: '2' // 是否正确  0错误1正确 2未答题
      },
      pageType: '', // -1上一页  1下一页
      courseOutlineType: 0, //0 政治  2数学
      onlyRead: false, // 是否为收藏 0收藏 1错题
    }
  },
  mixins: [defaultMixins],
  async onLoad(options) {
    console.log('onLoad', options)
    this.questionId = options.questionId || 0
    this.courseOutlineType = options.courseOutlineType || 0
    this.onlyRead = options.isScType == '0' ? true : false //0收藏 1错题
    this.getQuestionInfo()
  },
  created() {

  },
  watch: {

  },
  computed: {
  },
  methods: {
    // 数学公式字符窜转义
    mathFormulaFn(parsedString) {
      if (!parsedString) return
      let parsedArray = []
      if (parsedString.indexOf('<p>') == -1) {
        console.log('爬的数据')
        parsedArray = parsedString.split("$")
      } else {
        // parsedString = parsedString.replace(/<p>/g, '').replace(/<\/p>/g, '')
        console.log('富文本数据', parsedString)
        return parsedString
      }
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
    // 获取试题详情页
    async getQuestionInfo() {
      const { data } = await getQuestionDetailId(this.questionId)
      console.log('试题详情', data)
      this.info = data
      this.info.userAnswer = data.answerOption
      this.answerInfo.answer = data.answer || ''
      this.answerInfo.answerOption = data.answerOption || ''
      if (this.courseOutlineType == 2) {
        this.answerInfo.questionsAnalysis = this.mathFormulaFn(data.questionsAnalysis)
      } else {
        this.answerInfo.questionsAnalysis = data.questionsAnalysis
      }

      // this.answerInfo.questionsAnalysis = data.questionsAnalysis || ''
      // uni.setNavigationBarTitle({ title: data. })
    },
    // 我的笔记列表
    async getMyNotes() {
      const { rows } = await selectMyNotesList(this.questionId)
      console.log('我的笔记列表', rows)
      this.myNotesList = rows
    },
    // 全部评论
    async getAllComment(type) {
      const { rows } = await selectNotesListByOrder({
        questionId: this.questionId,
        type: type // 0最新 1热点
      })
      this.allComment = rows
      console.log('全部评论', rows)
    },
    clickTabFn(type) {
      this.tabType = type
      if (type === 'work') {
        this.getMyNotes()
        this.getAllComment(0)
      }
    },
    // 暂存子组件的tab状态
    zxOrRmFn(type) {
      this.zxOrRm = type
    },
    // 
    setResult(arr) {
      console.log('选择结果', arr)
      this.selectResult = arr
      this.answer = arr
    },
    // 记笔记
    takeNoteFn() {
      this.$refs.popup.open()
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

      .item {
        @include flexBetween;
        margin-right: 32rpx;
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
