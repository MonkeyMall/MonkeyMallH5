 <template>
  <view class="page doIndex">
    <topDate />
    <view class="doIndex-tab">
      <view class="doIndex-tab-item">
        <view class="doIndex-tab-item-text">坚持天数</view>
        <view class="doIndex-tab-item-day">{{valObj.signDays || 0}}
          <view class="doIndex-tab-item-dw">天</view>
        </view>
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/english-1.png"
          mode="scaleToFill"
          class="imagTag"
        />
      </view>
      <view class="doIndex-tab-item">
        <view class="doIndex-tab-item-text">计划剩余</view>
        <view class="doIndex-tab-item-day">{{valObj.haveDays || 0}}
          <view class="doIndex-tab-item-dw">天</view>
        </view>
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/english-2.png"
          mode="scaleToFill"
          class="imagTag"
        />
      </view>

    </view>
    <view class="doIndex-tab">
      <view class="doIndex-tab-item">
        <view class="doIndex-tab-item-text">今日新词任务</view>
        <view class="doIndex-tab-item-day">{{valObj.todayNewCount || 0}}
          <view class="doIndex-tab-item-dw">个</view>
        </view>
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/english-3.png"
          mode="scaleToFill"
          class="imagTag"
        />
      </view>
      <view class="doIndex-tab-item">
        <view class="doIndex-tab-item-text">今日复习任务</view>
        <view class="doIndex-tab-item-day">{{valObj.todayReviewCount || 0}}
          <view class="doIndex-tab-item-dw">个</view>
        </view>
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/english-4.png"
          mode="scaleToFill"
          class="imagTag"
        />
      </view>
    </view>
    <view class="doIndex-schedule">
      <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/english-5.png"></image>
      <view class="doIndex-schedule-content">
        <view class="doIndex-schedule-content-num">考研英语单词进度</view>
          <view class="doIndex-schedule-content-num-bl">
            <text>{{valObj.overWordCount || 0}}</text>
            /{{valObj.allWordCount || 0}}</view>
          <!-- <progress
            class="doIndex-schedule-content-progress"
            :percent="progress"
            backgroundColor="#E6EEFF"
            activeColor="#467CFA"
            stroke-width="8"
            border-radius="5"
          /> -->
          <view class="progress-big">
              <view
                class="progress-small"
                :style="'width:'+progress +'%'"
              ></view>
            </view>
          <view style="width: 690rpx;"> 
            <view  class="doIndex-schedule-content-btn" @click="toWordPage('wordTest')">
              开始背单词
            </view>
            <!-- <button
              class="doIndex-schedule-content-btn"
              @click="toWordPage('wordTest')"
            >开始背单词</button> -->
          </view>
      </view>

    </view>
    <view class="doIndex-icons">
      <view
        class="doIndex-icons-item"
        @click="toFn('wordBook')"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/english-6.png"
          mode="scaleToFill"
        />
        <text>单词本</text>
      </view>
      <view
        class="doIndex-icons-item"
        @click="toWordPage('reviewWord')"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/english-7.png"
          mode="scaleToFill"
        />
        <text>复习任务</text>
      </view>
      <view
        class="doIndex-icons-item"
        @click="toFn('planSet')"
      >
        <image
          style="transform: scale(1.3);margin-left: 30rpx;margin-top: 20rpx;"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/english-8.png"
          mode="scaleToFill"
        />
        <text>计划设置</text>
      </view>
      <view
        class="doIndex-icons-item"
        @click="toFn('studyReport')"
      >
        <image
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index2/english-9.png"
          mode="scaleToFill"
        />
        <text>我的学习报告</text>
      </view>
    </view>
  </view>
</template>
  
<script>
import topDate from 'components/top-date/top-date'
import { getSelectPlanInfo, selectPlanByUserId, getNextWord } from '@/api/work/english'
export default {
  components: { topDate },
  data() {
    return {
      progress: 50,
      errMsg: true,
      valObj: {}
    }
  },
  onShow(){
    this.getSelectPlanInfoFn()
    console.log('是否进入此页面--0')
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.enablePullDownRefreshFn()
    uni.stopPullDownRefresh();//停止刷新
  },
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '英语刷题',
      path: '/pageFive/work/english/index',
    };
  },
  methods: {
    // 下拉刷新回调
    enablePullDownRefreshFn() {
      console.log('下拉刷新-----')
      this.getSelectPlanInfoFn()
    },
    toWordPage(type) {
      if(type === 'wordTest'){
         // valObj.overWordCount 单词进度  valObj.todayNewCount今日新词任务
        //  今日新词任务和今日新词进度比较，如果今日新词任务大于等于今日新词进度，则需要重新设置计划
         let isFlag1 = this.valObj.toayOverWordCount > this.valObj.todayNewCount || this.valObj.toayOverWordCount === this.valObj.todayNewCount
        // 总单词进度和总单词数对比，如果相等代表已做完，已做完需要重新设置计划
         let isFlag2 = this.valObj.overWordCount === this.valObj.allWordCount
        //  是否计划剩余时间为0，为0的话需要重新设置计划
         let isFlag3 = this.valObj.haveDays == 0
         if(this.valObj.todayNewCount == 0){
          let that = this
          uni.showModal({
              title: '提示',
              content: '好的计划有助于我们快速提高，请先设置自己的学习计划吧～',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  that.$tab.navigateTo(`/pageSec/work/english/planSet?isFlag=true`)
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              }
            });
            return
          
         }
         if (isFlag1 ) {
          let that = this
            uni.showModal({
              title: '提示',
              content: '今日新词已完成',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              }
            });
            return
          }
          if (isFlag2 ) {
            let that = this
            uni.showModal({
              title: '提示',
              content: '所有单词已完成，请重新设置计划',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  that.$tab.navigateTo(`/pageSec/work/english/planSet?isFlag=true`)
                  // 跳转到计划设置页面
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              }
            });
            return
          }
          if(isFlag3){
            let that = this
            uni.showModal({
              title: '提示',
              content: '计划已到期，请重新设置计划',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  that.$tab.navigateTo(`/pageSec/work/english/planSet?isFlag=true`)
                  // 跳转到计划设置页面
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              }
            });
            return
          }
      }
     
      selectPlanByUserId().then(res => {
        console.log(res)
        if (res.code === 200) {
          if (res.data) {
            // 已设置学习计划
            getNextWord({
              subjectType: 1,
              type: type == 'reviewWord' ? '1' : '0'
            }).then(response => {
              if (response.code === 200) {
                if(response.data &&response.data.id){
                  this.$tab.navigateTo(`/pageSec/work/english/wordTest?pageName=` + type)
                }else{
                  uni.showToast({
                    title: "恭喜您完成此次刷题～  阳光万里，终将上岸",
                    icon: 'none',
                  })
                }
              }
            })
          } else {
            uni.showModal({
              title: '提示',
              content: '好的计划有助于我们快速提高，请先设置自己的学习计划吧～',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  this.$tab.navigateTo(`/pageSec/work/english/planSet`)
                  // console.log('用户点击确定');
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              }
            });
          }
        }
      })


    },
    toFn(val) {
      let isFlag = false
      if(val === 'planSet'){
        console.log(this.valObj.overWordCount,this.valObj.todayNewCount )
        
        // let result = parseInt(this.valObj.overWordCount) - parseInt(this.valObj.todayNewCount)
        // if((result>0 || result == 0) && this.valObj.allWordCount !=0){
        //   // 已设置过计划，但是计划已完成，需要重新设置
        //   isFlag = true
        // }
      }
      if (val === 'studyReport') {
        this.$tab.navigateTo(`/pageSec/work/english/studyReport?typeVal=english`)

      } else {
        this.$tab.navigateTo(`/pageSec/work/english/${val}`)
      }

    },
    getSelectPlanInfoFn() {
      getSelectPlanInfo().then(res => {
        console.log(res)
        this.valObj = res.data
        this.progress = (res.data.overWordCount / res.data.allWordCount) * 100
      })
    }
  }
}
</script>
  
<style lang="scss" scoped>
.page {
  padding: 30rpx;
  min-height: 100vh;
  background: $uni-bg-color;
}

.doIndex {
  &-header {
    width: 250rpx;
    height: 86rpx;
    padding: 26rpx 16rpx;
    @include flexBetween;

    &-left {
      width: 120rpx;
      height: 100%;
      font-size: 24rpx;
      color: $uni-text-color-blank;
      @include columnAlignStart;
      justify-content: center;

      .days {
        font-size: 28rpx;
        color: $uni-text-color;

        // margin-bottom: 20rpx;
        text {
          font-size: 40rpx;
          font-weight: 600;
          color: $uni-color-primary;
          margin-right: 8rpx;
        }
      }
    }

    image {
      width: 71rpx;
      height: 86rpx;
    }
  }

  &-tab {
    @include flexBetween;
    margin-top: 32rpx;

    // width: calc(100% - 60rpx);
    &-item {
      width: 330rpx;
      height: 119rpx;
      border-radius: 16rpx;
      background: $uni-text-color-inverse;
      box-shadow: 1px -1px 14px 3px rgba(153, 153, 153, 0.1);
      font-size: 24rpx;
      position: relative;

      &-text {
        font-weight: 600;
        margin: 16rpx 0 0 18rpx;
      }

      &-day {
        font-size: 32rpx;
        font-weight: 600;
        margin: 8rpx 0 8rpx 18rpx;
      }

      &-dw {
        font-size: 24rpx;
        display: inline-block;
      }

      &-pm {
        @include alignCenter;
        margin-left: 18rpx;

        image {
          width: 34rpx;
          height: 34rpx;
          margin-right: 16rpx;
        }

        text {
          margin-right: 8rpx;
          font-weight: 400;

          &.nums {
            margin-right: 12rpx;
            font-weight: 600;
          }
        }
      }

      .imagTag {
        width: 80rpx;
        height: 80rpx;
        position: absolute;
        top: 22rpx;
        right: 16rpx;
      }
    }
  }

  &-schedule {
    margin-top: 40rpx;
    position: relative;
    border-radius: 16rpx;
    image{
      width: 690rpx;
      height: 338rpx;
    }
    &-content{
      position: absolute;
      top: 0;
      &-num {
        padding: 32rpx 38rpx 0;
        font-size: 32rpx;
        font-weight: 600;
        letter-spacing: 0rpx;
        line-height: 33.6rpx;
        color: $uni-text-color;
        text-align: left;
        vertical-align: top;
        &-bl{
          padding: 32rpx 38rpx 24rpx 38rpx;
          font-size: 32rpx;
          font-weight: 600;
          text{
            color: #3568F5;
            margin-right: 4rpx;
            
          }
        }
      }

      &-progress {
        padding: 24rpx 27rpx 0;
      }
      .progress-big {
          width:638rpx;
          height: 16rpx;
          margin: auto;
          background:rgba(230, 238, 255, 1);
          border-radius: 442rpx;
          .progress-small {
            background: rgba(70, 124, 250, 1);
            border-radius: 220rpx;
            height: 16rpx;
          }
        }
      &-btn {
        // background: #CCCCCC;;
        text-align: center;
        width: 330rpx;
        border: 1rpx solid #467CFA;
        height: 80rpx;
        opacity: 1;
        border-radius: 236rpx;
        color: #467CFA;
        line-height: 80rpx;
        font-size: 28rpx;
        font-weight: 600;
        letter-spacing: 0rpx;
        margin: 32rpx auto;
      }
    }
    
  }

  &-icons {
    // width: calc(100% - 60rpx);
    // margin-left: 32rpx;
    margin-top: 32rpx;
    @include flexBetween;

    &-item {
      width: 160rpx;
      height: 184rpx;
      background: #F6F8FD;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border-radius: 16rpx;
      image {
        width: 80rpx;
        height: 80rpx;
        margin-top: 36rpx;
      }

      text {
        font-size: 26rpx;
        font-weight: 600;
        line-height: 80rpx;
        color: $uni-text-color;
      }
    }
  }

  &-fl {
    // width: calc(100% - 60rpx);
    display: flex;
    margin-top: 40rpx;

    .title {
      font-size: 28rpx;
      font-weight: 600;
      color: $uni-text-color;
    }

    .des {
      font-size: 24rpx;
      font-weight: 400;
      color: $uni-text-color-grey;
    }

    &-left {
      width: 330rpx;
      height: 330rpx;
      flex: 1;
      margin-right: 30rpx;
      border-radius: 16rpx;
      background: $uni-bg-color-tag;
      overflow: hidden;
      position: relative;

      .title {
        margin-top: 32rpx;
        margin-left: 16rpx;
      }

      .des {
        margin-top: 8rpx;
        margin-left: 16rpx;
      }

      image {
        width: 267rpx;
        height: 267rpx;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }

    &-right {
      flex: 1;

      &-1 {
        margin-bottom: 30rpx;
      }

      &-1,
      &-2 {
        height: 150rpx;
        border-radius: 16rpx;
        background: $uni-bg-color-tag;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          margin-bottom: 8rpx;
        }

        .title,
        .des {
          margin-left: 16rpx;
        }

        image {
          width: 150rpx;
          height: 150rpx;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }

  .label {
    font-size: 32rpx;
    font-weight: 600;
    color: $uni-text-color;
    margin: 32rpx 0;
  }
}
</style>
  