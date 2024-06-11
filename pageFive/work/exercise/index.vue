<template>
  <view class="page doIndex">
    <topdate />
    <!-- 0 政治 1 外语 2数学 -->
    <Top :type="0" :courseOutlineType="0" ref="topRef"></Top>
    <view class="doIndex-icons">
      <view class="doIndex-icons-item" @click="Mrst()">
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/exercise/6.png"
          mode="scaleToFill" />
        <text>每日刷题</text>
      </view>
      <view class="doIndex-icons-item" @click="toWrongQues(0)">
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/exercise/7.png"
          mode="scaleToFill" />
        <text>我的收藏</text>
      </view>
      <view class="doIndex-icons-item" @click="toWrongQues(1)">
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/exercise/8.png"
          mode="scaleToFill" />
        <text>我的错题库</text>
      </view>
      <view class="doIndex-icons-item" @click="toFn()">
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/exercise/9.png"
          mode="scaleToFill" />
        <text>学习报告</text>
      </view>
    </view>
    <view class="doIndex-fl">
      <view class="doIndex-fl-left" @click="mstkFn(0)">
        <view class="title">名师题库</view>
        <view class="des">主流题库全收录</view>
        <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/exercise/2.png"
          mode="scaleToFill" />
      </view>
      <view class="doIndex-fl-right">
        <view class="doIndex-fl-right-1" @click="jxtkFn">
          <view class="title">精选题库</view>
          <view class="des">把握考点大方向</view>
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/exercise/3.png"
            mode="scaleToFill" />
        </view>
        <view class="doIndex-fl-right-2" @click="goZtst">
          <view class="title">真题刷题</view>
          <view class="des">精准实战体验</view>
          <image src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/work/exercise/1.png"
            mode="scaleToFill" />
        </view>
      </view>
    </view>
    <view class="label" v-if="list.length">真题刷题</view>
    <view class="zt-list" v-if="list.length">
      <view class="list">
        <view class="li" v-for="(item, index) in list" :key='index' @click="liBtn(item)">
          <view class="liTop"> {{ item.course_outline_name }} </view>
          <view class="liBottom">
            <view class="liBottomLeft1"> {{ item.userCount }}人已作答 </view>
            <view v-if="!item.overcount" class="liBottomRight1"> 开始 </view>
            <view v-else class="liBottomRight2"> 继续练习 </view>
          </view>
        </view>
        <uni-load-more :status="loadingStatus"></uni-load-more>
      </view>
    </view>
  </view>
</template>

<script>
import topdate from '@/components/top-date/top-date'
import { selectRightRate, selectLevelOneList } from '@/api/work/english.js'
import Top from '../components/top.vue'
export default {
  components: {
    topdate,
    Top
  },
  data() {
    return {
      list: [],
      total: 0,
      obj: {
        courseOutlineType: 0, // 0 政治 1 外语 2数学
        affiliationmodule: 2, //  0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点
        pageNum: 1,
        pageSize: 10,
      },
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more',
      againStydyAuto: false,
      courseId: '',
    }
  },
  mounted() {
    this.getList()
  },
  onReachBottom() {
    console.log('触发2')
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  onPullDownRefresh() {
    this.enablePullDownRefreshFn()
    uni.stopPullDownRefresh();//停止刷新
  },
  onShow() {
    this.$refs.topRef.selectRankInfoFn()
    this.initData()
    this.getList()
    if (this.againStydyAuto) {
      this.$tab.navigateTo('/pageSec/work/exercise/section/doing?isShowDtk=false&id=' + this.courseId + '&affiliationModule=2&isReviewTask=1&type=0')
      this.againStydyAuto = false
      // this.$tab.navigateTo('/pageSec/work/exercise/section/doing?type=0&isReviewTask=1&isShowDtk=false&affiliationModule=' + this.affiliationModule + '&id=' + this.courseId)
    }
  },
  
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '政治刷题',
      path: '/pageFive/work/exercise/index',
    };
  },
  methods: {
    initData() {
      this.obj.pageNum = 1
      this.loadingStatus = 'more'
      this.list = []
    },
    // 下拉刷新回调
    enablePullDownRefreshFn() {
      console.log('下拉刷新-----')
      this.$refs.topRef.selectRankInfoFn()
      this.getList()
    },
    // 获取列表数据
    async getList() {
      const { rows, total } = await selectLevelOneList(this.obj)
      this.list = this.list.concat(rows)
      this.total = total
      if (this.total <= 10) {
        this.loadingStatus = 'nomore'
      }
    },
    //上拉加载获取更多
    async getmoreActives() {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      if (this.list.length < this.total) {
        this.obj.pageNum++
        await this.getList()
      } else {
        this.loadingStatus = 'nomore';
      }
    },
    jxtkFn() {
      this.$tab.navigateTo('/pageSec/work/exercise/section/list?courseOutlineType=0&affiliationmodule=1')
    },
    goPage() {
      this.$tab.navigateTo('/pageFive/work/rankingList/index')
    },
    goZtst() {
      this.$tab.navigateTo('/pageSec/work/mathematics/brushQuestions/index?TabFlag=false&courseOutlineType=0&affiliationmodule=2')
    },
    mstkFn() {
      this.$tab.navigateTo('/pageSec/work/mathematics/questionBank/index?affiliationmodule=0&courseOutlineType=0&level=3')
    },
    Mrst() {
      this.$tab.navigateTo("/pageSec/work/mathematics/dailyQuizzes/index?affiliationmodule=3&courseOutlineType=0&level=2")
    },
    toWrongQues(type) {
      this.$tab.navigateTo('/pageSec/work/english/collectPage?courseOutlineType=0&type=' + type)
    },
    toFn() {
      this.$tab.navigateTo(`/pageSec/work/english/studyReport?typeVal=politics`)
    },
    // 刷题 详情页
    liBtn(item) {
      console.log('item: ', item);
      var isReviewTask = 0
      if (item.allCount === item.overcount) {
        isReviewTask = 1
      }
      this.$tab.navigateTo('/pageSec/work/exercise/section/doing?isShowDtk=false&id=' + item.course_id + '&affiliationModule=2&isReviewTask=' + isReviewTask + '&type=0')
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
      height: 168rpx;
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
        top: 44rpx;
        right: 24rpx;
      }
    }
  }

  &-icons {
    // width: calc(100% - 60rpx);
    // margin-left: 32rpx;
    margin-top: 48rpx;
    @include flexBetween;

    &-item {
      width: 144rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      image {
        width: 80rpx;
        height: 80rpx;
      }

      text {
        margin-top: 16rpx;
        font-size: 26rpx;
        font-weight: 600;
        line-height: 34rpx;
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

.list {
  width: calc(100%- 30px);
  margin-top: 16px;
  border-radius: 8px;

  .liBottomLeft1 {
    font-size: 22rpx;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }

  >.li {
    height: 78px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 5px;
    padding: 0 9px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    border-radius: 8rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px -1px 14rpx 3rpx rgba(153, 153, 153, 0.1);

    >.liBottom {
      display: flex;
      justify-content: space-between;
      font-size: 12px;

      >.liBottomRight1 {
        font-weight: 400;
        width: 130rpx;
        height: 40rpx;
        border-radius: 10px;
        border: 0.5px solid rgba(252, 81, 95, 1);
        box-sizing: content;
        text-align: center;
        line-height: 40rpx;
        color: rgba(252, 81, 95, 1);
      }

      >.liBottomRight2 {
        font-weight: 400;
        width: 130rpx;
        height: 40rpx;
        line-height: 40rpx;
        border-radius: 10px;
        background: rgba(255, 247, 248, 1);
        text-align: center;
        color: rgba(252, 81, 95, 1);
      }
    }
  }
}
</style>
