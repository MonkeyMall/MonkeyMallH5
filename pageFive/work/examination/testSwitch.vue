<template>
  <view class="page">
    <image
      src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/examination/topR.png"
      mode="scaleToFill"
      class="topRight"
    />
    <view class="switch-con">
      <view class="title">{{ list.name }}</view>
      <foo
        class="time"
        ref="timer"
        :timeNum='list.shengyuValue'
        @timeFN='timerFn'
        @stopFn='stopFn()'
        @getList='getList'
      />
      <view class="count">
        <i class="iconfont ">&#xe632;</i> <text>{{ list.clickNumber || 0 }}</text>
      </view>
      <view class="btns">
        <view
          class="btn"
          @click="openModalFn"
        >
          <i class="iconfont">&#xe602;</i>
          <text> 暂停 </text>
        </view>
        <view
          class="btn"
          @click="next"
        >
          <i class="iconfont">&#xe604;</i>
          <text> 下一题 </text>
        </view>
      </view>
    </view>

    <uni-popup
      ref="popup"
      type="bottom"
      :is-mask-click='false'
    >
      <view class="pops">
        <view class="time">{{ minute }} : {{ second }}</view>
        <text>正在考试中，别离开太久哦～</text>
        <view class="pop-btns">
          <view
            class="pop-btns-btn stop"
            @click="stopFn()"
          >结束</view>
          <view
            class="pop-btns-btn continue"
            @click="continueFn"
          >继续计时</view>
        </view>
      </view>
    </uni-popup>

    <view v-if="isShow">
      <page-container
        :show="isShow"
        custom-style=""
        :overlay="false"
        @beforeleave="beforeleave"
      ></page-container>
    </view>
  </view>
</template>

<script>
import foo from "@/pageSec/timerPage/countdown/index1.vue"
export default {
  components: {
    foo
  },
  data() {
    return {
      isShow: true,
      topicNum: 99,
      minute: null,
      second: null,
      id: null,
      timers: 1,
      list: [], //	当前模式的数据
      clickNumber: 0,
      lingsheng: null,
      // listLi: null,	//	每道题的时间
    };
  },
  onLoad(options) {
    this.id = options.id;
    let arr = uni.getStorageSync("examinationMode") ? JSON.parse(uni.getStorageSync("examinationMode")) : [];
    arr.forEach(item => {
      if (item.id == this.id)
        this.list = item
    })
    this.list.endFlag = false;				//	进入之后完成状态改为 false 未完成
    //  通过id标识 判断当前开始是否结束   和 this.list.endFlag 一样 但是更准确
    let flag = uni.getStorageSync(`${this.list.id}examinationModeFlag`) === true ? true : false;
    console.log(flag, "flag");
    console.log(this.list, '倒计时页面进入时获取的获取')
    //	意外退出的逻辑		 未完成计入的逻辑
    //  如果退出时间戳存在，并且 examinationModeFlag：false 说明 是意外退出的     && this.flag
    if (!flag) {
      console.log('意外退出再次进入逻辑')
      let exitNumber = Date.now()	 	//	获取再次进入 的时间戳
      let tuichutime = parseInt((exitNumber - this.list.exitTime) / 1000);		//	计算退出的秒数
      //	计算当前数据剩余的时间数
      this.list.shengyuValue = this.list.shengyuValue * 1 - tuichutime * 1 ? this.list.shengyuValue * 1 - tuichutime * 1 : 0;
      if (this.list.shengyuValue < 1) {		//	剩余秒数 小于1 倒计时结束
        this.list.shengyuValue = this.list.time * 60;
        this.list.exitTime = null;
        this.list.topicList = []
        // let arr = uni.getStorageSync('timeList')	
        // arr.push(this.list.shengyuValue)
        // this.stopFn(2)	//	倒计时没有退出，再此进入倒计时时间结束
      }
    } else if (flag) {
      //   不管退出时间戳是否存在，只要 examinationModeFlag：true 说明 是正常退出的逻辑退出的
      //  "倒计时时间结束，重新进入
      console.log("倒计时时间结束，重新进入")
      this.list.exitTime = null;							//	将上次意外退出的时间戳 清空
      this.list.shengyuValue = this.list.time * 60;		//	重新计时
      this.list.topicList = []
      this.list.clickNumber = 0
      console.log("重新开始的数据", this.list)
    }
    // this.$refs.timer.start()

    // wx.enableAlertBeforeUnload({
    //   message: "是否确定退出本次考试，考试时长与题目数量将自动保存",
    //   success: (res) => {
    //     console.log("success", res)
    //   },
    //   fail: (res) => {
    //     console.log("error", res)
    //   }
    // })

    uni.removeStorageSync(`${this.list.id}examinationModeFlag`)
  },
  onHide: function () { 	// 页面从前台变为后台时执行
    console.log("页面从前台变为后台时执行")
  },
  onUnload: function () { 		// 页面销毁时执行
    console.log("页面销毁时执行")
    this.stopFn(1)
    clearTimeout(this.setTimerout1)
  },

  mounted() {
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
  methods: {
    beforeleave() {
      this.isShow = false;
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

    },
    //	暂停
    openModalFn() {
      this.$refs.popup.open()
      this.$refs.timer.end()
      // this.time = this.$refs.timer.time;
    },
    //	下一题 
    next() {
      this.$refs.timer.del()
      console.log('点击1', this.clickNumber, this.list.clickNumber)
      this.clickNumber = ++this.clickNumber;
      this.list.clickNumber = !this.list.clickNumber ? 1 : this.list.clickNumber + 1;	//	总计完成题数
      console.log('点击2', this.clickNumber, this.list.clickNumber)
      //	判断是否存在 
      this.list.topicList ? this.list.topicList : [];
      console.log(this.listLi)
      if (uni.getStorageSync('wanchengtime')) {
        console.log('本地的数据', uni.getStorageSync('wanchengtime'))
        this.listLi = this.listLi * 1 + uni.getStorageSync('wanchengtime') * 1
        uni.removeStorageSync('wanchengtime')
      }
      this.list.topicList.push(this.listLi)
    },
    //	结束
    stopFn(val) {
      this.$refs.timer.end();
      console.log('结束事件传递的参数', val)
      console.log(this.list, '结束前的数据')
      if (val == 1) {
        //	val 为 1 时 直接返回上级页面 倒计时未结束
        console.log('倒计时没有结束，直接返回上个页面')
        //	意外结束时 将 题目完成时间存到本地
        this.$refs.timer.del()		//	获取最后一道题结束的时间
        console.log("结束时的thisLi", this.listLi)
        uni.setStorageSync("wanchengtime", this.listLi)

        let arr = JSON.parse(uni.getStorageSync("examinationMode"))
        let index = arr.findIndex(item => item.id == this.id)
        this.list.exitTime = Date.now()	//	退出时的时间戳
        this.list.shengyuValue = (this.minute ? this.minute * 60 : 0) + this.second * 1;			//	剩余的时间秒数
        this.list.shengyuText = (this.minute ? this.minute + '分' : 0) + this.second + '秒';		//	剩余的时间 文本
        arr[index] = this.list;
        uni.setStorageSync("examinationMode", JSON.stringify(arr))
        return
      } else if (val == 2) {		//	逻辑改变执行不到
        //	倒计时未结束， 后台将倒计时执行结束
        // this.list.endNumber = this.list.endNumber + 1;		//	完成次数 +1
        // this.list.endFlag = true;							//	完成状态改为 已完成
        // this.list.TodayNumber = ++this.list.TodayNumber;	//	今日完成次数 +1
        // this.list.endTime = this.list.endTime + this.list.shengyuValue;	//	总计使用时间 + 使用的时间
        this.list.exitTime = '';
        this.$tab.redirectTo('/pageFive/work/examination/timeResult?title=' + this.list.name + '&id=' + this.list.id)
      } else {
        //	点击 结束按钮 退出逻辑
        console.log("正常退出的逻辑")
        this.$refs.timer.del()		//	获取最后一道题结束的时间
        this.list.clickNumber = this.list.clickNumber + 1;	//	本次完成题数
        this.list.totalQuestion = this.list.totalQuestion + this.list.clickNumber;
        this.list.topicList.push(this.listLi)
        let shiyong = this.list.time * 60 - ((this.minute ? this.minute * 60 : 0) + this.second * 1)	//当前数据总的使用的时间
        let shengyuText = (this.minute ? this.minute + '分' : 0) + this.second + '秒';		//	剩余的时间 文本
        let shengyuValue = (this.minute ? this.minute * 60 : 0) + this.second * 1;			//	剩余的时间秒数
        this.list.SYTime = shengyuText; 		//	剩余的时间  分秒(列表页面用)
        this.list.shengyuValue = shengyuValue 	//	剩余时间  秒
        if (shiyong > 30 * 60) {		//	超过30分钟 结束算数
          uni.showToast({
            "title": '答题已结束',
            'icon': 'none'
          })
          this.list.endNumber = this.list.endNumber + 1;		//	完成次数 +1
          this.list.endFlag = true;							//	完成状态改为 已完成
          this.list.TodayNumber = ++this.list.TodayNumber;	//	今日完成次数 +1
          this.list.endTime = this.list.endTime + shiyong;	//	总计使用时间 + 使用的时间
          this.list.exitTime = '';							//	意外退出的时间清空
        } else {
          //	未超过30分钟 退出不算次数
          uni.showToast({	//	完成次数 不变
            "title": '答题时间未超过30分钟，将不记录开始次数和时间',
            'icon': 'none'
          })
          //	未超过30分钟退出的逻辑
          this.list.endFlag = true;							//	完成状态改为 已完成
          // this.list.endTime = this.list.endTime + shiyong;	//	总计使用时间 + 使用的时间
          this.list.exitTime = null;							//	意外退出的时间清空
        }
        console.log(this.list, '修改后的数据')
      }

      let arr = JSON.parse(uni.getStorageSync("examinationMode"))
      let index = arr.findIndex(item => item.id == this.id)
      arr.splice(index, 1, this.list)
      uni.setStorageSync("examinationMode", JSON.stringify(arr))
      this.$refs.timer.del()								//	答题次数 +1
      if (val == 1) {				//	value为 1 推出页面，进入下个页面
        return
      } else {
        setTimeout(() => {
          // this.$tab.navigateTo('/pageFive/work/examination/timeResult?title=' + this.list.name + '&id=' + this.list.id)
          this.$tab.redirectTo('/pageFive/work/examination/timeResult?title=' + this.list.name + '&id=' + this.list.id)
        }, 800)
      }
    },
    //	继续计时
    continueFn() {
      this.$refs.popup.close()
      this.$refs.timer.start()
      // this.$refs.timer2.start()
    },

    //	获取当前 剩余时间
    timerFn(minute, second, a1) {
      // console.log(minute, second, 'timerFn')
      this.second = second
      this.minute = minute
      this.listLi = a1;
      // 闹钟		
      if ((minute == this.list.timea || minute == this.list.timeb || minute == this.list.timec) && second == 0) {
        console.log('触发闹钟')
        if (this.list.value == 0) {	//	震动
          // wx.vibrateLong()
          uni.vibrateLong()
        } else if (this.list.value == 1) {		//	铃声
          this.lingsheng.play()
        } else if (this.list.value == 2) {		//	铃声 + 震动
          console.log('this.list.value == 3')
          uni.vibrateLong()
          this.lingsheng.play();
        }
      }
    }
  }
};
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
    // top: 450rpx;
    top: 300rpx;
    z-index: 2;
    // color: $uni-text-color-blank;
    @include columnAlignCenter;

    .title {
      font-size: 32rpx;
      padding: 16rpx 32rpx;
      border-radius: 235rpx;
      color: $uni-text-color-blank;
      background: $uni-text-color-inverse;
    }

    .time {
      font-size: 100rpx;
      letter-spacing: 0px;
      margin-top: 100rpx;
    }

    .count {
      margin-top: 100rpx;
      height: 47rpx;
      display: flex;
      align-items: center;

      > i {
        font-size: 67rpx;
        color: $uni-color-primary;
      }

      > text {
        font-size: 40rpx;
        font-weight: 600;
      }
    }

    .btns {
      width: 468rpx;
      color: $uni-color-primary;
      font-size: 26rpx;
      font-weight: 600;
      letter-spacing: 0;
      display: flex;
      justify-content: space-between;
      margin-top: 190rpx;

      .btn {
        width: 112rpx;
        height: 149rpx;
        // padding: 30rpx 20rpx;
        border-radius: 235rpx;
        justify-content: center;
        @include columnAlignCenter;
        background: $uni-text-color-inverse;
        box-shadow: 1px -1px 14px 3px rgba(153, 153, 153, 0.1);

        .iconfont {
          font-size: 64rpx;
        }

        text {
          color: $uni-text-color;
          margin-top: 8rpx;
        }
      }
    }
  }

  .pops {
    height: 485rpx;
    color: $uni-color-primary;
    letter-spacing: 0;
    text-align: left;
    vertical-align: top;
    font-size: 28rpx;
    border-radius: 16rpx 16rpx 0px 0px;
    background: $uni-text-color-inverse;
    overflow: hidden;
    padding: 50rpx 30rpx 30rpx 30rpx;
    @include columnAlignCenter;

    text {
      margin-top: 24rpx;
      margin-bottom: 85rpx;
    }

    .time {
      font-size: 100rpx;
      font-weight: 700;
    }

    .pop-btns {
      width: 690rpx;
      @include flexBetween;

      // padding: 30rpx 30rpx00;
      .pop-btns-btn {
        width: 330rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 16rpx;
        font-size: 32rpx;
        letter-spacing: 0;
        border: 2rpx solid $uni-color-primary;
      }

      .stop {
        background: $uni-text-color-inverse;
        color: $uni-color-primary;
      }

      .continue {
        color: $uni-text-color-inverse;
        background: $uni-color-primary;
      }
    }
  }
}
</style>