<template>
  <view class="page">
    <view class="li" style="background: #FFFFFF; border-radius: 16rpx;">
      <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/Brushquestions/img1.png"
        mode=""></image>
      <view class="middle">
        <view class="titleTop"> {{ formObj.course_outline_name }}</view>
        <view class="middleBottom"> 共 {{ formObj.allPointCount || 0 }} 个考点 </view>
      </view>
      <view class="right" @click="takeNoteFn()"> <i class="iconfont icon">&#xe623;</i> 重选科目 </view>
    </view>
    <view v-if="studyObj && studyObj.course_outline_name" class="h1"> <i class="borleds"></i> <i class="titless">当前练习</i>
    </view>

    <view v-if="studyObj && studyObj.course_outline_name" class="current">
      <view class="top">
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/Brushquestions/img1.png"
          mode=""></image>
        <view class="right">
          <view class="titleTop"> {{ studyObj.course_outline_name }} </view>
          <view class="right-jd">
            <!-- <view class="bar"> -->
            <view class="progress-big">
              <view class="progress-small" :style="'width:' + percent + '%'"></view>
            </view>
            <!-- <progress
                class="doIndex-schedule-progress"
                :percent="percent"
                backgroundColor="rgb(255,247,248)"
                activeColor="rgb(252,81,95)"
                stroke-width="8"
                border-radius="5"
              /> -->
            <!-- <view
                class="barRed"
                :style="'width:'+(studyObj.overRate || 0)"
              ></view> -->
            <!-- </view> -->
          </view>
          <view class="text">
            <text>学习进度：</text>
            <text>{{ studyObj.overRate || 0 }}</text>
          </view>
        </view>
      </view>
      <view class="bottom" @click="jxxx(studyObj)"> 继续学习 </view>
    </view>

    <view class="special">
      <view class="h1"> <i class="borleds"></i> <i class="titless">专项练习</i> </view>
      <view class="list" v-if="dataList && dataList.length > 0">
        <view class="li Li" v-for="(item, index) in dataList" :key="index" @click="jxxx(item)">
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/Brushquestions/img1.png"
            mode=""></image>
          <view class="middle">
            <view class="titleTop"> {{ item.course_outline_name }}</view>
            <view class="middleBottom"> 共 {{ item.pointCount || 0 }} 个考点 </view>
          </view>
        </view>
      </view>
      <view v-else>
        <uni-default-page value="4"></uni-default-page>
      </view>
    </view>

    <uni-popup ref="popup" type="bottom">
      <view class="takeNote">
        <view class="li Li" v-for="(item, index) in kdList" :key="index" @click="subjectBtn(index)">
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/Brushquestions/img1.png"
            mode=""></image>
          <view class="middle">
            <view class="titleTop"> {{ item.course_outline_name }}</view>
            <view class="middleBottom"> 共 {{ item.allPointCount || 0 }} 个考点 </view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { selectLevelOneList } from '@/api/work/english'
import { selectSubjectMap } from '@/api/work/math'
import uniDefaultPage from '@/pageSec/components/uni-default-page/uni-default-page.vue';
export default {
  data() {
    return {
      kdList: [], //考点列表
      dataList: [], //专项练习
      formObj: {
        course_outline_name: '',
        pointCount: 0,

      }, //当前选择科目
      studyObj: {}, //当前练习科目
      percent: 0,
      chooseItem: 0, //当前科目index

    }
  },
  components: { uniDefaultPage },
  onShow() {
    this.dataList = []
    this.selectLevelOneListFn(this.chooseItem)
  },
  // mounted() {
  //   this.selectLevelOneListFn()
  // },
  onPullDownRefresh() {
    this.enablePullDownRefreshFn()
    uni.stopPullDownRefresh();//停止刷新
  },
  methods: {
    // 下拉刷新回调
    enablePullDownRefreshFn() {
      this.selectLevelOneListFn(this.chooseItem)
    },
    handEmit() {
      this.$tab.navigateBack(1)
    },
    selectLevelOneListFn(chooseItem) {
      selectLevelOneList({
        courseOutlineType: 2, //0 政治  2数学
        affiliationmodule: 5 // 所属模块    0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点
      }).then(res => {
        if (res.code === 200) {
          this.dataList = []
          this.studyObj = {}
          if (res.rows && res.rows.length > 0) {
            res.rows[chooseItem].childList.forEach(item => {
              // isCurrent是否当前练习 0否 1是
              if (item.isCurrent == 1) {
                this.studyObj = item
                this.percent = (this.studyObj.overRate) ? this.studyObj.overRate.split('%')[0] : 0
                // this.percent = (this.studyObj.overRate / this.studyObj.pointCount) * 100 || 0
              }
              if (!item.isCurrent) {
                this.dataList.push(item)
              }
            })

          }
          // this.selectSubjectMapFn(res.rows[0].course_id)
          // 计算每个一级分类的总考点
          res.rows.forEach(item => {
            item.allPointCount = 0
            item.childList.forEach(item1 => {
              item.allPointCount += item1.pointCount
            })
          })
          this.formObj = res.rows[chooseItem]
          this.kdList = res.rows
        }
      })
    },
    // selectSubjectMapFn(courseId) {
    //   selectSubjectMap({ courseId }).then(res => {
    //     this.studyObj = res.data.menuList[0]
    //     this.dataList = res.data.menuList
    //   })
    // },
    //	重选科目
    takeNoteFn() {
      this.$refs.popup.open()
    },

    //	专项选择 
    // specialBtn(data) {
    //   this.$tab.navigateTo('/pageSec/work/exercise/section/doing?isShowDtk=false&id=' + this.kdList[data].course_id + '&affiliationModule=4&isReviewTask=0' + '&type=2')
    // },

    //	科目关闭
    subjectBtn(data) {
      this.chooseItem = data
      console.log('data: ', data);
      this.studyObj = {}
      this.dataList = []
      console.log('data: ', data);
      this.$refs.popup.close()
      this.formObj = this.kdList[data]
      console.log('this.kdList[data]: ', this.kdList[data]);
      if (this.kdList[data] && this.kdList[data].childList.length > 0) {
        console.log('zouzheli')
        this.kdList[data].childList.forEach(item => {
          console.log('item: ', item.isCurrent);
          // isCurrent是否当前练习 0否 1是
          if (item.isCurrent === 1) {
            this.studyObj = item
            this.percent = (this.studyObj.overRate) ? this.studyObj.overRate.split('%')[0] : 0
            // this.percent = (this.studyObj.overRate / this.studyObj.pointCount) * 100 || 0
          }
          if (!item.isCurrent) {
            this.dataList.push(item)
            console.log(' this.dataList: ', this.dataList);
          }
        })

      }
      // this.selectSubjectMapFn(this.kdList[data].course_id)
    },

    //	继续学习
    jxxx(item) {
      console.log('点击跳转: ', item);
      // this.$tab.navigateTo('/pageSec/work/exercise/section/doing?isShowDtk=false&id=' + row.course_id + '&affiliationModule=4&isReviewTask=0' + '&type=2')

      this.$tab.navigateTo('/pageSec/work/exercise/section/index?courseOutlineType=2&courseid=' + item.course_id)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  margin: 32rpx 30rpx;
  width: calc(100% - 60rpx);
}

.li {
  width: calc(100%);
  display: flex;
  align-items: center;
  padding: 32rpx 16rpx;
  box-sizing: border-box;
  // border-radius: 16rpx;
  // background: #FFFFFF;

  >image {
    width: 90rpx;
    height: 90rpx;
    margin-right: 28rpx;
  }

  >.middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >.middleBottom {
      font-size: 23rpx;
      font-weight: 400;
      line-height: 33.6rpx;
      color: $uni-text-color-grey;
      margin-top: 8rpx;
    }
  }

  >.right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 165rpx;
    height: 50rpx;
    border-radius: 8rpx;
    background: rgba(255, 255, 255, 1);
    border: 2rpx solid $uni-text-color-placeholder;
    font-size: 26rpx;
    font-weight: 600;
    line-height: 33.6rpx;
    color: $uni-text-color-placeholder;

    >.icon {
      font-size: 23rpx;
      margin-right: 8rpx;
    }
  }
}

.h1 {
  margin: 32rpx 0rpx;
  padding: 0 16rpx;
  display: flex;
  align-items: center;

  .borleds {
    width: 6rpx;
    height: 30rpx;
    opacity: 1;
    border-radius: 16rpx;
    background: $uni-text-color-placeholder;
    margin-right: 16rpx;
  }

  .titless {
    font-size: 32rpx;
    font-weight: 600;
    color: $uni-text-color;
  }
}

.current {
  background: #fff;
  height: 287rpx;
  border-radius: 16rpx;
  padding: 34rpx 16rpx;

  >.top {
    width: 100%;
    display: flex;
    // justify-content: space-between;

    >image {
      width: 110rpx;
      height: 131rpx;
    }

    .right {
      margin-left: 55rpx;
    }

    .right-jd {
      @include alignCenter;
      margin: 26rpx 0 12rpx;

      text {
        font-size: 28rpx;
      }

      .bar {
        width: 450rpx;
        height: 16rpx;
        border-radius: 8rpx;
        background: $uni-bg-color-tag;
        position: relative;

        .barRed {
          height: 16rpx;
          border-radius: 8rpx;
          background: $uni-color-primary;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }

    .text {
      display: flex;
      justify-content: space-between;
      font-size: 26rpx;
      font-weight: 400;
      color: $uni-text-color-grey;
    }
  }

  .bottom {
    width: 330rpx;
    height: 56rpx;
    line-height: 56rpx;
    border-radius: 236rpx;
    background: $uni-color-primary;
    color: #fff;
    font-size: 28rpx;
    font-weight: 600;
    margin: 0 auto;
    margin-top: 34rpx;
    text-align: center;
  }
}

.list {
  background: #fff;
  border-radius: 26rpx;
  margin: 32rpx 0rpx;
}

.Li {
  border: 2rpx solid rgba(246, 248, 253, 1);
  margin: 0 auto;

}

.takeNote {
  background: $uni-color-bg-gray;
  padding: 32rpx 32rpx 90rpx 32rpx;
  position: relative;
  bottom: -68rpx;
  border-top-left-radius: 32rpx;
  border-top-right-radius: 32rpx;

  &-header {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    font-weight: 400;
    color: $uni-text-color;
    padding: 20rpx 40rpx;
    border-radius: 16rpx;
    background: $uni-text-color-inverse;

    image {
      width: 64rpx;
      height: 64rpx;
      margin-right: 36rpx;
    }
  }
}

.titleTop {
  font-size: 28rpx;
  font-weight: 600;
  line-height: 39.2rpx;
  color: rgba(51, 51, 51, 1);
}

.progress-big {
  width: 504rpx;
  height: 16rpx;
  background: rgb(255, 247, 248);
  border-radius: 442rpx;

  .progress-small {
    background: rgb(252, 81, 95);
    border-radius: 220rpx;
    height: 16rpx;
  }
}
</style>