<template>
  <movable-area class="page">
    <!-- v-for="(item, index) in list" :key="index" -->
    <view class="flex-row-center">
      <view class="left-slide-operation-item-view">
        <!-- 其他模式 -->
        <view v-for="(item, index) in list" :key="item.id" style="height: 204rpx; margin-bottom: 32rpx;">
          <view class="ks-item" @click="jumpTestInfo(item, '1')" v-if="index == 0">
            <view class="ks-item-left">
              <view class="ks-item-left-tit">
                <view class="title"> 系统默认考试模式 </view>
                <image class="ml"
                  src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/left-slide-operation/ml.png"
                  mode="scaleToFill" />
                <view class="nums">{{ item.clickNumber }}</view>
              </view>
              <!-- <view class="ks-item-left-time">
                <view class="label">· 总计完成考试</view>
                <view class="cutDown">{{ item.endNumber }}次</view>
              </view>
              <view class="ks-item-left-time">
                <view class="label">· 总计考试时长</view>
                <view class="cutDown">{{ item.endTime }} </view>个小时
              </view> -->
              <block v-if="item.endFlag">
                <view class="ks-item-left-time">
                  <view class="label">· 总计完成考试 </view>
                  <view class="cutDown"> {{ item.endNumber }} 次</view>
                </view>
                <!-- 未完成 -->
                <view class="ks-item-left-time">
                  <view class="label">· 总计考试时长 </view>
                  <view class="cutDown"> {{ convert(item.endTime) }} </view>
                </view>
              </block>
              <block v-else>
                <view class="ks-item-left-time">
                  <view class="label">· 剩余时长 </view>
                  <view class="cutDown"> {{ item.shengyuText }} </view>
                </view>
                <button class="cutDownBtn">未完成计时 </button>
              </block>
            </view>
            <view class="ks-item-right" @click.stop="jumpTestSwitch(item)">
              <image
                src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/left-slide-operation/start.png"
                mode="scaleToFill" />
            </view>
            <view class="ks-item-tag" v-if="item.TodayNumber > 0">今日完成考试 <label>{{ item.TodayNumber }}</label> 次
            </view>
          </view>
          <left-slide-operation :ref="'slideRef' + item.id" v-else
            operationImageSrc='https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/left-slide-operation/icon_del.png'
            operationImageStyle="width: 60rpx; height: 66rpx;" :isSlide="true" @itemClickCallBack="itemClick"
            @operationCallBack="operationCallBack(item)" @itemTouchStart="itemTouchStart"
            @itemTouchEnd="itemTouchEnd(item.id)">
            <view class="ks-item" @click="jumpTestInfo(item)">
              <view class="ks-item-left">
                <view class="ks-item-left-tit">
                  <view class="title">{{ item.name }}</view>
                  <image class="ml"
                    src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/left-slide-operation/ml.png"
                    mode="scaleToFill" />
                  <!-- <view class="nums">{{ item.totalQuestion }}</view> -->
                  <view class="nums">{{ item.endNumber }}</view>
                </view>
                <!-- 完成 -->
                <block v-if="item.endFlag">
                  <view class="ks-item-left-time">
                    <view class="label">· 总计完成考试 </view>
                    <view class="cutDown"> {{ item.endNumber }} 次</view>
                  </view>
                  <!-- 未完成 -->
                  <view class="ks-item-left-time">
                    <view class="label">· 总计考试时长 </view>
                    <view class="cutDown"> {{ convert(item.endTime) }} </view>
                  </view>
                </block>
                <block v-else>
                  <view class="ks-item-left-time">
                    <view class="label">· 剩余时长 </view>
                    <view class="cutDown"> {{ item.shengyuText }} </view>
                  </view>
                  <button class="cutDownBtn">未完成计时</button>
                </block>
              </view>
              <view class="ks-item-right" @click.stop="jumpTestSwitch(item)">
                <image
                  src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/left-slide-operation/start.png"
                  mode="scaleToFill" />
              </view>
              <view class="ks-item-tag" v-if="item.TodayNumber > 0">今日完成考试 <label>{{ item.TodayNumber
                  }}</label>
                次</view>
            </view>
          </left-slide-operation>
        </view>
      </view>
    </view>

    <movable-view x="305" y="580" direction="all" class="add" @click="addBtn()">
      <i class="iconfont">&#xe600;</i>
    </movable-view>

    <view class="Tips" v-if="flag">
      <view class="left">
        <view class="text">温馨提示</view>
        <view>点击项目右侧可编辑，长按拖动可排序，左滑可以操作更多</view>
      </view>
      <view class="right" @click="bzts()"> 不再提示 </view>
    </view>
  </movable-area>
</template>

<script>
import leftSlideOperation from "@/pageFive/components/left-slide-operation/left-slide-operation.vue";
export default {
  data() {
    return {
      list: [],
      flag: true, //	不再提示 显示标识
    };
  },
  components: { leftSlideOperation },
  onLoad() {
    console.log(getCurrentPages(), '++++++++');
    this.flag = uni.getStorageSync("bztsFlag") === false ? uni.getStorageSync("bztsFlag") : true;
    this.list = uni.getStorageSync("examinationMode") ? JSON.parse(uni.getStorageSync("examinationMode")) : [];
    if (this.list.length == 0) {
      let defaultList = {	// 默认模式的数据
        SYTime: "120分",
        id: 1,
        name: "系统默认考试模式",
        shengyuValue: 7200,
        time: "120",
        timea: "115",
        timeb: "90",
        timec: "60",
        value: 0,
        totalQuestion: 0,
        TodayNumber: 0,		//	今日完成次数
        endFlag: false,		//	是否完成
        endNumber: 0,		//	总计完成考试次数
        endTime: 0,			//	总计考试时长
        // date: new Date().getDate(), 	// 日期
        date: 21, 	// 日期
        clickNumber: 0,
        shengyuText: '2小时',
        endFlag: true
      }
      this.list = [defaultList]
      uni.setStorageSync("examinationMode", JSON.stringify(this.list))
    } else {
      //	有数据的情况下获取当前日期  判断数据中的日期和当前日期是否一致，不一致 将所有数据中的 日期替换， 今日完成次数归零，
      let TodayNumber = new Date().getDate()
      if (new Date().getDate() != this.list[0].date) {
        this.list.forEach(item => {
          item.date = new Date().getDate();
          item.TodayNumber = 0;
          item.totalQuestion = 0;
        })
        uni.setStorageSync("examinationMode", JSON.stringify(this.list))
      }

    }
  },
  onShow() {		//	在上个页面返回后 获取修改后的数据重新渲染
    let arr = JSON.parse(uni.getStorageSync("examinationMode"))
    this.list = arr
  },
  onHide() {
    this.initRefs()
  },
  
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '考试模式',
      path: '/pageFive/work/examination/index',
    };
  },
  methods: {
    bzts() {
      this.flag = false
      uni.setStorageSync("bztsFlag", this.flag)
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
      const modal = await this.$api.modal('删除后不可恢复哦~', '确定删除当前考试计时器吗？', ['取消', '确定'])
      this.initRefs()
      if (modal) {
        let arr = JSON.parse(uni.getStorageSync("examinationMode"))
        var index = arr.findIndex(item => item.id == key.id)
        arr.splice(index, 1,)
        uni.setStorageSync("examinationMode", JSON.stringify(arr))
        uni.showToast({ title: "删除成功" })
        this.list = JSON.parse(uni.getStorageSync("examinationMode"))
      }
    },

    itemTouchStart(item) {
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
    },
    //	开始计时器
    jumpTestSwitch(item) {
      this.$tab.navigateTo('/pageFive/work/examination/testSwitch?id=' + item.id)
    },
    //	跳转详情
    jumpTestInfo(item, val) {
      //  val: 1  系统默认模式 不需要删除按钮
      if (val === '1') {
        this.$tab.navigateTo('/pageFive/work/examination/clock?saveFlag=1&id=' + item.id)
      } else {
        this.$tab.navigateTo('/pageFive/work/examination/clock?saveFlag=0&id=' + item.id)
      }
    },
    //	添加模式
    addBtn() {
      this.$tab.navigateTo('/pageFive/work/examination/clock?saveFlag=1')
    },

    //	转时间
    convert(val) {
      let a = Math.floor(val / 60 / 60)
      let b = Math.floor((val - (a * 60 * 60)) / 60)
      let c = val % 60;	// 秒
      let d = (a ? a + " 小时 " : '') + (b ? b + " 分钟 " : '') + (c + " 秒")
      return (a ? a + " 小时 " : '') + (b ? b + " 分钟 " : '') + (c + " 秒");
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

/* 内容 */
.ks-item {
  height: 204rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 16rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background: $uni-text-color-inverse;
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
        width: 44rpx;
        height: 44rpx;
        margin: 0rpx 0rpx 0 29rpx;
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

      // .label::before {
      //   content: '';
      //   display: block;
      //   width: 2rpx;
      //   height: 2rpx;
      //   border-radius: 2rpx;
      //   background: $uni-text-color-grey;
      //   position: absolute;
      //   top: 6rpx;
      //   left: 0;
      // }

      .cutDown {
        font-size: 28rpx;
        color: $uni-color-primary;
        margin-left: 20rpx;
      }
    }

    .cutDownBtn {
      max-width: 200rpx;
      line-height: 50rpx;
      font-size: 26rpx;
      font-weight: 400;
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

    image {
      width: 52rpx;
      height: 52rpx;
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
</style>