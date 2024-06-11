计划设置页面
<template>
  <view class="wrap">
    <view class="flexBox">

      <view class="left">
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/english/english-dd.png"
          mode="scaleToFill"
        />
        <view class="fSize32">每日学习计划</view>

      </view>
      <view class="fSize24">预计完成时间:{{dateVal}}</view>
    </view>
    <view>
      <view class="numBox">已完成: {{ overWordCount }}/{{ allWordCount }}</view>
      <view class="planSet-title">
        <view class="planSet-title-num">每日背词数</view>
        <view></view>
        <view class="planSet-title-finishNum">完成天数</view>
      </view>
      <picker-view
        class="picker-view"
        :indicator-style="indicatorStyle"
        :value="value"
        @change="bindChange"
        indicator-class="picker-box"
        :mask-top-style="maskTopStyle"
        :mask-bottom-style="maskBottomStyle"
        :immediate-change="true"
      >
        <picker-view-column class="picker-view-column">
          <view
            :class="item === dataList[value[0]] ? 'active item' :'item'"
            v-for="(item,index) in dataList"
            :key="index"
          ><text class="text">新词{{item}}个</text></view>
        </picker-view-column>
        <picker-view-column class="picker-view-column">
          <view :class="isSet?'active item':'active item hiddenBox'"><text class="text">复习{{todayreviewwordnum || 0}}个</text></view>
          <!-- <view
            :class="item === dataList[value[1]] ? 'active item' :'item'"
            v-for="(item,index) in dataList"
            :key="index"
          ><text class="text">复习{{item}}个</text>
          </view> -->
        </picker-view-column>
        <picker-view-column class="picker-view-column">
          <view class="active item"><text class="text">{{needday || 0}}天</text></view>
        </picker-view-column>
      </picker-view>
      <view>
        <button
          class="word-btn"
          @click="saveFn"
        >完成设置</button>
      </view>
    </view>
  </view>
</template>
<script>
// import pickerView from '@/components/picker-view/picker-view'
import { selectPlanByUserId, planset, planEdit, selectAllWordCount, selectOverWordCount } from '@/api/work/english'
export default {
  data() {
    const date = new Date()
    const years = []
    const year = date.getFullYear()
    const months = []
    const month = date.getMonth() + 1
    const days = []
    const day = date.getDate()
    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i)
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i)
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }
    return {
      title: 'picker-view',
      years,
      year,
      months,
      month,
      days,
      day,
      value: [9999, month - 1, day - 1],
      visible: true,
      // indicatorStyle: `height: 50px;`,
      dateVal: '',
      isSet: false,
      columns: [
        ['男', '女']
      ],
      value: [0, 0, 0],
      dataList: [
        '15', '20',
        '25', '30',
        '35', '40',
        '45', '50',
      ],
      day: [
        '10', '20',
        '30', '40',
        '50', '60',
      ],
      indicatorStyle: 'height: 88rpx;background: #FFF7F8;z-index:0;color:#FC515F;font-size: 32rpx;font-weight: 600;',
      id: 0,
      allWordCount: 0, //单词总数
      overWordCount: 0, //进度
      needday: 0, //需要复习天数
      todayreviewwordnum: 0, //今日复习单词数
      isFlag: false, //已设置过计划，但是计划已完成，需要重新设置
    }
  },
  onLoad(data) {
    this.isFlag = data.isFlag
  },
  onShow() {
    this.getSelectOverWordCount()
    this.getSelectAllWordCount()
    this.getNow()
    if (this.isFlag == 'true') {
      return
    } else {
      this.selectPlanByUserIdFn()

    }
    console.log(this.isFlag, 'this.isFlag---')


  },
  methods: {
    // 获取单词总数
    getSelectAllWordCount() {
      selectAllWordCount().then(res => {
        if (res.code === 200) {
          console.log('res: ', res);
          this.allWordCount = res.data
          if (this.isFlag == 'true') {
            this.needday = this.getNeedDay()
            let date = this.getDate(new Date())
            this.dateVal = this.addDate(date, this.needday)
            console.log('this.dateVal: ', this.dateVal);
          }
        }
      })
    },
    getSelectOverWordCount() {
      selectOverWordCount().then(res => {
        if (res.code === 200) {
          console.log('res: ', res);
          this.overWordCount = res.data
        }
      })
    },
    selectPlanByUserIdFn() {
      selectPlanByUserId().then(res => {
        if (res.code === 200) {
          if (res.data) {

            console.log('进这里了吗')
            this.id = res.data.id
            this.isSet = true
            let value1 = 0
            let value2 = 0
            let value3 = 0
            this.todayreviewwordnum = res.data.todayreviewwordnum
            this.dataList.forEach((item, index) => {
              if (+res.data.everydaywordnum === +item) {
                console.log(index);
                value1 = index
              }
              if (+res.data.todayreviewwordnum === +item) {
                value2 = index
              }
            })
            this.day.forEach((item, index) => {
              if (+res.data.needday === +item) {
                value3 = index
              }
            })
            this.value = [value1]
            let date = this.getDate(new Date())
            this.dateVal = this.addDate(date, this.needday)
            this.dateVal = res.data.overTime
            this.needday = res.data.needday
          } else {
            // 未设置
            this.isSet = false
          }
        }
        // this.needday = this.getNeedDay()
        console.log(this.isSet, 'this.needday: ', this.needday);
      })
    },
    bindChange(e) {
      console.log('e: ', e);
      this.value = e.detail.value
      let date = this.getDate(new Date())
      this.needday = this.getNeedDay()
      this.dateVal = this.addDate(date, this.needday)
      return
      if (this.isSet) {
        this.dateVal = this.addDate(date, this.needday + 1)
      } else {
        this.dateVal = this.addDate(date, this.needday)
      }


    },
    getNeedDay() {
      let val = parseInt(this.allWordCount)
      console.log('val: ', val, '----', this.dataList[this.value[0]]);
      let needDay = Math.ceil(val / parseInt(this.dataList[this.value[0]]));
      return needDay
    },
    saveFn() {
      if (!this.allWordCount || this.allWordCount == 0) {
        uni.showToast({
          title: "题库正在建设中。。。",
          icon: 'none',
        })
        return
      }
      var everydaywordnum = ''
      var todayreviewwordnum = ''
      var needday = ''
      if (this.isSet) {
        everydaywordnum = this.dataList[this.value[0]]
        todayreviewwordnum = this.todayreviewwordnum
        needday = this.needday
        planEdit({
          everydaywordnum: everydaywordnum,
          todayreviewwordnum: todayreviewwordnum,
          needday: needday,
          id: this.id,
          overTime: this.dateVal
        }).then(res => {
          if (res.code === 200) {
            console.log(res)
            uni.showToast({
              title: "设置成功",
              icon: 'none',
            })
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 1000)

          }
        })
      } else {
        everydaywordnum = this.dataList[this.value[0]]
        needday = this.needday
        planset({
          everydaywordnum: everydaywordnum,
          needday: needday,
          startTime: this.getDate(new Date()),
          overTime: this.dateVal
        }).then(res => {
          if (res.code === 200) {
            console.log('res: ', res);
            uni.showToast({
              title: "设置成功",
              icon: 'none',
            })
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 1000)
          }
        })
      }


      // this.$tab.reLaunch('/pageFive/work/english/index')
    },
    getNow() {
      this.dateVal = this.getDate(new Date())
    },
    getDate(date) {
      var date = new Date(date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    },
    addDate(date, days) {
      if (days === undefined || days === '') {
        days = 1
      }
      var date = new Date()
      date.setDate(parseInt(date.getDate()) + parseInt(days));
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var mm = "'" + month + "'";
      var dd = "'" + day + "'";
      // 单位前面加0
      if (mm.length == 3) {
        month = "0" + month;
      }
      if (dd.length == 3) {
        day = "0" + day;
      }
      var time = date.getFullYear() + "-" + month + "-" + day;
      return time;
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  padding: 30rpx;
  min-height: 100vh;
  background: $uni-bg-color;

  .flexBox {
    display: flex;
    justify-content: space-between;
    height: 86rpx;
    padding: 26rpx 16rpx;
    line-height: 86rpx;
    .left {
      display: flex;
      align-items: center;
      image {
        width: 36rpx;
        height: 22rpx;
        margin-right: 16rpx;
      }
      .fSize32 {
        font-size: 32rpx;
        color: $uni-text-color;
        font-weight: 600;
        line-height: 33.6rpx;
      }
    }
    .fSize24 {
      font-size: 26rpx;
      letter-spacing: 0rpx;
      line-height: 33.6rpx;
      font-weight: 600;
      color: $uni-color-primary;
    }
  }
  .numBox {
    text-align: right;
    font-weight: bold;
    margin: 51rpx 20rpx 20rpx;
  }
  .picker-view {
    height: 400rpx;
    margin-top: 20rpx;
  }
  .item {
    height: 88rpx !important;
    // line-height: 93rpx;
    font-size: 26rpx;
    color: $uni-text-color-grey;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .picker-box {
    width: 100%;
    height: 88rpx;
    background: $uni-color-english-pickerColor;
    font-size: 32rpx;
  }
  .active {
    color: $uni-color-primary;
    font-size: 32rpx;
    font-weight: 600;
  }
  .planSet-title {
    width: 100%;
    height: 88rpx;
    margin-top: 60rpx;
    border-radius: 16rpx;
    background: $uni-color-bg;
    color: $uni-text-color-blank;
    font-size: 28rpx;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    view {
      width: 33%;
      text-align: center;
    }
    .planSet-title-num {
      // width: 140rpx;
      // height: 40rpx;
      line-height: 88rpx;
      // margin-left: 126rpx;
    }
    .planSet-title-finishNum {
      // width: 112rpx;
      // height: 40rpx;
      // margin-left: 262rpx;
      line-height: 88rpx;
    }
  }
  .word-btn {
    width: 100%;
    height: 80rpx;
    opacity: 1;
    border-radius: 16rpx;
    background: $uni-color-primary;
    color: $uni-text-color-inverse;
    font-size: 32rpx;
    font-weight: 600;
    margin-top: 80rpx;
  }
  .hiddenBox {
    visibility: hidden;
  }
}
</style>