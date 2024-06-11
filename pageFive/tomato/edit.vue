<template>
  <view class="page">
    <view class="li">
      <h1>项目标题</h1>
      <input class="inp" placeholder="请输入内容" border="surround" v-model="tomatoData.name" :disabled="id == 1" />
    </view>

    <view class="li">
      <h1>运行模式</h1>
      <uni-section>
        <uni-data-select v-model="tomatoData.runMode" :localdata="range" :clear="false"></uni-data-select>
      </uni-section>
    </view>

    <view class="li">
      <h1>专注时间</h1>
      <input class="inp" type="number" max="999" placeholder="专注时间上限为999 分钟" border="surround" v-model="tomatoData.time"
        @change="input1" :disabled="mode == 'tomato'" />
    </view>
    <view class="li">
      <h1>休息时间</h1>
      <input class="inp" type="number" max="10" placeholder="休息时间上限为10分钟" border="surround"
        v-model="tomatoData.restTime" @change="input2" :disabled="mode == 'tomato'" />
    </view>

    <view class="li">
      <h1>干扰、离开时间</h1>
      <input class="inp" placeholder="干扰、离开上限为10分钟" border="surround" type="number" v-model="tomatoData.interfere"
        @change="input3" :disabled="mode == 'tomato'" />
    </view>

    <view class="li">
      <h1>提醒铃声</h1>
      <uni-section>
        <uni-data-select v-model="tomatoData.remind" :localdata="remindData" :clear="false"></uni-data-select>
      </uni-section>
    </view>

    <view class="saveBtn" @click="saveClick" v-if="saveFlag || id == 1"> 保存 </view>
    <view class="btns" v-else>
      <view class="saveBtn1" @click="saveClick"> 保存 </view>
      <view class="deleteBtn1" @click="deleteClick"> 删除 </view>
    </view>

  </view>
</template>

<script>
import uniDataSelect from '@/pageFive/components/uni-data-select/components/uni-data-select/uni-data-select.vue'

export default {
  data() {
    return {
      saveFlag: true, //	底部按钮  true： 只显示保存	 false： 显示删除
      mode: null, //	模式   tomato：番茄模式不能修改时间，			custom：自定义模式可以修改时间 
      id: null,	 // 当前数据的唯一标识
      arr: [],	//	本地存储中的数据
      tomatoData: {	//	
        name: '',		//	标题
        runMode: 0,		//	运行模式
        time: '25',		//	专注时间
        restTime: '5',	//	休息时间
        interfere: '2',	//	干扰上限时间
        remind: 0,		//	铃声
        TodayNumber: 0, //	今日完成次数
        endFlag: true, //	是否完成
        endNumber: 0, //	总计完成考试次数
        endTime: 0, //	总计考试时长
        date: new Date().getDate(), // 日期
        // date: 21, // 日期
        shengyuValue: 0,		//	剩余秒数
        SYTime: "25分钟",		//	未完成的 剩余时间文本
      },
      range: [{ //	运行模式
        value: 0,
        text: "自动连续(默认)"
      },
      {
        value: 1,
        text: "手动选择"
      },
      ],
      remindData: [{		//	闹钟
        value: 0,
        text: "震动(默认)"
      },
      {
        value: 1,
        text: "铃声"
      },
      {
        value: 2,
        text: "震动 + 铃声"
      }
      ]
    }
  },
  components: { uniDataSelect },
  onLoad(options) {
    console.log(options, 'edit中options的参数')
    this.saveFlag = options.saveFlag == 1 ? true : false;	//	添加： true   编辑：false
    this.mode = options.mode;	//custom：自定义模式		tomato：番茄模式		countdown：纯倒计时(不进这页)
    if (this.mode == 'tomato') {
      uni.setNavigationBarTitle({
        title: '番茄模式'
      })
      this.arr = uni.getStorageSync("tomatoMode") ? JSON.parse(uni.getStorageSync("tomatoMode")) : [];
    } else if (this.mode == 'custom') {
      uni.setNavigationBarTitle({
        title: '自定义模式'
      })
      this.arr = uni.getStorageSync("customMode") ? JSON.parse(uni.getStorageSync("customMode")) : [];
    }
    //	编辑模式的逻辑	如果唯一标识存在 获取对应数据
    this.id = options.id ? options.id : null;
    if (options.id) {
      this.arr.forEach(item => {
        if (item.id == options.id)
          this.tomatoData = item
      })
    }
  },
  methods: {
    //	正则匹配 专注时间
    input1(e) {
      this.$nextTick(() => {
        this.tomatoData.time = e.target.value.replace(/^(0+)|[^\d]+/g, '')
        console.log(this.tomatoData.time);
        if (this.tomatoData.time > 999 || this.tomatoData.time < 1) {
          uni.showToast({
            title: "专注时间上限为 999 分钟",
            icon: 'none',
          })
          this.tomatoData.time = 999
        }
      })
    },
    //	正则匹配	休息时间
    input2(e) {
      this.$nextTick(() => {
        this.tomatoData.restTime = e.target.value.replace(/^(0+)|[^\d]+/g, '')
        if (this.tomatoData.restTime > 10 || this.tomatoData.restTime < 1) {
          uni.showToast({
            title: "休息时间上限为 10 分钟",
            icon: 'none',
          })
          this.tomatoData.restTime = 10
        }
      })
    },
    //	正则匹配	干扰时间
    input3(e) {
      this.$nextTick(() => {
        this.tomatoData.interfere = e.target.value.replace(/^(0+)|[^\d]+/g, '')
        if (this.tomatoData.interfere > 10 || this.tomatoData.interfere < 1) {
          uni.showToast({
            title: "专注时间上限为 10 分钟",
            icon: 'none',
          })
          this.tomatoData.interfere = 10
        }
      })
    },
    //	保存 按钮
    saveClick() {
      if (this.tomatoData.name.trim().length < 1) {
        uni.showToast({
          title: "请输入项目标题",
          icon: 'none',
        })
      } else {
        if (this.saveFlag && !this.id) {
          //	新增逻辑
          this.tomatoData.SYTime = this.tomatoData.time + "分钟";			//	修改暂时的剩余时间
          this.tomatoData.id = new Date().getTime();					//	设置唯一标识
          this.tomatoData.shengyuValue = this.tomatoData.time * 60;		//	剩余时间的总秒数，
          this.arr.push(this.tomatoData)
        } else {
          //	修改的逻辑
          var index = this.arr.findIndex(item => item.id == this.id)
          this.arr.splice(index, 1, this.tomatoData)
        }

        if (this.mode == 'tomato') {					//	番茄模式的数据
          uni.setStorageSync("tomatoMode", JSON.stringify(this.arr));	//	添加到本地存储
        } else if (this.mode == 'custom') {				//	自定义模式的数据
          uni.setStorageSync("customMode", JSON.stringify(this.arr));	//	添加到本地存储
        }
        uni.showToast({
          title: "保存成功",
          icon: 'none',
        })
        setTimeout(() => {
          // this.$tab.redirectTo('/pageFive/tomato/index?custom=' + this.mode)
          uni.navigateBack({
            delta: 1
          });
        }, 500)
      }
    },

    //	删除 按钮
    deleteClick() {
      uni.showToast({
        title: "删除成功",
        icon: 'none',
      })
      console.log(this.arr, '删除前')
      var index = this.arr.findIndex(item => item.id == this.id)
      console.log(index, this.id)
      this.arr.splice(index, 1,)
      if (this.mode == 'tomato') {
        uni.setStorageSync("tomatoMode", JSON.stringify(this.arr))
      } else if (this.mode == 'custom') {
        uni.setStorageSync("customMode", JSON.stringify(this.arr))
      }
      console.log(this.arr, '删除后')
      setTimeout(() => {
        // this.$tab.redirectTo('/pageFive/tomato/index?custom = ' + this.mode)
        uni.navigateBack({
          delta: 1
        });
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  background: #fff;
  padding: 30rpx 38rpx;
}

.li {
  margin-bottom: 50rpx;

  >h1 {
    font-size: 32rpx;
    font-weight: 600;
    color: $uni-text-color;
    margin-bottom: 24rpx;
  }

  >.inp {
    width: 100%;
    height: 80rpx;
    border-radius: 16rpx;
    background: rgba(246, 248, 253, 1);
    text-indent: 0.5rem;
    padding-left: 0.5rem;
  }
}

.saveBtn {
  height: 80rpx;
  opacity: 1;
  border-radius: 16rpx;
  background: $uni-color-primary;
  color: #fff;
  line-height: 80rpx;
  text-align: center;
  font-size: 32rpx;
  font-weight: 600;
  width: 690rpx;
  position: fixed;
  bottom: 80rpx;
}

.btns {
  width: 690rpx;
  height: 80rpx;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 80rpx;

  >view {
    width: 330rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 32rpx;
    font-weight: 600;
    border-radius: 16rpx;
  }

  .saveBtn1 {
    border: 1rpx solid $uni-color-primary;
    color: $uni-color-primary;
  }

  .deleteBtn1 {
    background: $uni-color-primary;
    color: #fff;
  }
}

/deep/ .uni-section-header {
  display: none !important;
}

/deep/ .uni-icons {
  margin-right: 27rpx !important;
}

/deep/ .uni-select {
  // background-color: $uni-bg-color-inpt !important;
  background: #f6f8fd !important;
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
</style>