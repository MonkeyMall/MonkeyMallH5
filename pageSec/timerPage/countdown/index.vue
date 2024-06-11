<template>
  <view class="page">
    <image src="https://yhpn-project-1320305021.cos.ap-beijing.myqcloud.com/mini/static/work/examination/topR.png"
      mode="scaleToFill" class="topRight" />
    <image src="https://yhpn-project-1320305021.cos.ap-beijing.myqcloud.com/mini/static/work/examination/bg.jpg"
      mode="scaleToFill" class="bg" />
    <view class="switch-con">
      <view class="title" v-if="mode != 'countdown'">{{ timeData.name }}</view>
      <!-- <uv-count-down :time='4000'></uv-count-down> -->
      <uv-count-down class="down1" ref="countDown" :time="timeData.shengyuValue * 1000 + 600" format="mm:ss"
        :autoStart="false" millisecond @change="onChange" @finish='onfinish()'>
      </uv-count-down>
    </view>
    <view class="bottom">
      <image src="https://yhpn-project-1320305021.cos.ap-beijing.myqcloud.com/mini/static/images/banner/dragImg.png"
        mode=""></image>
      <view class="interfere" @click="pause()">
        <i class="iconfont icon">&#xe624;</i>
        <view class="text"> 干扰 </view>
      </view>
      <view class="drag">
        <image class="rightImg"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/right.png" />
        <div id="redBack"></div>
        <move-verify ref="moveVerify" @vertify='vertifyResult'></move-verify>
      </view>
    </view>

    <!-- 设置定时器 时间 -->
    <uni-popup ref="popup" type="bottom" :is-mask-click='false'>
      <view class="popquits">
        <view class="titles">
          <input v-model="minute" maxlength='3' @input="input1($event)" type="number" />:
          <input v-model="second" maxlength='2' @input="input2($event)" type="number" />
        </view>
        <view class="conse">
          请输入倒计时长， 最长 180 分钟
        </view>
        <view class="text1" @click="start">
          <text>开始倒计时</text>
        </view>
      </view>
    </uni-popup>

    <!-- 专注暂停 弹窗 -->
    <uni-popup ref="popup1" type="bottom" :is-mask-click='false'>
      <view class="popquits">
        <view class="suspend" v-if="mode != 'countdown'">
          <block class="suspendTime">
            <uv-count-down ref="countDown1" :time="timeData.interfere * 60 * 1000" format="mm:ss" :autoStart="false"
              millisecond @finish='onfinish1()'>
            </uv-count-down>
          </block>
          <text>{{ mode == 'tomato' ? '暂停超过2分钟自动结束' : '暂停超过' + timeData.interfere + '分钟自动结束' }}</text>
        </view>
        <view class="titles" style="font-size: 40rpx;" v-else>
          倒计时暂停
        </view>
        <view class="submitTakeNote">
          <text @click="reset">复原</text>
          <text @click="start">继续计时</text>
        </view>
      </view>
    </uni-popup>

    <!-- 进度条 关闭弹窗 -->
    <uni-popup ref="popup2" type="center" :is-mask-click='false'>
      <view class="endPopup">
        <view class="endPopupTop"> 您确认结束吗 ？</view>
        <view class="endPopupMiddle" v-if="mode === 'countdown'"> 结束后当前计时会停止，并返回主页面 </view>
        <view class="endPopupMiddle" v-else> 结束时长自动记录 </view>
        <view class="endPopupBottom">
          <text @click="JieShu"> 结束 </text>
          <text @click="ZXX"> 再想想 </text>
        </view>
      </view>
    </uni-popup>

    <!-- 手动模式, 专注时间结束 弹窗  -->
    <uni-popup ref="popup3" type='center' :is-mask-click='false'>
      <view class="endPopup">
        <view class="endPopupTop"> 专注时间已到~ </view>
        <view class="endPopupMiddle"> 跳过休息将直接开启下一轮专注 </view>
        <view class="endPopupBottom">
          <text @click="TGXX(1)"> 跳过休息 </text>
          <text @click="QXX"> 去休息 </text>
        </view>
      </view>
    </uni-popup>

    <!-- 休息时间 干扰弹窗 -->
    <uni-popup ref="popup4" type='center' :is-mask-click='false'>
      <view class="endPopup">
        <!-- <view class="endPopupTop"> 专注时间已到~ </view> -->
        <view class="endPopupMiddle"> 跳过休息将直接开启下一轮专注 </view>
        <view class="endPopupBottom">
          <text @click="TGXX"> 跳过休息 </text>
          <!-- <text @click="JieShu"> 结束 </text> -->
          <text @click="JIXUXUEXI">继续休息</text>
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

    <uni-popup ref="popup6" type='center' :is-mask-click='false'>
      <view class="endPopup">
        <view class="endPopupTop"> 倒计时已结束 </view>
        <view class="endPopupBottom1">
          <text @click="queding"> 确定 </text>
        </view>
      </view>
    </uni-popup>

    <view v-if="isShow">
      <page-container :show="isShow" custom-style="" :overlay="false" @beforeleave="beforeleave"></page-container>
    </view>
  </view>
</template>
<script>
import foo from './index1.vue'
import moveVerify from '@/pageSec/components/move-verify/move-verify.vue'
// import uniPopup from "@/pageSec/components/uni-popup/components/uni-popup/uni-popup.vue"
import uvCountDown from "@/pageSec/components/uv-count-down/components/uv-count-down/uv-count-down.vue"

export default {
  components: {
    foo,
    moveVerify,
    // uniPopup,
    uvCountDown
  },
  data() {
    return {
      isShow: true,
      arr: [], //	全部数据
      id: null, //	唯一标识
      timeupSecond: 0, //	倒计时时长 秒
      timeData: {
        shengyuValue: 0
      },
      minute: 0, //	分钟
      second: 1, //秒
      mode: '', //	模式
      modeFlag: true, //	运行的模式：	true： 专注倒计时		 false ： 休息时间
      residue: 0, //	剩余时间  用于计算使用了多长时间
      beforeFlag: false,  //休息倒计时结束前标识
    }
  },
  onLoad(options) {
    console.log("options", options)
    this.id = options.id; //	存储唯一标识	
    this.mode = options.mode //	获取模式
    if (this.mode == 'tomato') {
      this.arr = JSON.parse(uni.getStorageSync("tomatoMode"))
      this.arr.forEach(item => {
        if (item.id == this.id) {
          this.timeData = item
        }
      })
      console.log("最后显示的数据", this.timeData)
      this.start()
    } else if (this.mode == 'custom') {
      this.arr = JSON.parse(uni.getStorageSync("customMode"))
      this.arr.forEach(item => {
        if (item.id == this.id) {
          this.timeData = item
        }
      })
      console.log("最后显示的数据", this.timeData)
      this.start()
    } else if (this.mode == 'countdown') {
      this.$nextTick(() => {
        this.$refs.popup.open('bottom') //	时间设置弹窗
      })
    }

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

  onUnload() {
    this.$refs.countDown.reset()
    this.$refs.countDown.pause() //	退出页面 停止倒计时
    this.lingsheng = null;

    let index = this.arr.findIndex(item => item.id == this.id)
    this.arr.splice(index, 1, this.timeData)
    if (this.mode == 'tomato') {
      uni.setStorageSync("tomatoMode", JSON.stringify(this.arr))
    } else if (this.mode == 'custom') {
      uni.setStorageSync("customMode", JSON.stringify(this.arr))
    }
  },
  
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '倒计时',
      path: `/pageSec/timerPage/countdown/index?mode=countdown`,
    };
  },
  mounted() {
    //	定义铃声
    this.lingsheng = uni.createInnerAudioContext();
    this.lingsheng.src =
      'https://yhpn-project-1320305021.cos.ap-beijing.myqcloud.com/mini/static/mp3/%E6%B0%B4%E6%BB%B4%E5%A3%B0.mp3'
    this.lingsheng.onPlay(() => {
      console.log('铃声开始播放');
    });
    this.lingsheng.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
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
    //	正则匹配
    input1(e) {
      this.$nextTick(() => {
        this.minute = e.target.value.replace(/^(0+)|[^\d]+/g, '')
        if (this.minute > 180) {
          this.minute = 180
        }
      })
    },
    //	正则匹配
    input2(e) {
      this.$nextTick(() => {
        this.second = e.target.value.replace(/^(0+)|[^\d]+/g, '')
        if (this.second > 60) {
          this.second = 60
        }
        console.log(this.minute)
        console.log(this.second)
      })
    },
    // 倒计时开始事件
    async start() {
      console.log('start')
      if (this.mode == 'tomato' || this.mode == 'custom') {
        this.timeData.shengyuValue = (this.timeData.time * 60);
        console.log(this.timeData, '-------------', this.timeData.shengyuValue)
        this.$refs.popup.close('bottom')
        this.$refs.popup1.close('bottom')
        this.$nextTick(() => {
          this.$refs.countDown.start();
          this.$refs.countDown1.pause()
        })
      } else {
        // this.$refs.countDown.reset();
        if (this.jieshuFlag == 1) {
          console.log('倒计时结束')
          this.$refs.countDown.reset();
          this.jieshuFlag = null;
        }
        this.timeData.shengyuValue = (this.minute * 60 + this.second) * 1;
        this.$refs.popup.close('bottom')
        this.$refs.popup1.close('bottom')
        this.$nextTick(() => {
          this.$refs.countDown.start();
        })
      }
    },
    // 倒计时暂停
    pause() {
      console.log('start')
      if (this.modeFlag == true) {
        this.$refs.popup1.open('bottom')
        this.$refs.countDown.pause();
        if (this.mode == 'tomato' || this.mode == 'custom') {
          this.$refs.countDown1.start()
        }
      } else {
        this.$refs.popup4.open('center')
        this.$refs.countDown.pause();
      }

    },

    // 倒计时重置
    reset() {
      console.log('start')
      console.log("重置")
      // this.lingsheng.stop()	//	重置会将
      if (this.mode == 'tomato' || this.mode == 'custom') {
        this.$refs.popup1.close('bottom')
        this.$nextTick(() => {
          this.$refs.countDown.reset(); //	重置
          this.$refs.countDown.start(); //	倒计时开始
        })
      } else if (this.mode == 'countdown') {
        this.$refs.popup1.close('bottom')
        this.timeData.shengyuValue = (this.minute * 60 + this.second) * 1;
        this.$nextTick(() => {
          this.$refs.countDown.reset(); //	重置
          this.$refs.countDown.start(); //	倒计时开始
        })
      }
      // this.$refs.popup.close('bottom')
      // this.$refs.popup1.close('bottom')
      // this.timeData.shengyuValue = (this.minute * 60 + this.second) * 1;
      // this.$nextTick(() => {
      // 	this.$refs.countDown.reset(); //	重置
      // 	this.$refs.countDown.start(); //	倒计时开始
      // })
    },
    // 倒计时变化   可以获取 倒计时事件
    onChange(e) {
      this.residue = e.minutes * 60 + e.seconds //	剩余的秒数
    },
    queding() {
      this.$refs.popup6.close('bottom')
      this.$nextTick((res) => {
        this.$refs.popup.open('bottom')
      })
    },
    //	倒计时结束
    async onfinish() {
      console.log("倒计时自动结束", this.timeData)
      this.minute = 0;
      this.second = 1;
      if (this.mode == 'countdown') {
        console.log('123')
        this.jieshuFlag = 1;
        this.$refs.popup6.open('center');
        this.lingsheng.play();
        uni.vibrateLong()
      } else if (this.mode == 'tomato' || this.mode == 'custom') {
        //	好像 番茄 和 自定义模式 逻辑一样///////////////////////////////////
        console.log('番茄模式')
        //		判断运行模式 
        if (this.timeData.runMode == '0') { //	0： 自动连续
          if (this.modeFlag) { //	专注倒计时结束	即将转为休息计时
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
            uni.showToast({
              'title': "专注完成休息一下吧",
              'icon': "none",
              'duration': 500
            })

            setTimeout(() => {
              this.lingsheng.stop()
              this.modeFlag = false; //	倒计时模式  改为休息时间
              this.timeData.shengyuValue = this.timeData.restTime *
                60; //	设置休息时间的总时间、
              this.timeData.endNumber = this.timeData.endNumber + 1; //	完成次数 +1
              this.timeData.endTime = this.timeData.endTime + this.timeData
                .time * 60 //	完成时间 + 设置时间  
              console.log(this.timeData.endTime)
              if (this.timeData.restTime != this.timeData.time) {
                this.$nextTick(() => {
                  this.$refs.countDown.start(); //	激活倒计时
                })
              } else {
                this.$nextTick(() => {
                  this.$refs.countDown.reset(); //	激活倒计时
                  this.$refs.countDown.start(); //	激活倒计时
                })
              }
            }, 1500)
          } else if (this.modeFlag == false) { //	休息倒计时结束	即将转为专注倒计时
            uni.showToast({
              'title': "休息结束，即将开始下一轮专注",
              'icon': "none"
            })
            setTimeout(() => {
              this.modeFlag = true; //	倒计时模式  改为专注时间
              this.timeData.shengyuValue = this.timeData.time * 60; //	设置专注时间的总时间、
              if (this.timeData.restTime != this.timeData.time) {
                this.$nextTick(() => {
                  this.$refs.countDown.start(); //	激活倒计时
                })
              } else {
                this.$nextTick(() => {
                  this.$refs.countDown.reset(); //	激活倒计时
                  this.$refs.countDown.start(); //	激活倒计时
                })
              }
            }, 1500)
          }
        } else if (this.timeData.runMode == '1') { //	1：	手动连续
          console.log('手动连续的逻辑') //	修改 modeFlag	弹窗提示
          if (this.modeFlag) {
            //	专注倒计时 结束的 提示逻辑
            if (this.timeData.remind == 0) {
              // wx.vibrateLong()
              uni.vibrateLong()
            } else if (this.timeData.remind == 1) {
              this.lingsheng.play();

            } else if (this.timeData.remind == 2) {
              uni.vibrateLong()
              this.lingsheng.play();

            }
            uni.showToast({
              'title': "专注完成休息一下吧",
              'icon': "none",
              'duration': 500
            })
            //	专注时间结束， 即将转为休息时间
            this.timeData.endNumber = this.timeData.endNumber + 1; //	完成次数 +1
            this.timeData.endTime = this.timeData.endTime + this.timeData.time *
              60; //	完成时间 + 设置时间
            this.$refs.popup3.open() //	开启 专注时间结束弹窗
          } else {
            //	休息时间结束，即将转为专注时间
            this.$refs.popup5.open() //	开启 休息时间结束弹窗
          }
        }
      }
    },

    //	滑动验证
    vertifyResult(vertify) {
      console.log('滑动验证参数', vertify)
      this.$refs.countDown.pause();
      this.$refs.popup2.open('center')
      this.vertify = vertify
    },

    //	结束
    JieShu() {
      console.log("结束")
      console.log("minute", this.timeData)
      this.minute = 0;
      this.second = 0;

      //	这个是单纯倒计时结束的提示
      if (this.mode == 'countdown') {
        uni.navigateBack({
          delta: 1
        });
      } else if (this.mode == 'tomato' || this.mode == 'custom') {
        if (this.modeFlag) {
          this.timeData.endNumber = this.timeData.endNumber + 1; //	完成次数 +1
          let shiyongshijian = this.timeData.time * 60 - this.residue //	使用时间
          this.timeData.endTime = this.timeData.endTime + shiyongshijian;
          this.$refs.popup2.close('center')
        }
        // this.$tab.redirectTo('/pageFive/tomato/index?custom=' + this.mode)
        uni.navigateBack({
          delta: 2
        });
      }
      this.beforeFlag = true
    },

    //	再想想
    ZXX() {
      console.log('再想想')
      this.$nextTick(() => {
        this.$refs.popup2.close('center')
        this.$refs.countDown.start();
        this.$refs.moveVerify.reviseX()
      })
    },

    //	跳过休息
    TGXX(val) { //	val:1 	跳过休息，重新设置时间倒计时不开启
      console.log("跳过休息", this.timeData)
      this.modeFlag = true; //	倒计时模式  改为专注 时间
      this.timeData.shengyuValue = this.timeData.time * 60; //	设置专注时间的总时间、
      if (val == 1) {
        console.log("value=== 1")
        this.reset()
        this.lingsheng.stop()
      } else {
        console.log('跳过休息', this.timeData)
        this.$nextTick(() => {
          this.$refs.countDown.reset(); //	激活倒计时
          this.timeData.shengyuValue = this.timeData.time * 60; //	设置专注时间的总时间、
          this.$refs.countDown.start(); //	激活倒计时
        })
      }
      this.$refs.popup3.close() //	关闭专注时间结束弹窗
      this.$refs.popup4.close() //	关闭休息时间干扰弹窗
      this.$refs.popup5.close() //	关闭休息时间结束弹窗
    },

    //	去休息
    QXX() {
      this.lingsheng.stop()
      console.log("去休息")
      this.modeFlag = false; //	倒计时模式  改为休息 时间
      this.timeData.shengyuValue = this.timeData.restTime * 60; //	设置休息时间的总时间
      //	如果 专注时间 与 休息时间的 时间一致 重新赋值后倒计时无法开启，需要进行重置才能进行倒计时
      if (this.timeData.restTime == this.timeData.time) {
        this.$refs.countDown.reset()
      }
      this.$nextTick(() => {
        this.$refs.countDown.start(); //	激活倒计时
      })
      this.$refs.popup3.close()
    },

    //	继续休息 倒计时继续
    JIXUXUEXI() {
      this.$refs.countDown.start()
      this.$refs.popup4.close('center')
    },

    //	暂停倒计时结束
    onfinish1() {
      console.log('暂停倒计时结束')
      this.JieShu()
      this.beforeFlag = true
    },

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
  background: #fff;
  padding: 32rpx;
  color: $uni-color-primary;
  align-items: center;
  border-radius: 16rpx 16rpx 0rpx 0rpx;

  //	时间选择按钮
  .titles {
    display: flex;
    height: 100rpx;
    justify-content: center;
    align-items: center;
    font-size: 100rpx;
    margin: 50rpx auto 25rpx auto;
    font-weight: 600;

    >input {
      width: 190rpx;
      height: 100rpx;
      font-weight: 700;
      text-align: center;
      display: flex;
      align-items: end;
    }
  }

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
      font-size: 100rpx !important;
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
      align-items: center;
      justify-content: center;
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

    .rightImg {
      position: absolute;
      right: 33rpx;
      width: 60rpx;
      height: 35rpx;
      top: 66rpx;
      z-index: 1;
    }
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
    margin-top: 60rpx;
    // margin-bottom: 20rpx;

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

  .endPopupBottom1 {
    width: 100%;
    height: 100rpx;
    display: flex;
    line-height: 80rpx;
    margin-top: 40rpx;

    >text {
      color: #fff;
      background: $uni-color-primary;
      width: 50%;
      height: 80rpx;
      margin: 0rpx auto;
      font-size: 28rpx;
      font-weight: 600;
      border-radius: 16rpx;
    }
  }
}

::v-deep .move-view {
  border-color: red !important;
}

/deep/ .uv-count-down__text {
  font-size: 100rpx !important;
  margin-top: 20rpx !important;
  // color: $uni-color-primary !important;
}

/deep/ .uv-count-down__text {
  color: #333 !important;
  font-size: 160rpx !important;
}

.down1 {
  /deep/ .uv-count-down__text {
    color: #333 !important;
    font-size: 140rpx !important;
  }
}
</style>