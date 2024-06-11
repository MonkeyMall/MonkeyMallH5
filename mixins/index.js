import config from '@/config/index.js'
// 正计时
const defaultMixins = {
    data() {
        return {
            startTime: '',
            time: '00:00:00',
            duration: 0,
            timerInterval: null,
            durationOld: 0 // 中途退出保存的用时
        }
    },
    onLoad(options) {
        this.startTime = new Date().getTime()
        if (!this.durationOld) this.getTime(this.durationOld)
    },
    methods: {
        // 正计时计算做题用时，显示为00:00
        getTime(durationOld) {
            this.clearIntervalFn()
            this.timerInterval = setInterval(() => {
                let startTime = this.startTime
                // let endTime = this.info.endTime
                let nowTime = new Date().getTime()
                let time = ((nowTime - startTime) / 1000) + durationOld
                let hour = Math.floor(time / 3600)
                let minute = Math.floor((time - hour * 3600) / 60)
                let second = Math.floor(time - hour * 3600 - minute * 60)
                if (hour < 10) {
                    hour = '0' + hour
                }
                if (minute < 10) {
                    minute = '0' + minute
                }
                if (second < 10) {
                    second = '0' + second
                }
                this.time = hour + ':' + minute + ':' + second
            }, 1000)
        },
        // 点击下一题
        stopIntervalFn() {
            this.duration = Math.floor((new Date().getTime() - this.startTime) / 1000) + this.durationOld
            // clearInterval(this.timerInterval)
        },
        // 清空计时器
        clearIntervalFn() {
          clearInterval(this.timerInterval)
        }
    }
}

// 倒计时
const cutDownMixins = {
  data() {
      return {
        questionEndTime: '', // 当前试卷的结束时间
        startTime: '', // 用户做当前题的开始时间 2023-12-15 10:27:33
        endTime: '', // 用户做当前题的结束时间 2023-12-15 21:50:00
        time: '00:00:00',
        duration: 0,
        timerInterval: null,
        isStop: false
      }
  },
  onLoad(options) {
      this.startTime = new Date().getTime()
      // this.endTime = new Date(this.endTime).getTime()
      this.getTime()
  },
  methods: {
    // 根据结束时间显示时分秒倒计时
    getTime() {
      this.timerInterval = setInterval(() => {
        let nowTime = new Date().getTime()
        let endTime = new Date(this.questionEndTime).getTime()
        let time = (endTime - nowTime) / 1000
        let hour = Math.floor(time / 3600)
        let minute = Math.floor((time - hour * 3600) / 60)
        let second = Math.floor(time - hour * 3600 - minute * 60)
        if (hour < 10) {
            hour = '0' + hour
        }
        if (minute < 10) {
            minute = '0' + minute
        }
        if (second < 10) {
            second = '0' + second
        }
        if (time === 0) {
          // 试卷的结束时间已到，停止做题
          this.isStop = true
          this.time = '00:00:00'
          return
        }
        this.time = hour + ':' + minute + ':' + second
      }, 1000)
    },
    // 获取用时
    stopIntervalFn() {
      this.duration = Math.floor((new Date().getTime() - this.startTime) / 1000)
      // 重置当前时间
      this.startTime = new Date().getTime()
      // clearInterval(this.timerInterval)
    },
    // 清空计时器
    clearIntervalFn() {
      clearInterval(this.timerInterval)
    }
  }
}
// 处理图片域名问题
const splitImgMixins = {
    data() {
        return {
            coursePic: '',
            COS_CDN_PREFIX: 'https://' + config.COS_CDN_PREFIX
        }
    },
    methods: {
        resetPic(value) {
            const startN = config.COS_CDN_PREFIX.length + 8
            let arr = []
            value.forEach(item => {
                arr.push(item.substring(startN))
            })
            // const coursePic = value[0].substring(startN)
            // return coursePic
            return arr
        }
    }
}

// 下拉刷新更新页面
const enablePullDownRefreshMixins = {
  onPullDownRefresh() {
    this.enablePullDownRefreshFn()
    uni.stopPullDownRefresh();//停止刷新
  }
}

export {
    defaultMixins,
    cutDownMixins,
    splitImgMixins,
    enablePullDownRefreshMixins
}
