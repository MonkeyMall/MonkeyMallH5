<template>
  <view>
    <view class="timeContainer">{{ complZero(minute) }} : {{ complZero(second) }}</view>
    <!-- <button style="margin-right: 20px" type="primary" @click="start">开始</button>
		<button style="margin-right: 20px" type="primary" @click="reset">重置</button>
		<button type="primary" @click="end">暂停</button>
		<button type="primary" @click="del(minute,second)">暂停</button> -->
  </view>
</template>

<script>
export default {
  props: {
    timeNum: {
      type: String,
      default: '2344234242342432'
    }
  },
  data() {
    return {
      flag: null,
      minute: this.timeNum,
      second: 0,
      time: this.time,
      newminute: null,	//	
      newsecond: '00',
      list: [],

    };
  },
  mounted() {
    console.log('1-2')
    this.minute = Math.floor(this.timeNum / 60);
    this.second = this.timeNum % 60;
    this.newminute = Math.floor(this.timeNum / 60);
    this.newsecond = this.timeNum % 60;
    // this.newminute = this.timeNum;
    this.start()
  },
  onLoad(options) {
    console.log(options, '倒计时组件')

  },
  methods: {
    //开始计时
    start() {
      console.log('start')
      if (this.timeNum < 1) {
        return
      }
      this.flag1 = setInterval(() => {
        if (this.second == 0 && this.minute == 0) {
          this.end()
          //	此处需要调用父组件 方法
          this.$emit('stopFn', '自动结束')
          return;
        }
        if (this.second < 1) {
          this.second = 60
          this.minute = this.minute - 1;
        }
        this.second = this.second - 1;
        this.$emit("timeFN", this.minute, this.second)

        //	闹钟		getMinute
        // if (this.minute == 110 || this.minute == 110 && this.second == 0) {
        // 	console.log('触发闹钟')
        // 	wx.vibrateLong()
        // 	// uni.vibrateLong()

        // }
      }, 1000)
    },
    //重新计时
    reset() {
      console.log("重置")
      clearInterval(this.flag);
      this.minute = 0;
      this.second = 0;
      // this.time = "00:00:00";
    },
    //暂停计时
    end() {
      this.flag = clearInterval(this.flag1);
      this.$emit('timeFN', this.minute, this.second)
    },
    //补零
    complZero(n) {
      return n < 10 ? "0" + n : "" + n;
    },

    del() {
      // debugger
      console.log('计数',)
      let a1 = (this.newminute * 60 + this.newsecond * 1) - (this.minute * 60 + this.second * 1)
      this.newminute = this.minute;
      this.newsecond = this.second
      // this.list.push(a1)
      // uni.setStorageSync('timeList',this.list)
      this.$emit('timeFN', this.minute, this.second, a1)
    }
  },
};
</script>
<style>
.timeContainer {
  font-size: 140rpx;
  margin-bottom: 10rpx;
}
</style>