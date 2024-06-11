<template>
  <view class="page">
    <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/examination/topR.png"
      mode="scaleToFill" class="topRight" />
    <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/examination/bg.jpg"
      mode="scaleToFill" class="bg" />
    <view class="switch-con">
      <view class="title" v-if="mode != 'positiveTiming'">{{ timeData.name }}</view>
      <foo ref="timer" @onChange='onChange' />
    </view>
    <view class="bottom">
      <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/banner/dragImg.png" mode="">
      </image>
      <view class="interfere" @click="pause()">
        <i class="iconfont icon">&#xe624;</i>
        <view class="text"> 干扰 </view>
      </view>
      <view class="drag">
        <move-verify ref="moveVerify" @vertify='vertifyResult'></move-verify>
      </view>
    </view>

    <!--专注时间 干扰 -->
    <uni-popup ref="popup1" type="bottom" :is-mask-click='false'>
      <view class="popquits">
        <view class="suspend" v-if="mode != 'positiveTiming'">
          <block class="suspendTime">
            <uv-count-down ref="countDown1" :time="timeData.interfere * 60 * 1000" format="mm:ss" :autoStart="false"
              millisecond @finish='onfinish1()'>
            </uv-count-down>
          </block>
          <text>暂停超过2分钟自动结束</text>
        </view>
        <view class="titles" style="font-size: 40rpx;" v-else>
          正计时暂停
        </view>

        <view class="submitTakeNote">
          <text @click="reset">复原</text>
          <text @click="start">继续计时</text>
        </view>
      </view>
    </uni-popup>

    <!-- 关闭提示弹窗 -->
    <uni-popup ref="popup2" type="center" :is-mask-click='false'>
      <view class="endPopup">
        <view class="endPopupTop"> 您确认结束吗 ？</view>
        <view class="endPopupMiddle" v-if="mode === 'positiveTiming'"> 结束后当前计时会停止，并返回主页面 </view>
        <view class="endPopupMiddle" v-else> 结束时长自动记录 </view>
        <view class="endPopupBottom">
          <text @click="JieShu"> 结束 </text>
          <text @click="ZXX"> 再想想 </text>
        </view>
      </view>
    </uni-popup>

    <!-- 手动模式, 专注时间结束 弹窗 -->
    <uni-popup ref="popup3" type='center' :is-mask-click='false'>
      <view class="endPopup">
        <view class="endPopupTop"> 专注时间已到~ </view>
        <view class="endPopupMiddle"> 跳过休息直接开启下一轮住在专注 </view>
        <view class="endPopupBottom">
          <text @click="TGXX"> 跳过休息 </text>
          <text @click="QXX"> 去休息 </text>
        </view>
      </view>
    </uni-popup>

    <!-- 休息时间 干扰弹窗 -->
    <uni-popup ref="popup4" type='center' :is-mask-click='false'>
      <view class="endPopup">
        <view class="endPopupTop"> </view>
        <view class="endPopupMiddle"> 跳过休息直接开启下一轮住在专注 </view>
        <view class="endPopupBottom">
          <text @click="TGXX('1')"> 跳过休息 </text>
          <!-- <text @click="JieShu"> 结束 </text> -->
          <text @click="start1">继续休息</text>
        </view>
      </view>
    </uni-popup>

    <!-- 手动模式, 休息时间结束 弹窗 -->
    <uni-popup ref="popup5" type='center' :is-mask-click='false'>
      <view class="endPopup">
        <view class="endPopupTop"> 休息时间已到~ </view>
        <view class="endPopupMiddle"> 继续学习直接开启下一轮住在专注 </view>
        <view class="endPopupBottom">
          <text @click="TGXX"> 继续学习 </text>
          <!-- <text @click="QXX"> 去休息 </text> -->
          <text @click="JieShu"> 结束 </text>
        </view>
      </view>
    </uni-popup>

    <view v-if="isShow">
      <page-container :show="isShow" custom-style="" :overlay="false" @beforeleave="beforeleave"></page-container>
    </view>
  </view>
</template>

<script>
import foo from "./index1.vue"
import moveVerify from '@/pageSec/components/move-verify/move-verify.vue'
// import uniPopup from "@/pageSec/components/uni-popup/components/uni-popup/uni-popup.vue"
import uvCountDown from "@/pageSec/components/uv-count-down/components/uv-count-down/uv-count-down.vue"
export default {
  components: {
    foo,
    moveVerify,
    uvCountDown,
    // uniPopup
  },
  data() {
    return {
      isShow: true,
      arr: [], //	全部数据
      id: null, //	唯一标识
      timerFlag: false,
      timeupSecond: 10,
      popFalg: true, //	弹窗标识 
      timeData: {},
      mode: '', //	模式
      modeFlag: true, //	运行的模式：	true： 专注倒计时		 false ： 休息时间
      minute: 0, //	当前 分
      second: 0, //	当前 秒	
      beforeFlag: false, //	休息倒计时结束前标识
    }
  },
  onLoad(options) {
    console.log('正计时的路由参数', options)
    this.id = options.id; //	存储唯一标识
    this.mode = options.mode //	获取模式
    if (this.mode == 'tomato') {
      this.arr = JSON.parse(uni.getStorageSync("tomatoMode"))
      this.arr.forEach(item => {
        if (item.id == this.id) {
          this.timeData = item
        }
      })
    } else if (this.mode == 'custom') {
      this.arr = JSON.parse(uni.getStorageSync("customMode"))
      this.arr.forEach(item => {
        if (item.id == this.id) {
          this.timeData = item
        }
      })
    }
    console.log('全部数据', this.arr)
    console.log('当前数据', this.timeData)

    // wx.enableAlertBeforeUnload({
    //   message: "是否确认退出该页面",
    //   success: (res) => {
    //     console.log("success", res)
    //   },
    //   fail: (res) => {
    //     console.log("error", res)
    //   }
    // })
  },
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '正计时',
      path: `/pageSec/timerPage/positiveTiming/index?mode=positiveTiming`,
    };
  },
  mounted() {
    this.$refs.timer.reset(); //	启动倒计时

    //	定义铃声
    this.lingsheng = uni.createInnerAudioContext();
    // this.lingsheng.src = 'https://majia-time-app.oss-cn-hangzhou.aliyuncs.com/yu-music.mp3'
    this.lingsheng.src = 'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/mp3/%E6%B0%B4%E6%BB%B4%E5%A3%B0.mp3'
    this.lingsheng.onPlay(() => {
      console.log('铃声开始播放');
    });
    this.lingsheng.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
  },
  onUnload() {
    console.log("onUnload")
    this.$refs.timer.reset()
    this.$refs.timer.end()		//	退出页面倒计时重置 并退出
    this.lingsheng = null;

    let index = this.arr.findIndex(item => item.id == this.id)
    this.arr.splice(index, index + 1, this.timeData)
    if (this.mode == 'tomato') {
      uni.setStorageSync("tomatoMode", JSON.stringify(this.arr))
    } else if (this.mode == 'custom') {
      uni.setStorageSync("customMode", JSON.stringify(this.arr))
    }
  },
  methods: {
    beforeleave() {
      this.isShow = false;
      if (!this.beforeFlag) {
        uni.showModal({
          title: "确定要退出吗？",
          confirmColor: '#fc515f',
          success: (e) => {
            console.log(e.confirm);
            if (e.confirm) {
              let pages = getCurrentPages();
              console.log(pages.length);
              console.log(pages);
              if (pages.length === 2) {
                console.log('退出');
                uni.switchTab({
                  url: "/pages/work/index"
                })
              } else {
                console.log('else');
                uni.navigateBack(1)
              }
            } else {
              //  点击取消
              this.isShow = true
            }
          }
        })
      } else {
        this.isShow = false
        this.beforeFlag = false
        uni.navigateBack({
          delta: 2
        });
      }
    },
    //开始
    start() {
      this.$refs.timer.start();
      this.$refs.popup1.close('bottom')
      if (this.mode == 'tomato' || this.mode == 'custom') {
        this.$refs.popup4.close()
        this.$refs.countDown1.pause()
      }
    },
    //	继续休息
    start1() {
      console.log('继续休息')
      this.$refs.popup4.close()
      this.$refs.timer.start();
    },
    // 暂停 倒计时
    pause() {
      this.$refs.timer.end()
      if (this.mode == 'positiveTiming') {
        this.$refs.popup1.open('bottom')
      } else if (this.mode == 'tomato' || this.mode == 'custom') {
        if (this.modeFlag) {
          //	专注时间的 暂停
          this.$refs.popup1.open('bottom')
          this.$refs.countDown1.start()
        } else {
          //	休息时间的 暂停
          this.$refs.popup4.open("center")
        }
      }
    },
    // 重置
    reset() {
      this.$refs.timer.reset()
      this.$refs.popup1.close('bottom')
    },

    //	获取当前 分 和 秒
    onChange(minute, second) {
      this.minute = minute;
      this.second = second
      if (this.modeFlag) { //	专注时间 计时
        if (minute == this.timeData.time) { //当前分钟数 == 专注的分钟数  专注模式 自动结束
          uni.vibrateLong()	//	震动
          this.$refs.timer.end() //	正计时暂停
          this.modeFlag = false; //	倒计时模式  改为休息时间
          this.timeData.endNumber = this.timeData.endNumber + 1; //	完成次数 +1
          this.timeData.endTime = this.timeData.endTime + this.timeData.time * 60 //	完成时间 + 设置时间  

          //	专注时间计时结束 铃声提示
          if (this.timeData.remind == 0) {
            // wx.vibrateLong()
            uni.vibrateLong()
          } else if (this.timeData.remind == 1) {
            this.lingsheng.play();

          } else if (this.timeData.remind == 2) {
            uni.vibrateLong()
            this.lingsheng.play();

          }
          if (this.timeData.runMode == '0') { //	运行模式为 自动连续 
            uni.showToast({
              'title': "专注完成休息一下吧",
              'icon': "none"
            })

            setTimeout(() => {
              this.lingsheng.stop()
              this.$refs.timer.reset() //	倒计时重置 
            }, 2000)
          } else if (this.timeData.runMode == '1') { //	1：	手动连续
            //	需要弹窗操作
            console.log("专注时间结束，弹窗提示")
            this.$refs.popup3.open()
          }
        }
      } else { //	休息时间 计时
        console.log("去休息", minute, this.timeData.restTime)
        if (minute == this.timeData.restTime) { //当前分钟数 == 休息的分钟数  休息模式 自动结束
          this.$refs.timer.end() //	正计时暂停
          if (this.timeData.runMode == '0') { //	运行模式为 自动连续
            uni.showToast({
              'title': "休息结束, 即将开始下一轮专注",
              'icon': "none"
            })
            setTimeout(() => {
              this.modeFlag = true; //	计时模式  改为 专注时间
              this.$refs.timer.reset() //	倒计时重置
              // this.$refs.timer.start() //	倒计时重新开始 计算休息时间
            }, 1200)
          } else if (this.timeData.runMode == '1') { //	1：	手动连续
            //	需要弹窗操作
            this.$refs.popup5.open()
            console.log("休息时间结束")
          }
        }
      }
    },

    //	滑动验证
    vertifyResult(vertify) {
      console.log(vertify, '滑动验证')
      this.$refs.timer.end();
      this.$refs.popup2.open('center')
      this.vertify = vertify
    },

    //	结束 按钮
    JieShu(val) {
      // this.minute = 0;
      // this.second = 0;
      this.$refs.timer.end()
      if (this.mode == 'positiveTiming') {
        // this.$tab.reLaunch('/pages/work/index')	//	跳转首页
        uni.navigateBack({
          delta: 1
        });
      } else {
        if (this.modeFlag) {		//	val：1 ； 完成次数不加
          this.timeData.endNumber = this.timeData.endNumber + 1; //	完成次数 +1
          let shiyongshijian = this.minute * 60 + this.second //	使用时间
          this.timeData.endTime = this.timeData.endTime + shiyongshijian;
          this.$refs.popup2.close('center')
        }
        // this.$tab.reLaunch('/pageFive/tomato/index?custom=' + this.mode)
        uni.navigateBack({
          delta: 2
        });
      }
      this.beforeFlag = true
      console.log("结束 --- 退出页面")
    },

    //	再想想  按钮
    ZXX() {
      console.log('再想想')
      this.$nextTick(() => {
        this.$refs.popup2.close('center')
        this.$refs.timer.start();
        this.$refs.moveVerify.reviseX()
      })
    },

    //	暂停倒计时结束
    onfinish1() {
      console.log('暂停倒计时结束')
      this.JieShu()
      this.beforeFlag = true
    },

    //	跳过休息
    TGXX(val) {
      this.lingsheng.stop()
      this.modeFlag = true;	//	倒计时模式  改为专注 时间
      this.$refs.timer.reset()		//	正计时重置
      this.$refs.popup3.close()	//	关闭弹窗
      this.$refs.popup4.close()	//	关闭弹窗
      this.$refs.popup5.close()	//	关闭弹窗
    },

    //	去休息
    QXX() {
      this.lingsheng.stop()
      console.log("去休息")
      this.modeFlag = false;	//	倒计时模式  改为休息 时间
      this.$refs.timer.reset()		//	正计时重置
      this.$refs.popup3.close()	//	关闭弹窗
    }


  },
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

  .switch-con {
    width: 100%;
    position: absolute;
    top: 450rpx;
    z-index: 2;
    @include columnAlignCenter;

    .title {
      font-size: 32rpx;
      padding: 16rpx 32rpx;
      border-radius: 235rpx;
      color: $uni-text-color-blank;
      background: $uni-text-color-inverse;
      margin: 30rpx 0 50rpx 0;
    }
  }
}

.popquits {
  background: $uni-color-bg-gray;
  padding: 32rpx;
  color: $uni-color-primary;

  .suspend {
    width: 100%;
    display: flex;
    height: 230rpx;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: $uni-color-primary !important;

    /deep/ .uv-count-down__text {
      color: $uni-color-primary !important;
      font-size: 100rpx;
    }
  }

  //	时间选择按钮
  .titles {
    display: flex;
    height: 109rpx;
    line-height: 116.41rpx;
    justify-content: center;
    font-size: 100rpx;
    margin: 50rpx auto 25rpx auto;
    font-weight: 600;

    >input {
      width: 190rpx;
      height: 100rpx;
      font-weight: 700;
      text-align: center;
    }
  }

  .text1 {
    //	开始倒计时
    width: 100%;
    line-height: 80rpx;
    border-radius: 16rpx;
    background: $uni-color-primary;
    font-size: 32rpx;
    font-weight: 600;
    text-align: center;
    color: $uni-text-color-inverse;
    margin-top: 32rpx;
  }

  .conse {
    width: 100%;
    margin-bottom: 82rpx;
    text-align: center;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 39.2rpx;
    color: $uni-color-primary;
  }

  .submitTakeNote {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 50rpx;

    >text:nth-child(1) {
      width: 330rpx;
      line-height: 80rpx;
      border-radius: 16rpx;
      border: 2rpx solid rgba(252, 81, 95, 1);
      font-size: 32rpx;
      font-weight: 600;
      text-align: center;
      color: $uni-color-primary;
      margin-top: 32rpx;
    }

    >text:nth-child(2) {
      width: 330rpx;
      line-height: 80rpx;
      border-radius: 16rpx;
      background: $uni-color-primary;
      font-size: 32rpx;
      font-weight: 600;
      text-align: center;
      color: $uni-text-color-inverse;
      margin-top: 32rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.bottom {
  position: fixed;
  bottom: -17rpx;
  left: 0;

  >image {
    width: 750rpx;
    height: 442rpx;
    transform: scaleX(1.04);
  }

  .interfere {
    position: absolute;
    top: -120rpx;
    left: 319rpx;
    width: 112rpx;
    height: 149rpx;
    border-radius: 235rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1rpx -1rpx 14rpx 3rpx rgba(153, 153, 153, 0.1);
    text-align: center;

    .icon {
      color: $uni-color-primary;
      font-size: 60rpx;
      margin-top: 27rpx;
    }

    .text {
      font-size: 26rpx;
      font-weight: 600;
      line-height: 33.6rpx;
      color: rgba(51, 51, 51, 1);
    }
  }

  .drag {
    position: absolute;
    top: 141rpx;
    left: 20rpx;
  }
}

.endPopup {
  width: 532rpx;
  // height: 262rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  overflow: hidden;

  .endPopupTop {
    font-size: 32rpx;
    font-weight: 600;
    padding-top: 40rpx;
  }

  .endPopupMiddle {
    margin-top: 24rpx;
    font-size: 26rpx;
    font-weight: 600;
    color: rgba(153, 153, 153, 1);
  }

  .endPopupBottom {
    width: 100%;
    height: 80rpx;
    display: flex;
    line-height: 80rpx;
    margin-top: 40rpx;

    >text {
      width: 50%;
      text-align: center;
      font-size: 28rpx;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }

    >text:nth-child(2) {
      color: #fff;
      background: $uni-color-primary;
      font-size: 28rpx;
      font-weight: 600;
      border-radius: 16rpx 0 16rpx 0;
    }
  }
}

::v-deep .move-view {
  border-color: red !important;
}
</style>