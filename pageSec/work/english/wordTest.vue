<!-- 对答案页面 -->
<template>
  <view class="wrap">
    <view class="mBotom80">
      <view class="wordTest-top">
        <view class="w33" v-if="type != 'wrongWord'">
          <view :class="type === 'wordTest' ? 'w33-title-active' : 'w33-title'">
            今日新词进度
          </view>
          <view class="w33-num">
            <view :class="type == 'wordTest' ? 'blockBox redBox' : 'blockBox blackBox'">{{ topObj.toayOverWordCount || 0 }}
            </view>
            <view class="blockBox absoluteBox">/{{ everydaywordnum || 0 }}</view>
          </view>
        </view>
        <view class="w33" v-if="type != 'wrongWord'">
          <view :class="type === 'reviewWord' ? 'w33-title-active' : 'w33-title'">
            今日复习
          </view>
          <view class="w33-num">
            <view :class="type == 'reviewWord' ? 'blockBox greenBox' : 'blockBox blackBox'">{{ topObj.todayReviewCount || 0 }}
            </view>
            <view class="blockBox absoluteBox">/{{ todayreviewwordnum || 0 }}</view>
          </view>
        </view>
        <view class="w33" v-if="type === 'wrongWord'">
          <view :class="type === 'reviewWord' ? 'w33-title-active' : 'w33-title'">
            错词总数
          </view>
          <view class="w33-num">
            <view class="blockBox" style="font-size: 32rpx;">{{ total || 0 }}</view>
          </view>
        </view>
        <view class="w33">
          <view class="w33-title">
            学习时间
          </view>
          <view class="w33-num">
            <view class="blockBox redBox">{{ time }}</view>
          </view>
        </view>
      </view>
      <progress class="wordTest-progress"
        :percent="((type === 'wordTest' ? topObj.toayOverWordCount / everydaywordnum : topObj.todayReviewCount / todayreviewwordnum) * 100) || 0"
        backgroundColor="rgb(255,247,248)" activeColor="rgb(252,81,95)" stroke-width="8" border-radius="5" />
    </view>

    <view class="word-word">
      <view class="word-word-name">{{ wordObj.wordName }}</view>
      <view class="word-word-pronunciation" @click="voicePlay(wordObj.wordName)">
        <i class="blockBox beautiBox">美</i>
        {{ wordObj.wordSoundMark }}
        <view class="trumpet-div">
          <view class="box">
            <view class="trumpet-back"></view>
            <view class="trumpet-forward"></view>
            <view class="wifi-symbol">
              <view :class="isShowLabaActive ? 'line first-active' : 'line first'"></view>
              <view :class="isShowLabaActive ? 'line second-active' : 'line second'"></view>
              <view :class="isShowLabaActive ? 'line third-active' : 'line third'"></view>
            </view>
          </view>
        </view>
        <!-- <i class="iconfont blockBox soundBox">&#xea11;</i> -->
      </view>
      <view :class="[isJc ? 'jc' : '', 'wrongBox']" @click="tmjcFn">
        <image class="jcBox" v-show="!isJc"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/jc-01.svg"></image>
        <!-- <i
          class="iconfont"
          v-show="isJc"
        >&#xe60f;</i> -->
        <!-- <i
          class="iconfont"
          v-show="!isJc"
        >&#xe619;</i> -->
        <image class="jcBox" v-show="isJc"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/jc-02.svg"></image>
        题目纠错
      </view>
      <view class="word-word-answer">
        <view v-for="(item, index) in answerList" :key="index"
          :class="item.isCheck ? 'word-word-item-active' : 'word-word-item'" @click="checkChange(item, index)">{{ item.title }}
        </view>
      </view>
    </view>
    <button v-if="!isShowAnswer" :class="isDisabled ? 'word-btn-disabled cu-btn' : 'word-btn cu-btn'"
      @click="toCompareAnswer">对答案</button>
    <view v-if="isShowAnswer">
      <view class="question-ok error">
        <view :class="isAnswerTrue ? 'isOk' : 'isFalse'">{{ isAnswerTrue ? "回答正确" : "回答错误" }}</view>
        <view class="isOk-item">正确答案：<text>{{ wordObj.answerOption }}</text></view>
        <view :class="isAnswerTrue ? 'isOk-item answerX' : 'isOk-item answerY'">你的答案：<text>{{ answerVal }}</text></view>
      </view>
      <view class="word-detail">
        <!-- <view class="detail-wordMean">{{ wordMean  }}</view> -->

        <uv-parse :content="wordMean"></uv-parse>
        <uv-parse :content="content"></uv-parse>
      </view>
      <!-- 下一题按钮 -->
      <view class="question-btns">
        <view class="question-btn-item previous" @click="clickBtnFn('add')">加到复习本</view>
        <view class="question-btn-item next" @click="clickBtnFn('next')">下一个</view>
      </view>
    </view>
  </view>
</template>
<script>
import { defaultMixins } from '@/mixins/index'
import { getNextWord, addTask, selectWordTestInfo, updateDuration, selectPlanByUserId, englishdetail } from '@/api/work/english'
export default {
  mixins: [defaultMixins],
  data() {
    return {
      answerVal: '',
      isAnswerTrue: false,
      topObj: {},
      wordObj: {},
      type: '',
      isJc: false,
      isDisabled: true,
      progress: 0,
      content: '', //详情
      wordMean: '', //释义
      answer: false,
      isShowAnswer: false,
      answerList: [],
      hasAdd: false,
      todayreviewwordnum: 0, //复习进度
      everydaywordnum: 0, //新词进度
      wrongType: '', //是否是错题
      total: 0,
      questionId: '',  //题id
      pageType: 0, //下一页
      detailId: '',
      isShowLabaActive: false, //是否开始播放
      canClick: true, //是否可以点击
      haveNextWrongData: 1 //错词本 是否有下一题数据
    }
  },
  onLoad(options) {
    console.log('options: ', options);
    console.log(options.pageName)
    this.type = options.pageName
    this.wrongType = options.wrongType
    this.total = options.total
    this.questionId = options.questionId
    this.pageType = options.pageType
    uni.setNavigationBarTitle({
      title: options.pageName === 'reviewWord' ? '复习单词' : '单词测试'
    })
    this.selectNextWordFn('first')


  },
  onShow() {
    this.isJc = false
  },
  mounted() {
    this.isDisabled = true
    // this.selectWordTestInfoFn()
    this.selectPlanByUserIdFn()
    // this.start()
  },
  filters: {
    formatRule(val) {
      return val.replace(/\/n/g, '\n')
    }
  },
  methods: {
    // 查顶部数据
    // selectWordTestInfoFn(){
    //   selectWordTestInfo().then(res => {
    //     if (res.code === 200) {
    //       this.topObj = res.data
    //     }
    //   })
    // },
    // 获取顶部总复习任务个数 和总新词学习任务
    selectPlanByUserIdFn() {
      selectPlanByUserId().then(res => {
        if (res.code === 200) {
          console.log('res: ', res);
          this.everydaywordnum = res.data.everydaywordnum
          this.todayreviewwordnum = res.data.todayreviewwordnum
          console.log('this.topObj: ', this.topObj);
        }
      })
    },
    // 查单词列表
    selectNextWordFn(type) {
      console.log(this.wrongType, 'this.wrongType')
      let obj = {
        subjectType: 1,
        type: this.type == 'reviewWord' ? '1' : '0',
        wrongType: this.wrongType,
        duration: this.duration,
      }
      if (this.wrongType == 1) {
        obj.questionId = this.questionId
        obj.pageType = this.pageType
      }
      getNextWord({
        ...obj
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          if (res.data && res.data.id) {
            this.topObj.toayOverWordCount = res.data.todayOrderId
            this.everydaywordnum = res.data.todayAllCount
            this.topObj.todayReviewCount = res.data.reviewOrderId
            this.todayreviewwordnum = res.data.reviewAllCount
            this.wordObj = res.data
            this.questionId = res.data.id
            this.detailId = res.data.detailId
            this.answerList = [
              {
                title: `A  ${res.data.questionsOptionA}`,
                isCheck: false,
                value: 'A'
              },
              {
                title: `B  ${res.data.questionsOptionB}`,
                isCheck: false,
                value: 'B'
              },
              {
                title: `C  ${res.data.questionsOptionC}`,
                isCheck: false,
                value: 'C'
              },
              {
                title: `D  ${res.data.questionsOptionD}`,
                isCheck: false,
                value: 'D'
              },
            ]
          } else {
            uni.showToast({
              title: "恭喜您完成此次刷题～  阳光万里，终将上岸",
              icon: 'none',
            })
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 1000)
          }
          if (type === 'first') {
            this.durationOld = res.data.duration || 0
            console.log('this.durationOld: ', this.durationOld);
            this.getTime(this.durationOld)
          }
        }
      })
    },
    checkChange(row, index) {
      this.answerList.forEach(item => {
        item.isCheck = false
      })
      this.isDisabled = false
      this.answerList[index].isCheck = true
    },
    clickBtnFn(type) {
      // add加到复习本  next下一题
      if (type === 'add') {
        this.addFxbFn()

      } else if (type === 'next') {
        this.stopIntervalFn()
        console.log(this)
        if (this.type === 'wordTest') {
          // 新词

          if (this.everydaywordnum === this.topObj.toayOverWordCount) {
            uni.showToast({
              title: "恭喜您完成此次刷题～  阳光万里，终将上岸",
              icon: 'none',
            })
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 1000)
            return
          }
        }
        else if (this.type === 'reviewWord') {
          // 复习
        } else {
          if (this.type === 'wrongWord') {// 错题
            if (!this.haveNextWrongData) {
              uni.showToast({
                title: "没有题了",
                icon: 'none',
              })
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1
                });
              }, 1000)
              return
            }


          }
        }
        this.pageType = 1
        this.isDisabled = true
        this.selectNextWordFn()
        this.isShowAnswer = false
      }

      // this.$tab.navigateTo('/pageSec/work/english/brushQuestionResults')

    },
    toCompareAnswer() {
      this.stopIntervalFn()

      console.log(this.isDisabled)
      if (this.isDisabled) {
        return
      }
      if (this.canClick) {
        this.canClick = false
        this.answerList.forEach(item => {
          if (item.isCheck) {
            this.answerVal = item.value

          }
        })
        // let duration = this.minute * 60 + this.second
        let obj = {
          questionId: this.wordObj.id,
          answer: this.answerVal,
          questionsType: this.wordObj.questionsType,
          isReviewTask: this.type === 'reviewWord' ? '1' : '0',
          duration: this.duration,
        }
        if (this.wrongType == 1) {
          obj.detailId = this.detailId
          obj.wrongType = this.wrongType
        }
        englishdetail({
          ...obj
        }).then(res => {
          if (res.code === 200) {
            console.log('res: ', res);
            this.wordMean = res.data.wordMean || ''
            this.isAnswerTrue = (+res.data.isCorrect === 1 ? true : false)
            this.isShowAnswer = true
            this.wordObj.answerOption = res.data.answerOption
            this.content = res.data.questionText
            this.haveNextWrongData = res.data.haveNextWrongData
          }
        })
        setTimeout(() => {
          this.canClick = true
        }, 1500)
      }

      // updateDuration({
      //   duration: duration,
      //   istask: this.type === 'reviewWord' ? '1' : '0'
      // }).then(res => {
      //   if (res.code === 200) {
      //     console.log(res)
      //   }
      // })

      // if(this.answerVal === this.wordObj.answerOption){
      //   //  答对
      //   console.log('答对了')
      //   this.isAnswerTrue = true
      // }else{
      //   // 答错
      //   this.isAnswerTrue = false
      // }
      // this.isShowAnswer = true
    },
    addFxbFn() {
      addTask({
        questionid: this.wordObj.id
      }).then(res => {
        if (res.code === 200) {
          this.hasAdd = true
          uni.showToast({
            title: "添加成功",
            icon: 'none',
          })
        }
      })

    },
    voicePlay(val) {
      this.isShowLabaActive = true
      console.log('val: ', val);
      const innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      let str = 'http://dict.youdao.com/dictvoice?type=0&audio=' + val
      console.log('str: ', str);
      innerAudioContext.src = str
      innerAudioContext.onPlay(() => {
        console.log('开始播放');
      });
      setTimeout(() => {
        this.isShowLabaActive = false
      }, 2000)

      innerAudioContext.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
    },
    // 题目纠错
    tmjcFn() {
      this.isJc = !this.isJc
      console.log('走这里欸有')
      this.$tab.navigateTo('/pageSec/work/english/problemCorrection/problemCorrection?questionid=' + this.wordObj.id)
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 30rpx;
  min-height: 100vh;
  background: $uni-bg-color;

  .mBotom80 {
    margin-bottom: 80rpx;
  }

  .wordTest-top {
    display: flex;
    justify-content: space-between;

    .w33 {
      width: 33%;

      .w33-title {
        text-align: center;
        font-size: 26rpx;
        color: $uni-text-color-grey;
        font-weight: 600;
      }

      .w33-title-active {
        text-align: center;
        font-size: 26rpx;
        color: $uni-text-color;
        font-weight: 600;
      }

      .w33-num {
        position: relative;
        margin-top: 17rpx;
        text-align: center;
        font-size: 24rpx;
        font-weight: 600;
        color: $uni-text-color;

        .absoluteBox {
          position: absolute;
          top: 14rpx;
        }

        .redBox {
          color: $uni-text-color-placeholder;
          font-size: 32rpx;
          font-weight: 600;
          margin-right: 8rpx;
        }

        .blockBox {
          display: inline-block;
        }

        .greenBox {
          color: $uni-color-fz;
          font-size: 32rpx;
          font-weight: 600;
          margin-right: 8rpx;
        }

        .blackBox {
          color: $uni-text-color-blank;
          font-size: 32rpx;
          font-weight: 600;
          margin-right: 8rpx;
        }
      }
    }
  }

  .wordTest-progress {
    margin-top: 32rpx;
  }

  .word-word {
    .word-word-name {
      height: 140rpx;
      font-size: 100rpx;
      font-weight: 600;
      color: $uni-text-color;
      line-height: 140rpx;
      text-align: center;
      margin: auto;
      @include overline(1);
    }

    .word-word-pronunciation {
      margin-top: 24rpx;
      text-align: center;
      font-size: 28rpx;
      font-weight: 600;

      .blockBox {
        display: inline-block;
      }

      .beautiBox {
        width: 44rpx;
        height: 44rpx;
        border-radius: 8rpx;
        border: 2rpx solid $uni-text-color-grey;
        line-height: 44rpx;
        text-align: center;
        font-size: 26rpx;
        color: $uni-text-color;
        margin-right: 16rpx;
      }

      .iconfont {
        font-size: 30rpx;
        margin-left: 16rpx;
      }

      .soundBox {
        color: $uni-text-color-placeholder;
      }
    }

    .jc {
      .iconfont {
        color: rgba(43, 199, 160, 1);
      }
    }

    .wrongBox {
      display: flex;
      align-items: center;
      float: right;
      text-align: right;
      margin-top: -45rpx;
      font-size: 26rpx;
      color: $uni-text-color;
      font-weight: 400;

      .mRig11 {
        margin-right: 11rpx;
      }
    }

    .jcBox {
      width: 26rpx;
      height: 26rpx;
    }

    .word-word-answer {
      margin-top: 84rpx;

      .word-word-item {
        width: 100%;
        height: 104rpx;
        border-radius: 16rpx;
        background: $uni-text-color-inverse;
        border: 2rpx solid $uni-text-color-grey;
        line-height: 104rpx;
        text-indent: 33rpx;
        margin-bottom: 32rpx;
        color: $uni-text-color;
        @include overline(1);
      }

      .word-word-item-active {
        width: 100%;
        height: 104rpx;
        border-radius: 16rpx;
        background: $uni-color-english-active;
        border: 2rpx solid $uni-color-english-active;
        line-height: 104rpx;
        text-indent: 33rpx;
        margin-bottom: 32rpx;
        color: $uni-color-fz;
        @include overline(1);
      }
    }
  }

  .word-btn {
    width: 690rpx;
    height: 80rpx;
    opacity: 1;
    border-radius: 16rpx;
    background: $uni-text-color-placeholder;
    color: $uni-text-color-inverse;
    font-size: 32rpx;
    font-weight: 600;
    margin-top: 48rpx;
  }

  .word-btn-disabled {
    width: 100%;
    height: 80rpx;
    opacity: 1;
    border-radius: 16rpx;
    font-size: 32rpx;
    font-weight: 600;
    margin-top: 48rpx;
    background: $uni-gray-color-border;
    color: $uni-text-color-inverse;
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
        background: $uni-color-fz;
        font-size: 32rpx;
      }

      .answerY {
        text {
          color: $uni-color-primary;
          font-size: 32rpx;
        }
      }

      .answerX {
        text {
          color: $uni-color-fz;
          font-size: 32rpx;
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

    .isFalse {
      width: 150rpx;
      line-height: 56rpx;
      text-align: center;
      opacity: 1;
      border-radius: 16rpx 0px 16rpx 0rpx;
      background: $uni-color-primary;
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
      }
    }

    .isOk-item {
      font-size: 32rpx;
      flex: 1;
      // @include alignCenter;
    }

    text {
      color: $uni-color-fz;
    }
  }

  .word-detail {
    line-height: 50rpx;
    margin-top: 32rpx;
    min-height: 700rpx;
    margin-bottom: 150rpx;

  }

  .detail-wordMean {
    white-space: pre-line;
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
    }

    .previous {
      color: $uni-color-primary;
      border: 2px solid $uni-color-primary;
      background: $uni-bg-color;
    }

    .next {
      color: $uni-color-primary-fz;
      background: $uni-color-primary;
      border: 2px solid $uni-color-primary;
    }
  }

  .trumpet-div {
    height: 100%;
    display: inline-block;
    transform: scale(0.55);

    .box {
      height: 100%;
      display: flex;
      align-items: center;

      .trumpet-back {
        height: 12px;
        width: 8px;
        background-color: $uni-color-primary;
        z-index: 1;
      }

      .trumpet-forward {
        width: 0;
        /*设置宽高为0，所以div的内容为空，从才能形成三角形尖角*/
        height: 0;
        border-bottom: 15px solid $uni-color-primary;
        border-left: 15px solid transparent;
        /*transparent 表示透明*/
        border-right: 15px solid transparent;
        transform: rotateZ(-90deg);
        margin-left: -16px;

      }

      .wifi-symbol {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 26px;
        margin-left: -4px;

        .line {
          width: 10px;
          height: 2px;
          background-color: $uni-color-primary;
          border-radius: 1px;
        }

        .first {
          transform: rotateZ(-30deg);
          // animation: fadeInOut 1s infinite 0.2s;
        }

        .first-active {
          transform: rotateZ(-30deg);
          animation: fadeInOut 0.8s infinite 0.2s;
        }

        .second {
          // animation: fadeInOut 1s infinite 0.4s;
        }

        .second-active {
          animation: fadeInOut 0.8s infinite 0.3s;
        }

        .third {
          transform: rotateZ(30deg);
          // animation: fadeInOut 1s infinite 0.4s;
        }

        .third-active {
          transform: rotateZ(30deg);
          animation: fadeInOut 0.8s infinite 0.4s;
        }

      }

    }
  }

  /*动画*/
  @keyframes fadeInOut {
    0% {
      opacity: 0;
      /*初始状态 透明度为0*/
    }

    50% {
      opacity: 0.5;
      /*初始状态 透明度为0*/
    }

    100% {
      opacity: 1;
      /*结尾状态 透明度为1*/
    }
  }
}</style>