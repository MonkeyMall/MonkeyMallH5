<template>
  <view class="wrap">
    <view class="result-title">
      <view class="result-title-text">{{ dataList.courseOutlineName }}</view>
      <view class="reslt-title-content">
        <view class="result-title-progress">
          <qiun-data-charts type="arcbar" :canvas2d="true" :opts="opts" :chartData="chartData" />
        </view>
        <view class="result-title-detail">
          <view class="result-title-detail-txt">本次正确率</view>
          <view v-if="Number(compareRate)==0&&Number(chartData.series[0].data)==1" class="result-title-detail-txt mTop16">
            继续加油！
          </view>
          <view v-else class="result-title-detail-txt mTop16">较上次:{{ dataList.compareRate || 0 }}
            <i v-if="(compareRate < 0)" class="iconfont rotateBox">&#xe669;</i>
            <i v-else class="iconfont">&#xe669;</i>
          </view>
        </view>
      </view>
  
    </view>
    <view class="result-tips">
      如果一定有人要成功，那为什么不能是你
    </view>
    <view class="result-dtk">
      <view class="result-dtk-top">
        <view class="result-dtk-top-flexBox">
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/english/study-stjg.png" />
          <view class="result-dtk-top-txt">答题卡</view>
        </view>
        <view class="result-dtk-top-flexBox mTol38">
          <i class="result-circle"></i>
          <text class="result-dtk-txt">未答</text>
          <i class="result-circle greenBox"></i>
          <text class="result-dtk-txt">答对</text>
          <i class="result-circle redBox"></i>
          <text class="result-dtk-txt result-dtl-finillyTxt">答错</text>
        </view>
      </view>
      <view class="result-dtk-content">
        <view>
          <view v-if="dataList.singleList && dataList.singleList.length > 0">
            <view class="result-dtk-content-txt">单选题</view>
            <view class="result-dtk-content-content">
              <i :class="row.className" v-for="(row, i) in dataList.singleList" :key="i">{{ row.order_id }}</i>
            </view>
          </view>
          <view v-if="dataList.moreList && dataList.moreList.length > 0" style="margin-bottom: 100rpx;">
            <view class="result-dtk-content-txt">多选题</view>
            <view class="result-dtk-content-content">
              <i :class="row.className" v-for="(row, i) in dataList.moreList" :key="i">{{ row.order_id }}</i>
            </view>
          </view>
  
        </view>
      </view>
    </view>
    <view class="question-btns">
      <view class="question-btn-item next" @click="clickBtnFn('again')">再复习一次</view>
      <view class="question-btn-item next" @click="clickBtnFn()">
        <!-- <view
                                                                  class="question-btn-item next"
                                                                >分享朋友圈</view> -->
        <Button class="question-btn-item next btnBox w204" open-type="share">分享朋友圈</Button>
      </view>
    </view>
  </view>
</template>
<script>
import { selectAnswerDetailList } from '@/api/work/english'
// import qiunDataCharts from '@/pageSec/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'

export default {
  components: {},
  data() {
    return {
      duration: '',
      compareRate: 0,
      chartData: {},
      opts: {
        color: ["#FC515F", "#FC515F"],
        padding: undefined,
        title: {
          name: "80%",
          fontSize: 12,
          color: "#333333"
        },
        subtitle: {
          name: "",
          fontSize: 12,
          color: "#333333"
        },
        extra: {
          arcbar: {
            type: "circle",
            width: 10,
            backgroundColor: "#FFF7F8",
            startAngle: 1.5,
            endAngle: 0.25,
            gap: 2,
            lineCap: "butt",
            borderColor: '#FC515F'
          }
        }
      },
      percent: 80,
      formObj: {
        courseId: '', //大纲id
        isTask: '', //是否为复习任务  0 否  1是
        courseOutlineType: '', // 0 政治  2数学
        affiliationModule: '', // 所属模块    0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点
      },

      dataList: [
        {
          title: '单选题',
          list: [
            {
              value: '1',
              className: 'greenBox'
            },
            {
              value: '2',
              className: 'greyBox'
            },
            {
              value: '3',
              className: 'redBox'
            },
            {
              value: '4',
              className: 'greenBox'
            },
            {
              value: '5',
              className: 'greenBox'
            },
            {
              value: '6',
              className: 'greenBox'
            },
            {
              value: '7',
              className: 'greenBox'
            },
            {
              value: '8',
              className: 'greenBox'
            },
            {
              value: '9',
              className: 'greenBox'
            }
          ]
        }
      ]
    }
  },
  //分享到朋友圈
  // onShareTimeline(res) {
  //     console.log('res: ', res);
  //       return {
  //           title: '考研一起卷',
  //           type: 0,
  //           path: '/pages/index',
  //       }
  //   },
  onLoad(options) {
    console.log('options: ', options);
    this.formObj.courseId = options.courseId
    this.formObj.isTask = options.isTask
    this.formObj.courseOutlineType = options.courseOutlineType
    this.duration = options.duration || ''
    this.formObj.affiliationModule = options.affiliationmodule
  },
  mounted() {
    this.selectAnswerDetailListFn()
  },
  methods: {
    selectAnswerDetailListFn() {
      selectAnswerDetailList({
        ...this.formObj,
        duration: this.duration || ''
      }).then(res => {
        if (res.code === 200) {
          if (res.data) {
            // currentRate外边圈的占比
            // currentRate2内圈数字
            let currentRate = parseFloat(res.data.currentRate).toFixed(2)
            let currentRate2 = Math.round(currentRate * 100)
            setTimeout(() => {
              let res = {
                series: [
                  {
                    name: "",
                    data: currentRate
                  }
                ]
              };
              this.chartData = JSON.parse(JSON.stringify(res));
            }, 500);
            this.opts.title.name = currentRate2 + '%'
            res.data.singleList.forEach(item => {
              if (item.is_correct === '0') {
                //是否正确  0错误1正确
                item.className = 'redBox'
              } else {
                item.className = 'greenBox'
              }
            })
            res.data.moreList.forEach(item => {
              if (item.is_correct === '0') {
                //是否正确  0错误1正确
                item.className = 'redBox'
              } else {
                item.className = 'greenBox'
              }
            })
            this.compareRate = res.data.compareRate.split('%')[0] || 0
            this.dataList = res.data
          }
        }
      })
    },
    clickBtnFn(type) {
      if (type === 'again') {
        console.log('this.formObj------', this.formObj)
        // this.formObj.courseId
        const pages = getCurrentPages()
        // 当前页面
        const nowPage = pages[pages.length - 1]
        //上一页面
        const prevPage = pages[pages.length - 2]
        prevPage.$vm.courseId = this.formObj.courseId
        prevPage.$vm.againStydyAuto = true
        prevPage.$vm.affiliationModule = this.formObj.affiliationModule
        prevPage.$vm.courseOutlineType = this.formObj.courseOutlineType

        uni.navigateBack({
          delta: 1
        });
      } else {
        uni.share({
          provider: "weixin",
          scene: "WXSceneSession",
          type: 1,
          summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
          success: function (res) {
            console.log("success:" + JSON.stringify(res));
          },
          fail: function (err) {
            console.log("fail:" + JSON.stringify(err));
          }
        });
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 24rpx 30rpx;
  min-height: 100vh;
  background: $uni-color-bg;

  .result-title {
    height: 272rpx;
    border-radius: 16rpx;
    background: $uni-bg-color;

    .result-title-text {
      font-size: 26rpx;
      font-weight: 600;
      color: $uni-text-color;
      padding: 32rpx 16rpx;
    }

    .reslt-title-content {
      display: flex;
      justify-content: center;
    }

    .result-title-progress {
      position: relative;
      width: 146rpx;
      height: 146rpx;
    }

    .result-title-detail {
      margin-top: 30rpx;
      margin-left: 62rpx;

      .result-title-detail-txt {
        font-size: 26rpx;
        font-weight: 600;
        color: $uni-text-color;
      }

      .mTop16 {
        margin-top: 20rpx;
      }

      .iconfont {
        transform: rotate(95deg);
        color: $uni-text-color-placeholder;
        margin-left: 20rpx;
      }

      .rotateBox {
        transform: rotate(220deg);
      }
    }
  }

  .test-container {
    width: 100px;
    height: 150px;
    margin: 50px auto;
  }

  .containerring _div {
    width: 145rpx;
    height: 145rpx;
  }

  /deep/ .containerring _div {
    width: 145rpx;
    height: 145rpx;
  }

  /deep/ .proportion _div {
    width: 120rpx;
    height: 120rpx;
  }

  .result-tips {
    height: 80rpx;
    background: $uni-color-english-pickerColor;
    border-radius: 16rpx;
    margin-top: 24rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 26rpx;
    font-weight: 600;
    color: $uni-text-color;
  }

  .result-dtk {
    min-height: 724rpx;
    border-radius: 16rpx;
    background: $uni-bg-color;
    margin-top: 24rpx;

    .result-dtk-top {
      display: flex;
      justify-content: space-between;
      height: 110rpx;

      image {
        width: 32rpx;
        height: 32rpx;
        margin: 39rpx 16rpx;
      }

      .result-dtk-top-flexBox {
        display: flex;

        .result-dtk-top-txt {
          margin-top: 32rpx;
          font-size: 32rpx;
          font-weight: 600;
          color: $uni-text-color;
        }

        text {
          font-size: 26rpx;
          font-weight: 600;
          color: $uni-text-color;
        }
      }

      .mTol38 {
        margin-top: 38rpx;
        align-items: baseline;

        .result-dtk-txt {
          margin-right: 32rpx;
          margin-left: 8rpx;
        }

        .result-dtl-finillyTxt {
          margin-right: 16rpx;
          margin-left: 8rpx;
        }
      }

      .redBox {
        background: $uni-text-color-placeholder !important;
      }

      .greenBox {
        background: $uni-color-fz !important;
      }

      .result-circle {
        width: 18rpx;
        height: 18rpx;
        border-radius: 100rpx;
        background: #f6f8fd;
      }
    }

    .result-dtk-content {
      .result-dtk-content-txt {
        font-size: 28rpx;
        font-weight: 400;
        color: $uni-text-color-grey;
        text-indent: 16rpx;
      }

      .result-dtk-content-content {
        display: flex;
        flex-wrap: wrap;
        margin: 16rpx;

        i {
          width: 56rpx;
          height: 56rpx;
          opacity: 1;
          border-radius: 100rpx;
          background: $uni-color-fz;
          margin: 32rpx;
          text-align: center;
          line-height: 56rpx;
          color: $uni-text-color-inverse;
        }

        .greenBox {
          background: $uni-color-fz;
        }

        .greyBox {
          background: $uni-color-bg;
          color: $uni-text-color-grey;
        }

        .redBox {
          background: $uni-text-color-placeholder;
        }
      }
    }
  }

  .question-btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    font-weight: 600;
    position: fixed;
    left: 0;
    padding: 20rpx 30rpx 30rpx 30rpx;
    bottom: 0;
    background: $uni-color-bg;

    .question-btn-item {
      width: 330rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 50rpx;
    }

    .previous {
      color: $uni-color-primary;
      border: 2px solid $uni-color-primary;
      background: $uni-color-primary-fz;
    }

    .next {
      color: $uni-color-primary-fz;
      background: $uni-color-primary;
      // border: 2px solid $uni-color-primary;
    }

    .btnBox {
      background: $uni-color-primary;
      width: 280rpx;
      color: $uni-color-primary-fz;
      border: none;
      border-radius: 200rpx;
    }
  }
}
</style>
