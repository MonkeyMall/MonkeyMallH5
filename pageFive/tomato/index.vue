<template>
  <movable-area class="page">
    <view class="flex-row-center">
      <view class="left-slide-operation-item-view">
        <view v-for="(item, index) in list" :key="item.id" :style="{ height: Height }" class="ks-item-view">
          <!-- 系统默认考试模式 -->
          <view class="ks-item" v-if="index == 0" @click="jumpTestInfo(item)">
            <view class="ks-item-left">
              <view class="ks-item-left-tit">
                <view class="title">{{ mode == 'tomato' ? '系统默认番茄模式' : '系统默认自定义模式' }}</view>
                <i class="iconfont ml" v-if="mode == 'tomato'"> &#xe62d;</i>
                <i class="iconfont ml" v-if="mode == 'custom'"> &#xe631;</i>
                <view class="nums">{{ item.endNumber }}</view>
              </view>
              <view class="ks-item-left-time" v-if="mode == 'tomato'">
                <view class="label">· 总计完成番茄数</view>
                <view class="cutDown"> {{ item.endNumber }} 个 </view>
              </view>
              <view class="ks-item-left-time">
                <view class="label">· 总计专注时长</view>
                <view class="cutDown"> {{ convert(item.endTime) }} </view>
              </view>
            </view>
            <view class="ks-item-right">
              <i class="iconfont" @click.stop="jumpTestSwitch(item)">&#xe62e;</i>
            </view>
          </view>

          <left-slide-operation :ref="'slideRef' + item.id" v-else :class="mode == 'custom' ? 'a1' : ''"
            operationImageSrc='https://yhpn-project-1320305021.cos.ap-beijing.myqcloud.com/mini/static/left-slide-operation/icon_del.png'
            operationImageStyle="width: 60rpx; height: 66rpx;" :isSlide="true" @itemClickCallBack="itemClick"
            @operationCallBack="operationCallBack(item)" @itemTouchStart="itemTouchStart"
            @itemTouchEnd="itemTouchEnd(item.id)">
            <!-- 其他考试 --><!-- <i class="iconfont ml">&#xe62d;</i> -->
            <view class="ks-item" @click="jumpTestInfo(item)">
              <view class="ks-item-left">
                <view class="ks-item-left-tit">
                  <view class="title">{{ item.name }}</view>
                  <i class="iconfont ml" v-if="mode == 'tomato'"> &#xe62d;</i>
                  <i class="iconfont ml" v-if="mode == 'custom'"> &#xe631;</i>
                  <view class="nums"> {{ item.endNumber }} </view>
                </view>
                <!-- 完成 -->
                <block v-if="item.endFlag">
                  <view class="ks-item-left-time" v-if="mode == 'tomato'">
                    <view class="label">· 总共完成番茄数 </view>
                    <view class="cutDown"> {{ item.endNumber }} 个</view>
                  </view>
                  <!-- 未完成 -->
                  <view class="ks-item-left-time">
                    <view class="label">· {{ mode == 'tomato' || mode == 'custom' ? '总计专注时长' : '总计考试时长' }}</view>
                    <view class="cutDown"> {{ convert(item.endTime) }} </view>
                  </view>
                </block>
                <!-- <block v-else>
									<view class="ks-item-left-time">
										<view class="label">·剩余时长</view>
										<view class="cutDown">{{item.SYTime}} </view>
									</view>
									<button class="cutDownBtn">未完成计时</button>
								</block> -->
              </view>
              <view class="ks-item-right" @click.stop="jumpTestSwitch(item)">
                <i class="iconfont">&#xe62e;</i>
              </view>
            </view>
          </left-slide-operation>
        </view>
      </view>
    </view>
    <movable-view x="340" y="600" class="add" direction="all" @click="addBtn()">
      <i class="iconfont">&#xe600;</i>
    </movable-view>

    <view class="Tips" v-if="flag">
      <view class="left">
        <view class="text">温馨提示</view>
        <!-- 长按拖动可排序， -->
        <view>点击项目右侧可编辑，左滑可以操作更多</view>
      </view>
      <view class="right" @click="bzts()"> 不再提示 </view>
    </view>

    <uni-popup ref="popup" type="center" :is-mask-click='false'>
      <view class="endPopup">
        <view class="endPopupTop">确定删除当前计时器吗？</view>
        <view class="endPopupMiddle"> 删除后不可恢复哦~ </view>
        <view class="endPopupBottom">
          <text @click="quxiao"> 取消 </text>
          <text @click="quedin"> 确定 </text>
        </view>
      </view>
    </uni-popup>
  </movable-area>
</template>

<script>
import leftSlideOperation from "@/pageFive/components/left-slide-operation/left-slide-operation.vue";
export default {
  data() {
    return {
      Height: '',
      list: [],
      flag: true, //	不再提示 显示标识
      mode: null,		//	模式		tomato: 番茄模式		custom： 自定义模式
    };
  },
  components: { leftSlideOperation },
  onLoad(options) {
    console.log(options);
    console.log(uni.getStorageSync("bztsFlag"));
    this.flag = uni.getStorageSync("bztsFlag") === false ? uni.getStorageSync("bztsFlag") : true
    this.mode = options.custom;
    this.Height = this.mode == 'tomato' ? '185rpx' : '144rpx';
    if (options.custom == 'tomato') {
      uni.setNavigationBarTitle({
        title: '番茄模式'
      })
      this.list = uni.getStorageSync("tomatoMode") ? JSON.parse(uni.getStorageSync("tomatoMode")) : [];
    } else if (options.custom == 'custom') {
      uni.setNavigationBarTitle({
        title: '自定义模式'
      })
      this.list = uni.getStorageSync("customMode") ? JSON.parse(uni.getStorageSync("customMode")) : [];
    }
    if (this.list.length == 0) {
      let defaultList = { // 默认模式的数据
        shengyuValue: 7200,		//	剩余秒数
        SYTime: "120分",		//	未完成的 剩余时间文本
        id: 1,
        name: options.custom === 'tomato' ? "系统默认番茄模式" : "系统默认自定义模式",	//	标题
        runMode: 0,				//	运行模式		0： 自动连续		1：	手动开始
        time: "25",			//	专注时间
        restTime: "5",			//	休息时间
        interfere: "2",	//	干扰上限时间
        remind: 0,				//	铃声
        endFlag: true, //	是否完成
        endNumber: 0, //	总计完成考试次数
        endTime: 0, //	总计考试时长
        clickNumber: 0		//	题目完成数量
        // TodayNumber: 1, //	今日完成次数
        // date: new Date().getDate(), 	// 日期
        // date: 21, // 日期
      }
      this.list = [defaultList]
      if (this.mode === 'tomato') {
        uni.setStorageSync("tomatoMode", JSON.stringify(this.list))
      } else if (this.mode === 'custom') {
        uni.setStorageSync("customMode", JSON.stringify(this.list))
      }
    } else {
      //	番茄模式 和 自定模式 没有时间限制
      //	有数据的情况下获取当前日期  判断数据中的日期和当前日期是否一致，不一致 将所有数据中的 日期替换， 今日完成次数归零，
      // let TodayNumber = new Date().getDate()
      // if (new Date().getDate() != this.list[0].date) {
      // 	this.list.forEach(item => {
      // 		item.date = new Date().getDate();
      // 		item.TodayNumber = 0
      // 	})
      // 	uni.setStorageSync("tomatoMode", JSON.stringify(this.list))
      // }

    }
    console.log(this.list);
  },

  onShow() {
    if (this.mode == 'tomato') {
      this.list = JSON.parse(uni.getStorageSync("tomatoMode"));
    } else if (this.mode == 'custom') {
      this.list = JSON.parse(uni.getStorageSync("customMode"));
    }

  },
  onHide() {
    this.initRefs()
  },
  onShareAppMessage(options) {
    // 返回分享的内容
    let obj = {
      title: this.mode == 'tomato' ? '番茄模式' : '自定义模式',
      path: this.mode == 'tomato' ? '/pageFive/tomato/index?custom=tomato' : '/pageFive/tomato/index?custom=custom'
    }
    return obj;
  },
  methods: {
    bzts() {
      this.flag = false
      uni.setStorageSync("bztsFlag", this.flag)
    },
    quxiao() {
      this.$refs.popup.close()
    },
    quedin() {
      let modeString = "tomatoMode"
      if (this.mode == 'tomato') {
        modeString = "tomatoMode"
      } else if (this.mode == 'custom') {
        modeString = "customMode"
      }
      let arr = JSON.parse(uni.getStorageSync(modeString))
      console.log('arr', arr);
      var index = arr.findIndex(item => item.id == this.current.id)
      console.log('index', index);
      // arr.splice(index, 1,)
      // uni.setStorageSync(modeString, JSON.stringify(arr))
      // uni.showToast({ title: "删除成功" })
      // this.initRefs()
      // setTimeout(() => {
      //   this.$tab.redirectTo('/pageFive/tomato/index?custom=' + this.mode)
      // }, 100)

    },
    initRefs(id) {
      let _this = this
      let arr = this.list.filter(item => {
        return item.id != id
      })

      arr.forEach((item, index) => {
        if (index !== 0) {
          _this.$refs['slideRef' + item.id][0].init()
        }
      })
    },
    async operationCallBack(key) {
      // this.$refs.popup.open()
      // this.current = key
      let modeString = "tomatoMode"
      if (this.mode == 'tomato') {
        modeString = "tomatoMode"
      } else if (this.mode == 'custom') {
        modeString = "customMode"
      }
      const modal = await this.$api.modal('删除后不可恢复哦~', '确定删除当前计时器吗？', ['取消', '确定'])
      this.initRefs()
      if (modal) {
        let arr = JSON.parse(uni.getStorageSync(modeString))
        var index = arr.findIndex(item => item.id == key.id)
        arr.splice(index, 1,)
        uni.setStorageSync(modeString, JSON.stringify(arr))
        uni.showToast({ title: "删除成功" })
        this.list = JSON.parse(uni.getStorageSync(modeString))
        // setTimeout(() => {
        //   this.$tab.redirectTo('/pageFive/tomato/index?custom=' + this.mode)
        // }, 100)
      }
    },

    itemTouchStart(item) {
      // console.log('itemTouchStart----item: ' + JSON.stringify(item));
      // var index = item.lastSlideIndex;
      // if (index < 0) {
      //   return;
      // }
      // this.$refs.slideRef[index].init();
    },

    itemTouchEnd(id) {
      this.initRefs(id)
    },

    itemClick(item) {
      // console.log('itemClick----item: ' + JSON.stringify(item));
      // var index = item.lastSlideIndex;
      // if (index < 0) {
      //   return;
      // }
      // this.$refs.slideRef[index].init();
    },

    //	计时器 
    jumpTestSwitch(item) {
      // console.log(item)
      // this.$tab.navigateTo('/pageFive/work/examination/testSwitch')
      this.$tab.navigateTo('/pageFive/tomato/timer?timerDate=' + JSON.stringify(item) + "&mode=" + this.mode)
    },

    //	模式编辑
    jumpTestInfo(item) {
      // this.$tab.navigateTo('/pageFive/work/examination/clock')
      // console.log(item, 'item')
      this.$tab.navigateTo('/pageFive/tomato/edit?saveFlag=0&mode=' + this.mode + "&id=" + item.id)
    },

    //	添加
    addBtn() {
      this.$tab.navigateTo('/pageFive/tomato/edit?saveFlag=1&mode=' + this.mode)
    },



    //	转时间
    convert(val) {
      let a = Math.floor(val / 60 / 60)
      let b = Math.floor((val - (a * 60 * 60)) / 60)
      let c = val % 60;	// 秒
      let d = (a ? a + " 小时" : '') + (b ? b + " 分钟" : '') + (c + " 秒")
      return (a ? a + " 小时" : '') + (b ? b + " 分钟" : '') + (c + " 秒");
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  padding: 32rpx 0 170rpx 0;
  box-sizing: border-box;

  .flex-row-center {
    padding: 0 30rpx;
    height: 1212rpx;
    overflow: hidden;
    overflow-y: scroll;
  }
}

.ks-item-view {
  margin-bottom: 56rpx;
}

/* 内容 */
.ks-item {
  // height: 204rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 16rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background: $uni-text-color-inverse;
  margin-bottom: 32rpx;
  position: relative;

  &-left {
    position: relative;

    &-tit {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;

      .title {
        font-size: 32rpx;
        font-weight: 600;
        letter-spacing: 0rpx;
        color: $uni-text-color;
      }

      .ml {
        // width: 44rpx;
        // height: 44rpx;
        margin: 0rpx 0rpx 0 29rpx;
        color: $uni-color-primary;
        font-size: 40rpx;
      }

      .nums {
        font-size: 24rpx;
        font-weight: 400;
      }
    }

    &-time {
      font-size: 26rpx;
      font-weight: 400;
      color: $uni-text-color-grey;
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 12rpx;

      .cutDown {
        font-size: 28rpx;
        color: $uni-color-primary;
        margin-left: 20rpx;
      }
    }

    .cutDownBtn {
      width: 180rpx;
      line-height: 50rpx;
      font-size: 26rpx;
      font-weight: 400;
      // padding: 8rpx 29rpx;
      border-radius: 8rpx;
      background: $uni-color-primary;
      color: $uni-bg-color;
      margin: 10rpx 0;
    }
  }

  &-right {
    width: 52rpx;
    height: 100%;
    display: flex;
    align-items: center;

    >i {
      font-size: 50rpx;
      color: $uni-color-primary;
    }
  }

  &-tag {
    width: 210rpx;
    height: 50rpx;
    opacity: 1;
    border-radius: 28rpx 16rpx 0rpx 4rpx;
    background: $uni-color-primary;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 24rpx;
    font-weight: 400;
    color: $uni-text-color-inverse;
    text-align: center;
    line-height: 50rpx;

    label {
      font-size: 28rpx;
      font-weight: 600;
    }
  }
}

/* item样式 */
.left-slide-operation-item-view {
  width: 100%;
  // height: 300px;
  // background-color: $uni-bg-color;
  // border-bottom: 2rpx solid #f5f5f5;
}

.a1 {
  /deep/ .wrapper .delete {
    height: 152rpx !important;
  }
}

.add {
  position: fixed;
  color: #fff;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  box-shadow: 0rpx 2rpx 8rpx rgba(252, 81, 95, 0.5);
  background: $uni-color-primary;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;

  >i {
    font-size: 40rpx;
  }
}

.Tips {
  width: 100%;
  height: 168rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 46rpx;
  position: fixed;
  bottom: 0rpx;
  z-index: 5;

  >.left {
    width: 60%;
    font-size: 26rpx;
    font-weight: 400;
    color: $uni-text-color;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >.text {
      font-size: 28rpx;
      font-weight: 600;
      color: $uni-text-color;
    }
  }

  .right {
    width: 154rpx;
    height: 56rpx;
    line-height: 56rpx;
    border-radius: 8rpx;
    border: 2rpx solid $uni-color-primary;
    font-size: 28rpx;
    font-weight: 600;
    color: $uni-color-primary;
    text-align: center;
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
</style>