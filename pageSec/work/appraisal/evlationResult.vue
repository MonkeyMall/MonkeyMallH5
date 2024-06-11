<template>
  <view class="evalution">
    <view class="evalution-header">
      <view class="charts-box">
        <qiun-data-charts type="arcbar" :canvas2d="true" :opts="opts" :chartData="chartData" />
      </view>
      <view class="evalution-header-tit">{{ infoData.examinationName }}</view>
      <view class="evalution-header-date">报告生成时间: {{ infoData.submitTime }}</view>
    </view>
    <view class="evalution-cons">
      <view class="evalution-cons-tit">
        <i class="iconfont">&#xe63a;</i>
        本次答题
      </view>
      <view class="evalution-cons-list">
        <view class="evalution-cons-list-item">
          <view class="evalution-cons-list-item-tit">一共</view>
          <view class="evalution-cons-list-item-num">{{ infoData.allNum }}题</view>
        </view>
        <view class="evalution-cons-list-item">
          <view class="evalution-cons-list-item-tit">答对</view>
          <view class="evalution-cons-list-item-num success">{{ infoData.rSingleCount + infoData.rManyCount }}题</view>
        </view>
        <view class="evalution-cons-list-item">
          <view class="evalution-cons-list-item-tit">答错</view>
          <view class="evalution-cons-list-item-num error">{{ infoData.wSingleCount + infoData.wManyCount }}题</view>
        </view>
        <view class="evalution-cons-list-item">
          <view class="evalution-cons-list-item-tit">未答</view>
          <view class="evalution-cons-list-item-num error">{{ infoData.allNum - infoData.rSingleCount -
            infoData.rManyCount
            - infoData.wSingleCount - infoData.wManyCount }}题</view>
        </view>
        <view class="evalution-cons-list-item">
          <view class="evalution-cons-list-item-tit">总用时</view>
          <view class="evalution-cons-list-item-num">{{ infoData.duration || 0 }}min</view>
        </view>
      </view>
      <view class="evalution-cons-label">
        单选题
      </view>
      <view class="evalution-cons-des">
        共{{ infoData.radioNumber }}题，答对{{ infoData.rSingleCount }}题，答错{{ infoData.wSingleCount }}题
      </view>
      <view class="evalution-cons-label">
        多选题
      </view>
      <view class="evalution-cons-des">
        共{{ infoData.multipleChoiceNumber }}题，答对{{ infoData.rManyCount }}题，答错{{ infoData.wManyCount }}题
      </view>
    </view>

    <view class="btns">
      <button type="primary" class="allQues question-btn-item next cu-btn" @click="anysys('all')">全部解析</button>
      <button type="primary" class="errorQues question-btn-item next cu-btn" @click="anysys('error')">错题解析</button>
    </view>
  </view>
</template>
<script>
import { selectAnswerInfoUpdateType } from '@/api/work/evaluation.js'
// import qiunDataCharts from '@/pageSec/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
export default {
  components: {},
  data() {
    return {
      infoData: null,
      chartData: {},
      examinationId: '',
      courseOutlineType: 0,
      //您可以通过修改 config-ucharts.js 文件中下标为 ['arcbar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["rgb(252, 81, 95)"],
        padding: undefined,
        title: {
          fontSize: 25,
          color: "#000000"
        },
        subtitle: {
          name: "得分",
          fontSize: 12,
          color: "rgb(51, 51, 51)"
        },
        extra: {
          arcbar: {
            type: "circle",
            width: 12,
            backgroundColor: "rgb(255, 247, 248)",
            startAngle: 1.5,
            endAngle: 0.25,
            gap: 2
          }
        }
      }
    }
  },
  onLoad(options) {
    this.examinationId = options.examinationId
    this.courseOutlineType = options.courseOutlineType
    this.getServerData(options.examinationId)
  },
  mounted() {

  },
  methods: {
    async getServerData(examinationId) {
      const { data } = await selectAnswerInfoUpdateType(examinationId)
      this.infoData = data
      if (this.infoData.duration) {
        this.infoData.duration = (parseFloat(this.infoData.duration) / 60).toFixed(2)
      } else {
        this.infoData.duration = 0
      }

      let res = {
        series: [
          {
            name: "",
            data: data.score / 100
          }
        ],
      }
      this.opts.title.name = String(data.score)
      this.chartData = JSON.parse(JSON.stringify(res));
    },
    anysys(type) {
      if (type === 'all') {
        this.$tab.navigateTo(
          `/pageSec/work/appraisal/analysis?examinationId=${this.examinationId}&pageType=allQuestion&courseOutlineType=${this.courseOutlineType}`
        )
      } else {
        this.$tab.navigateTo(
          `/pageSec/work/appraisal/analysis?examinationId=${this.examinationId}&pageType=errorQuestion&courseOutlineType=${this.courseOutlineType}`
        )
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.charts-box {
  width: 180rpx;
  height: 180rpx;
  margin: 32rpx auto 40rpx;
}

.evalution {
  min-height: 100vh;
  background: rgb(246, 248, 253);
  padding: 32rpx 30rpx;

  &-header {
    width: 690rpx;
    height: 369rpx;
    padding: 0 16rpx;
    border-radius: 16rpx;
    background: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;

    &-tit {
      font-size: 24rpx;
      margin-bottom: 24rpx;
      color: rgba(51, 51, 51, 1);
    }

    &-date {
      font-size: 24rpx;
      color: rgba(153, 153, 153, 1);
    }
  }

  &-cons {
    width: 690rpx;
    height: 540rpx;
    border-radius: 16rpx;
    margin-top: 32rpx;
    padding: 34rpx 16rpx;
    background: rgb(255, 255, 255);

    &-tit {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);

      .iconfont {
        font-size: 24rpx;
        color: rgb(252, 81, 95);
        margin-right: 10rpx;
      }
    }

    &-list {
      display: flex;
      justify-content: space-between;
      padding: 33rpx 0;
      flex: 1;
      border-radius: 8rpx;
      margin-top: 33rpx;
      background: rgb(246, 248, 253);

      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        position: relative;

        &-tit {
          margin-bottom: 25rpx;
          font-size: 24rpx;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }

        &-num {
          font-weight: 600;

          &.success {
            color: rgba(43, 199, 160, 1);
          }

          &.error {
            color: rgba(252, 81, 95, 1);
          }
        }

        &:not(:last-child):after {
          content: '';
          display: block;
          width: 2rpx;
          height: 42rpx;
          background: rgb(214, 214, 214);
          position: absolute;
          top: 50%;
          right: 0;
          margin-top: -21rpx;
        }
      }
    }

    &-label {
      padding: 0 22rpx;
      font-size: 24rpx;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      position: relative;
      margin-top: 26rpx;

      &::before {
        content: '';
        display: block;
        width: 6rpx;
        height: 30rpx;
        border-radius: 188px;
        background: rgb(252, 81, 95);
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -15rpx;
      }
    }

    &-des {
      font-size: 24rpx;
      font-weight: 400;
      margin-top: 24rpx;
      color: rgba(153, 153, 153, 1);
    }
  }

  .btns {
    // width: 100%;
    padding: 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 50rpx;
    left: 0;

    .allQues {
      width: 330rpx;
      height: 80rpx;
      border-radius: 8rpx;
      font-size: 32rpx;
      font-weight: 600;
      line-height: 80px;
      color: rgba(252, 81, 95, 1);
      text-align: center;
      border: 2rpx solid rgb(252, 81, 95);
      margin-right: 30rpx;
      background: rgb(246, 248, 253);
    }

    .errorQues {
      width: 330rpx;
      height: 80rpx;
      border-radius: 8rpx;
      font-size: 32rpx;
      font-weight: 600;
      line-height: 80px;
      color: #ffffff;
      text-align: center;
      background: rgb(252, 81, 95);
    }
  }
}
</style>
