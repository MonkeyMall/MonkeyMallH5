<template>
  <view>
    <view class="timeContainer">{{ time }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      flag: null,
      hour: 0,
      minute: 0,
      second: 0,
      time: "00:00",


    };
  },
  methods: {
    //开始计时
    start() {
      console.log('start')
      this.flag = setInterval(() => {
        this.second = this.second + 1;
        if (this.second >= 60) {
          this.second = 0;
          this.minute = this.minute + 1;
        }
        this.$emit('onChange', this.minute, this.second)

        // if (this.minute >= 60) {
        // 	this.minute = 0;
        // 	this.hour = this.hour + 1;
        // }
        this.time =
          // this.complZero(this.hour) +
          // ":" +
          this.complZero(this.minute) +
          ":" +
          this.complZero(this.second);
      }, 1000);
    },
    //重新计时
    reset() {
      console.log("重置")
      clearInterval(this.flag);
      // this.hour = 0;
      this.minute = 0;
      this.second = 0;
      this.time = "00:00";
      this.start()
    },
    //暂停计时
    end() {
      this.flag = clearInterval(this.flag);
    },
    //补零
    complZero(n) {
      return n < 10 ? "0" + n : "" + n;
    },
  },
};
</script>
<style>
.timeContainer {
  font-size: 140rpx;
  margin-bottom: 10rpx;
}
</style>