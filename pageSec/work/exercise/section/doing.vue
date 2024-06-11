<template>
  <view class="section-do showBtn">
    <view
      v-if="!isError"
      class="section-do-header"
    >
      <view class="clock">
        <i class="iconfont">&#xe60c;</i>
        <text>{{ time }}</text>
      </view>
      <view class="section-do-header-right">
        <view
          :class="[collectStatus === '0' ? 'sc' : '', 'item']"
          @click="sctmFn"
        >
          <i
            class="iconfont"
            v-show="collectStatus == '0'"
          >&#xe60d;</i>
          <i
            class="iconfont"
            v-show="collectStatus == '2'"
          >&#xe618;</i>
          <text>收藏题目</text>
        </view>
        <view
          :class="[isJc ? 'jc' : '', 'wrongBox item']"
          @click="tmjcFn"
        >
          <!-- <i
            class="iconfont"
            v-show="isJc"
          >&#xe60f;</i>
          <i
            class="iconfont"
            v-show="!isJc"
          >&#xe619;</i> -->
          <image
            class="jcBox"
            v-show="!isJc"
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/jc-01.svg"
          ></image>
          <image
            class="jcBox"
            v-show="isJc"
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/jc-02.svg"
          ></image>
          题目纠错
        </view>
        <view
          :class="[isJc ? 'jc' : '', 'item ']"
          v-if="!isShowDtk"
          @click="dtkFn"
        >
          <i class="iconfont">&#xe626;</i>
          <text>答题卡</text>
        </view>
        <view class="item nums">
          <text>{{ orderId }}</text>
          <text>/{{ allCount }}</text>
        </view>
      </view>
    </view>
    <!-- 展示题的部分 -->
    <choice
      ref="choiceRef"
      :infoData="info"
      :courseOutlineType="courseOutlineType"
      @setResult="setResult"
    />
    <!-- 对答案按钮 -->
    <view
      class="check"
      v-if="!isCheckResult"
    >
      <view
        :class="[!selectResult.length ? 'disabled' : '', 'check-question']"
        @click="checkAnswer"
      >对答案</view>
    </view>
    <!-- 正确答案、解析、评论 -->
    <view v-if="isCheckResult">
      <view :class="[answerInfo.isCorrect === '0' ? 'error' : '', 'question-ok']">
        <view class="isOk">{{ answerInfo.isCorrect === '1' ? '回答正确' : '回答错误' }}</view>
        <view class="isOk-item">正确答案：<text>{{ answerInfo.answerOption }}</text></view>
        <view class="isOk-item answerY">你的答案：<text>{{ answerInfo.answer }}</text></view>
      </view>

      <view class="doing-tab">
        <view
          :class="[tabType === 'analysis' ? 'isActive' : '', 'doing-tab-item', 'analysis']"
          @click="clickTabFn('analysis')"
        >答案解析</view>
        <view
          :class="[tabType === 'work' ? 'isActive' : '', 'doing-tab-item', 'work']"
          @click="clickTabFn('work')"
        >记笔记
        </view>
      </view>
      <!-- 答案解析/记笔记 -->
      <view class="tab-cons">
        <view
          class="analysis-cons"
          v-if="tabType === 'analysis'"
        >
          <!-- <view v-html="answerInfo.questionsAnalysis"></view> -->
          <!-- --{{ JSON.stringify(answerInfo.questionsAnalysis) }} -->
          <view
            v-if="type == '2' && answerInfo.remark"
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
            <!-- <rich-text
              class="rich-text"
              :nodes="answerInfo.questionsAnalysis"
            ></rich-text> -->
          </view>
          <uv-parse
            v-else
            :content="answerInfo.questionsAnalysis"
          ></uv-parse>
        </view>
        <view
          class="work-cons"
          v-else
        >
          <labelBar
            rightType='iconfont'
            leftText="我的笔记"
            :nums="myNotesList.length"
            @takeNoteFn="takeNoteFn"
          />
          <comment
            :all="false"
            :list="myNotesList"
            v-if="myNotesList.length > 0"
          ></comment>
          <view v-else>
            <uni-default-page
              :mt="0"
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
            :all="true"
            :list="allComment"
            :zxOrRm="zxOrRm"
          ></comment>
          <view v-else>
            <uni-default-page
              value="4"
              tic="暂无数据"
              :mt="0"
            ></uni-default-page>
          </view>
        </view>
      </view>
    </view>

    <!-- 上一题/下一题按钮 -->
    <view
      class="question-btns"
      v-if="isCheckResult"
    >
      <button
        class="question-btn-item previous cu-btn"
        @click="clickBtnFn('previous')"
        v-if="!isError"
      >上一题</button>
      <button
        v-if="!isError && orderId === allCount"
        :class="isError ? 'question-btn-item next cu-btn errorBtn' : 'question-btn-item next cu-btn'"
        @click="clickBtnFn('next')"
      >查看结果</button>
      <button
        v-else
        :class="isError ? 'question-btn-item next cu-btn errorBtn' : 'question-btn-item next cu-btn'"
        @click="clickBtnFn('next')"
      >下一题</button>
    </view>
    <!-- 记笔记弹框 -->
    <uni-popup
      ref="popup"
      type="bottom"
    >
      <view class="takeNote">
        <view class="takeNote-header">
          <image
            src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/exercise/note.png"
            mode="scaleToFill"
          />
          <text>优质笔记会优先展示，恶意笔记会被系统删除，请认真记录哦~</text>
        </view>
        <view class="service-comment-text">
          <textarea
            :value="note"
            @input="appraiseFn"
            :maxlength="500"
            :data-maxnum="note.length + '/500'"
            placeholder="请输入笔记内容..."
            placeholder-style="color: #999999;"
            :show-confirm-bar="false"
          />
          <text>{{ note.length }}/500</text>
        </view>
        <view
          class="submitTakeNote"
          @click="addNote"
        >提交</view>
      </view>
    </uni-popup>
    <!-- 答题卡弹框 -->
    <uni-popup
      ref="popupDtk"
      type="bottom"
    >
      <view class="takeNote">
        <view class="answer-list">
          <view class="answer-list-item answer-list-1">
            <label>单选题</label>
            <view class="answer-list-item-box">
              <view
                v-for="(item, index) in list"
                :key="index"
                class="answer-item"
              >{{ index + 1 }}</view>
              <view class="answer-item unfinsh">1</view>
            </view>
          </view>
          <view class="answer-list-item answer-list-2">
            <label>多选题</label>
            <view class="answer-list-item-box">
              <view
                v-for="(item, index) in list"
                :key="index"
                class="answer-item"
              >{{ index + 1 }}</view>
              <view class="answer-item unfinsh">1</view>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import Comment from '../components/comment.vue'
import labelBar from '../components/labelBar.vue'
import choice from '../components/choice.vue'
import { defaultMixins } from '@/mixins/index'
import uniDefaultPage from '@/pageSec/components/uni-default-page/uni-default-page.vue';
// import uParse from '@/components/u-parse/u-parse.vue'
import parse from "@rojer/katex-mini";

import {
  getNextWord,
  mathsdetail,
  selectNotesListByOrder,
  politicsdetail,
  selectOrderAndCountInfo,
  addNotes,
  selectMyNotesList,
  collect
} from '@/api/work/english.js'
export default {
  components: {
    labelBar,
    Comment,
    choice,
    uniDefaultPage,
    // uParse
  },
  filters: {
    formatRich(val) {
      console.log('val: ', val);
      return "<view class='rich-layout' style='-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;white-space: pre-wrap'>" + val + "</view>"

    }
  },
  data() {
    return {
      isShowDtk: false,
      tabType: 'analysis',
      zxOrRm: 'zx',
      note: '', // 记笔记内容
      isJc: false, // 是否纠错
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
        isCorrect: '2', // 是否正确  0错误1正确 2未答题
        remark: ''
      },
      pageType: '', // -1上一页  1下一页
      courseOutlineType: 0, //0 政治  2数学
      isError: false, // 是否错题库点进来的
      canClick: true,
      haveNextWrongData: 1 // 政治错题库用来判断是否还有下一页数据
    }
  },
  mixins: [defaultMixins],
  async onLoad(options) {
    console.log('onLoad', options, options.affiliationModule)
    if (options.isError) this.isError = Boolean(options.isError)
    this.isShowDtk = options.isShowDtk || false
    this.courseid = options.id || 0
    this.affiliationModule = options.affiliationModule || 0
    console.log('this.affiliationModule: ', this.affiliationModule);
    this.isReviewTask = options.isReviewTask || 0
    this.type = Number(options.type) || 0
    this.courseOutlineType = options.courseOutlineType || options.type || 0
    this.questionId = options.questionId || 0
    this.pageType = options.pageType || ''
    await this.getNextInfo('first')
    await this.getOrderAndCountInfo()
    // 点击返回，意外退出的情况
    // uni.enableAlertBeforeUnload({
    //   message: '您确定要中途退出刷题吗？',
    //   success: function (res) {
    //     console.log('确定退出')
    //     this.stopIntervalFn()
    //     this.clearIntervalFn()
    //     this.getNextInfo()
    //   },
    //   fail: function (res) {
    //     console.log('取消退出')
    //   }
    // })
  },
  created() {

  },
  watch: {

  },
  computed: {
    isCheckResult() {
      return this.answerInfo.answer !== ''
    }
  },
  onShow() {
    this.isJc = false
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
    RegExpFn(text) {
      console.log("解析的参数-2", text)
      return text.replace(/\$/g, "")
    },
    // 初始化页面数据
    async initPage() {
      this.tabType = 'analysis'
      this.zxOrRm = 'zx'
      this.selectResult = [] // 选择的选项
      if (!this.info.answer) this.$refs.choiceRef.initSelect() // 清空子组件的选择值
      // this.isCheckResult = false // 控制是否显示对答案
      this.info = null
      this.collectStatus = '2' // 收藏状态 0 收藏  2取消收藏
    },
    // 节目录页题数和序号信息
    async getOrderAndCountInfo() {
      const { data } = await selectOrderAndCountInfo({
        affiliationmodule: this.affiliationModule,
        courseid: this.courseid,
        questionId: this.questionId
      })
      this.collectStatus = String(data.collectStatus)
    },
    // 获取下一题信息
    async getNextInfo(tag) {
      let courseid = this.courseid
      let obj = {
        courseid,
        type: this.isReviewTask, // 0今日刷题  1复习任务刷题
        subjectType: this.type, // 0 政治 1 外语 2数学
        questionId: this.questionId, // 试题id
        pageType: this.pageType, // -1上一页  1下一页
        duration: this.duration // 学习时长(秒)
      }
      if (this.isError) obj.wrongType = 1
      const { data } = await getNextWord(obj)

      this.questionId = data.Id || data.questionId || data.id || 0
      this.info = data
      this.orderId = data.orderId
      this.allCount = data.allCount
      this.questionsType = data.questionsType
      this.answerInfo.answer = data.answer || ''
      this.answerInfo.answerOption = data.answerOption || ''
      if (this.type == '2') {
        this.answerInfo.questionsAnalysis = this.mathFormulaFn(data.questionsAnalysis)
      } else {
        this.answerInfo.questionsAnalysis = data.questionsAnalysis || ''
      }
      this.answerInfo.isCorrect = data.isCorrect || '2'
      this.answerInfo.remark = data.remark || ''
      if (data.detailId) this.detailId = data.detailId
      if (tag === 'first') {
        this.durationOld = data.duration || 0
        this.getTime(this.durationOld)
      }
    },
    // 对答案
    async checkAnswer() {
      if (!this.selectResult.length) {
        // this.$modal.showToast('添加笔记成功！')
        return
      }
      this.stopIntervalFn()
      if (this.canClick) {
        this.canClick = false
        let obj = {
          courseId: this.courseid, // 大纲id
          questionId: this.questionId, // 试题id
          affiliationModule: this.affiliationModule, // 所属模块    0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点
          answer: this.answer, // 答案选项（A）
          questionsType: this.questionsType, // 题型分类 0 单选 1多选
          isReviewTask: this.isReviewTask, // 是否为复习任务  0 否  1是 
          duration: this.duration || 0, // 答题时长
        }
        if (this.isError) {
          obj.wrongType = 1
          obj.detailId = this.detailId //回答详情表id（错题提交专用）
        }
        let data
        if (this.type == '2') {
          // 数学
          data = await mathsdetail(obj)
          console.log("解析的参数-1", data.data.questionsAnalysis)

          this.answerInfo.questionsAnalysis = this.mathFormulaFn(data.data.questionsAnalysis)
          // const nodes = parse(this.RegExpFn(data.data.questionsAnalysis), {
          //   throwError: true,
          //   displayMode: true,
          // })
          // this.answerInfo.questionsAnalysis = nodes
          // console.log('nodes:', nodes)
        } else {
          // 政治
          data = await politicsdetail(obj)
          this.answerInfo.questionsAnalysis = data.data.questionsAnalysis
          this.haveNextWrongData = data.data.haveNextWrongData
        }
        // this.isCheckResult = true
        this.answerInfo.answer = data.data.answer
        this.answerInfo.answerOption = data.data.answerOption
        // this.answerInfo.questionsAnalysis = data.data.questionsAnalysis
        this.answerInfo.isCorrect = data.data.isCorrect
        setTimeout(() => {
          this.canClick = true
        }, 1500)
      }

    },
    // 新增笔记
    async addNote() {
      let obj = {
        questionid: this.questionId, // 试题id
        note: this.note // 笔记内容
      }
      if (!obj.note) {
        this.$modal.showToast('请输入笔记内容！')
        return
      }
      const { data } = await addNotes(obj)
      this.$refs.popup.close()
      this.note = ''
      this.$modal.showToast('添加笔记成功！')
      this.getMyNotes()
      this.getAllComment(0)
    },
    // 我的笔记列表
    async getMyNotes() {
      const { rows } = await selectMyNotesList(this.questionId)
      console.log('我的笔记列表', rows)
      this.myNotesList = rows
    },
    // 全部评论
    async getAllComment(type) {
      console.log('全部评论', type, this.zxOrRm)
      const { rows } = await selectNotesListByOrder({
        questionId: this.questionId,
        type: this.zxOrRm === 'zx' ? 0 : 1 // 0最新 1热点
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
    },
    appraiseFn(e) {
      console.log('输入框', this.note.length, e.detail.value.length)
      if (e.detail.value.length <= 500) {
        this.note = e.detail.value
      } else {
        this.note = e.detail.value.substring(0, 500)
      }
    },
    // 收藏题目
    async sctmFn() {
      await collect({
        questionid: this.questionId,
        collecttype: this.type,
        delFlag: this.collectStatus === '0' ? '2' : '0'  //0 收藏  2取消收藏
      })
      this.$modal.showToast('操作成功！')
      this.getOrderAndCountInfo()
    },
    // 题目纠错
    tmjcFn() {
      this.isJc = !this.isJc
      this.$tab.navigateTo('/pageSec/work/english/problemCorrection/problemCorrection?questionid=' + this.questionId)
    },
    // 点击答题卡
    dtkFn() {
      this.$refs.popupDtk.open()
    },
    // 点击上一题、下一题按钮
    async clickBtnFn(type) {
      console.log('this.affiliationModule: ', this.affiliationModule);
      // previous next
      // this.isCheckResult = !this.isCheckResult
      if (type === 'next') {
        this.pageType = 1
        this.stopIntervalFn()
        if (!this.isError && this.orderId === this.allCount) {
          this.$tab.redirectTo(`/pageSec/work/english/brushQuestionResults?courseOutlineType=${this.courseOutlineType}&courseId=${this.courseid}&isTask=${this.isReviewTask}&duration=${this.duration}&affiliationmodule=${this.affiliationModule}`)
          return
        }
        if (this.isError && !this.haveNextWrongData) {
          // 错题库进来的页面 && 没有下一题数据
          uni.navigateBack({
            delta: 2
          })
        }
        await this.getNextInfo()
        this.initPage()
        await this.getOrderAndCountInfo()
        return
      } else {
        // 上一题
        this.initPage()
        this.pageType = -1
        if (this.orderId <= 1) {
          this.$modal.msg('已经是第一题了')
          return
        }
      }

      await this.getNextInfo()
      await this.getOrderAndCountInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: $uni-color-primary-fz;
}

/deep/ .vue-ref {
  padding-bottom: 0 !important;
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
      .jcBox {
        width: 26rpx;
        height: 26rpx;
        margin-right: 13rpx;
      }

      @include flexBetween;

      .item {
        @include flexBetween;
        margin-right: 16rpx;
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

        // &:active {
        //   .iconfont {
        //     color: rgba(43, 199, 160, 1);
        //   }
        // }
      }
    }
  }
}

.check {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10rpx 30rpx 60rpx 30rpx;
  background: $uni-color-bg;

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
      margin-top: 100rpx;
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
    font-weight: 600;
    flex: 1;
    font-size: 32rpx;
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
  // margin: 32rpx 0;
  margin: 32rpx 0 0 0;
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
  overflow-x: scroll;
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
  bottom: 0;
  left: 0;
  padding: 32rpx;
  background: #fff;

  .question-btn-item {
    width: 330rpx;
    line-height: 80rpx;
    border-radius: 8rpx;
    text-align: center;
    height: 80rpx;
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

  .errorBtn {
    width: 690rpx;
    // height: 80rpx;
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
