<template>
  <view class="page">
    <image
      src="https://yhpn-project-1320305021.cos.ap-beijing.myqcloud.com/mini/static/work/examination/topR.png"
      mode="scaleToFill"
      class="topRight"
    />
    <image
      src="https://yhpn-project-1320305021.cos.ap-beijing.myqcloud.com/mini/static/work/examination/bg.jpg"
      mode="scaleToFill"
      class="bg"
    />

    <view class="readOnly">
      <h1 class="h1">{{ mode === 'tomato' ? '番茄模式' : '自定义模式' }}</h1>
      <input
        class="inp"
        placeholder="请输入内容"
        border="surround"
        v-model="timerDate.name"
        disabled
      />

      <h1 class="h1">计时模式</h1>
      <uni-section>
        <uni-data-select
          v-model="timing"
          :localdata="range"
          @change="change"
          :clear="false"
        ></uni-data-select>
      </uni-section>

      <h1 class="h1">专注时长</h1>
      <input
        class="inp"
        placeholder="请输入内容"
        border="surround"
        v-model="timerDate.time"
        disabled
      />
    </view>

    <view class="bottom">
      <image
        src="https://yhpn-project-1320305021.cos.ap-beijing.myqcloud.com/mini/static/images/banner/dragImg1.png"
        mode=""
      ></image>
      <view class="content">
        <view
          class="text"
          @click="start"
        > 开始专注 </view>
        <view class="text1"> 专注时长最长999分钟，最短1分钟 </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniDataSelect from '@/pageFive/components/uni-data-select/components/uni-data-select/uni-data-select.vue'

export default {
  data() {
    return {
      brushQuestions: "默认番茄模式",
      timing: 0,
      duration: '15分钟',
      range: [{ //	运行模式
        value: 0,
        text: "倒计时"
      },
      {
        value: 1,
        text: "正计时"
      },
      ],
      timerDate: null,
      mode: '',		//	模式		tomato: 番茄模式		custom： 自定义模式
    }
  },
  components: { uniDataSelect },
  onLoad(options) {
    console.log(options, 'tiemr参数')
    this.timerDate = JSON.parse(options.timerDate)
    this.mode = options.mode	//	获取模式
    if (this.mode == 'tomato') {
      uni.setNavigationBarTitle({
        title: '番茄模式'
      })
    } else if (this.mode == 'custom') {
      uni.setNavigationBarTitle({
        title: '自定义模式'
      })
    }
    console.log(this.timerDate)
  },
  methods: {
    //	修改计时模式
    change(e) {
      console.log(e)
      console.log("----", this.timing)
    },

    //	开始专注
    start() {
      this.timerDate.timing = this.timing;	//	设计 计时模式
      let arr;
      if (this.mode == 'tomato') {
        arr = JSON.parse(uni.getStorageSync("tomatoMode"))
      } else if (this.mode == 'custom') {
        arr = JSON.parse(uni.getStorageSync("customMode"))
      }
      let index = arr.findIndex(item => item.id == this.timerDate.id)
      // arr.splice(index, index + 1, this.timerDate)
      arr[index] = this.timerDate
      console.log(arr)
      if (this.mode == 'tomato') {
        uni.setStorageSync("tomatoMode", JSON.stringify(arr))
      } else if (this.mode == 'custom') {
        uni.setStorageSync("customMode", JSON.stringify(arr))
      }

      if (this.timing == 0) {
        //	倒计时
        this.$tab.navigateTo("/pageSec/timerPage/countdown/index?id= " + this.timerDate.id + "&mode=" + this.mode)
      } else if (this.timing == 1) {
        //	正计时
        this.$tab.navigateTo("/pageSec/timerPage/positiveTiming/index?id= " + this.timerDate.id + "&mode=" + this.mode)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .topRight {
    width: 450rpx;
    height: 450rpx;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
}

.readOnly {
  margin: 345rpx 46rpx auto 46rpx;
  position: relative;
  z-index: 2;

  > .h1 {
    font-size: 40rpx;
    font-weight: 600;
    color: $uni-text-color;
    margin: 80rpx auto 32rpx;
  }

  > .inp {
    width: 100%;
    height: 80rpx;
    border-radius: 16rpx;
    // background: rgba(246, 248, 253, 1);
    background: #fff;
    text-indent: 0.5rem;
    padding-left: 0.5rem;
  }
}

.bottom {
  position: fixed;
  bottom: -17rpx;
  left: 0;

  > image {
    width: 750rpx;
    height: 442rpx;
    transform: scaleX(1.04);
  }

  > .content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    .text {
      width: 330rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 16rpx;
      background: $uni-color-primary;
      margin: 0 auto;
      margin-top: 138rpx;
      text-align: center;
      font-size: 32rpx;
      font-weight: 600;
      color: #fff;
    }

    .text1 {
      width: 100%;
      margin-top: 32rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: $uni-text-color-grey;
      text-align: center;
    }
  }
}

/deep/ .uni-select {
  // background-color: $uni-bg-color !important;
  background: #fff !important;
  border: none !important;
  height: 80rpx !important;
  border-radius: 16rpx !important;

  .uni-select__input-box {
    height: 80rpx !important;
    border-radius: 20rpx !important;
  }

  .uni-select__input-text {
    color: $uni-text-color-grey !important;
  }

  .uniui-bottom {
    color: $uni-text-color-blank !important;
  }

  .uniui-top {
    color: $uni-text-color-blank !important;
  }

  .uni-select__selector-item {
    color: $uni-text-color-blank !important;
  }
}

/deep/ .uni-section-header {
  display: none !important;
}

/deep/ .uni-section {
  border-radius: 16rpx;
}

/deep/ .uni-icons {
  margin-right: 27rpx !important;
}
</style>