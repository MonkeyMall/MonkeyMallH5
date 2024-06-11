<template>
  <view
    class="slider-verify"
    :style="'background-color:'+sBgColor"
    @touchend="touchend"
  >
    <view
      class="slider-prompt"
      :style="success?'color:'+sColor:'color:'+dColor"
    >{{success?'验证通过':'拖动滑块验证'}}</view>
    <view
      class="slider-bg"
      :style="{'transform':'translateX('+oldx+'px)',backgroundColor:dBgColor}"
    ></view>
    <movable-area
      class="slider-area"
      :animation="true"
    >
      <movable-view
        :style="{borderColor:success?sBgColor:dBgColor}"
        :class="{'movable-btn':true,'movable-success':success}"
        :x="x"
        direction="horizontal"
        @change="onMove"
        :disabled="isDisable"
      >
      </movable-view>
    </movable-area>
  </view>
</template>

<script>
export default {
  props: {
    //是否禁止拖动
    disabled: {
      type: Boolean,
      default: false
    },
    //偏移量
    offset: {
      type: Number,
      default: 3
    },
    //滑动轨道默认背景色
    dBgColor: {
      type: String,
      default: '#f0f0f0'
    },
    //滑动轨道滑过背景色
    sBgColor: {
      type: String,
      default: '#72c13f'
    },
    //默认文字颜色
    dColor: {
      type: String,
      default: '#8a8a8a'
    },
    //成功文字颜色
    sColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  data() {
    return {
      x: 0,
      oldx: 0,
      success: false, //是否验证成功
      verification: 0, //验证次数
      isDisable: this.disabled,
      screenWidth: 0
    };
  },
  mounted() {
    const systemInfo = uni.getSystemInfoSync()
    this.screenWidth = systemInfo.screenWidth
  },
  methods: {
    onMove(e) {
      this.oldx = e.detail.x
    },
    touchend() {
      if (this.success || (this.oldx < 1 && this.oldx != 0.1)) return
      this.x = this.oldx
      var promptW = 0
      var onTrackW = 0
      uni.createSelectorQuery().in(this).select(".slider-prompt").boundingClientRect(data => {
        if (data.width > 0) {
          promptW = data.width
          uni.createSelectorQuery().in(this).select(".movable-btn").boundingClientRect(data => {
            if (data.width > 0) {
              onTrackW = data.width
              if (this.oldx != 0.1) this.verification++
              if (this.oldx > (promptW - onTrackW - this.offset)) {
                this.success = true
                this.isDisable = true
                this.verificationSuccess(true)
              } else {
                this.$nextTick(() => {
                  this.x = 0
                  this.oldx = 0
                })
                this.verificationSuccess(false)
              }
            }
          }).exec()
        }
      }).exec()
    },
    verificationSuccess(state) {
      let obj = {
        state: state,
        verification: this.verification
      }
      this.$emit("change", obj)
    },
    //重置初始化状态
    initialization() {
      this.x = 0
      this.oldx = 0.1
      this.verification = 0
      this.success = false
      this.isDisable = false
      this.touchend()
    }
  }
}
</script>

<style scoped>
.slider-verify {
  position: relative;
  width: 100%;
  height: 80rpx;
  overflow: hidden;
}

.slider-prompt {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  z-index: 99;
}

.slider-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.slider-area {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
}

.movable-btn {
  width: 100rpx;
  height: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  border: solid 1px;
  background-image: url(https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/go-right.png);
  background-position: center;
  background-size: 34rpx auto;
  background-repeat: no-repeat;
}

.movable-success {
  border: solid 1px;
  background-image: url(https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/success.png);
  background-size: 40rpx auto;
}
</style>