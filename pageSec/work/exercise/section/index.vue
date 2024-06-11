<template>
  <view class="page section-list">
    <view class="section-list-header">
      <view class="section-list-header-left">
        <image :src="info.course_pic || defaultImg.courseImg" mode="scaleToFill" />
      </view>
      <view class="section-list-header-right">
        <view class="section-list-header-right-title">{{ info.courseName }}</view>
        <view class="section-list-header-right-jd">
          学习进度：
          <text>{{ info.rate }}</text>
          <view class="bar">
            <view class="barRed" :style="{ 'width': info.rate }"></view>
          </view>
        </view>
        <view class="section-list-header-right-zql">已练习：{{ info.overCount }} / {{ info.allCount }}
          <text>正确率：{{ info.rightRate }}</text>
        </view>
      </view>
    </view>
    <view class="section-list-label">章节目录</view>
    <view class="section-list-list" v-if="list && list.length > 0">
      <view v-for="(item, index) in list" :key="index" class="section-list-list-item" @click="jumpDoing(item)">
        <view class="section-list-list-item-title">{{ item.course_outline_name }}</view>
        <view class="section-list-list-item-cons">
          <view class="section-list-list-item-cons-jd">{{ item.overCount === item.allCount ? '已完成' : '未完成' }}：{{
            item.overCount }} / {{ item.allCount }}</view>
          <view
            :class="!item.overCount ? 'section-list-list-item-cons-btn liBottomRight1' : 'section-list-list-item-cons-btn'">
            {{
              !item.overCount ? '开始' : '继续学习' }}</view>
        </view>
      </view>
      <uni-load-more :status="loadingStatus"></uni-load-more>
    </view>
    <view v-else>
      <uni-default-page value="4" tic="暂无数据" btntext="返回上一级"></uni-default-page>
    </view>
  </view>
</template>

<script>
import {
  selectChapterInfo,
  selectLevelMoreList,
  selectSubjectMath
} from '@/api/work/english.js'
import uniDefaultPage from '@/pageSec/components/uni-default-page/uni-default-page.vue';
export default {
  components: { uniDefaultPage },
  data() {
    return {
      defaultImg: this.$defaultImg,
      obj: {
        affiliationmodule: 0, // 所属模块    0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点
        courseid: 0 // 课程大纲ID 
      },
      info: {
        rightRate: 0, //
        overCount: 0,
        rate: 0, //
        allCount: 0 //
      },
      listObj: {
        courseOutlineType: 0, // 0 政治 1 外语 2数学
        affiliationmodule: 0, // 所属模块    0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点
        level: 3, // 当前页面的层级
        parentid: 0,
        pageNum: 1,
        pageSize: 10,
      },
      list: [],
      loadingStatus: 'more',
      total: 0,
      courseId: '',
      againStydyAuto: false,
      affiliationModule: '',
    }
  },
  onLoad(options) {
    console.log(2, options)
    if (options.courseOutlineType && options.courseOutlineType === '2') {
      // 数学
      this.obj.courseid = options.courseid
      this.listObj.courseOutlineType = options.courseOutlineType
      // this.getMathList()
      return
    }
    // 政治
    this.obj.affiliationmodule = options.affiliationmodule
    this.obj.courseid = options.courseid
    this.listObj.parentid = options.courseid
    this.listObj.affiliationmodule = options.affiliationmodule
    this.listObj.level = options.level
    this.listObj.courseOutlineType = options.courseOutlineType || 0

  },
  onReachBottom() {
    console.log('触发2')
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  onShow() {
    this.initData()
    console.log(11111111111111, this.courseId, this.againStydyAuto)
    if (this.againStydyAuto) {
      this.obj.affiliationmodule = this.affiliationModule
      this.obj.courseid = this.courseId
      console.log(22222, this.courseId, 'againStydyAuto----', this.againStydyAuto, 'affiliationModule=====', this.affiliationModule)
      this.againStydyAuto = false
      this.$tab.navigateTo('/pageSec/work/exercise/section/doing?type=0&isReviewTask=1&isShowDtk=false&affiliationModule=' + this.affiliationModule + '&id=' + this.courseId)
    }
    if (this.listObj.courseOutlineType === '2') {
      this.getMathList()
      return
    }
    this.getInfo()
    this.getList()
  },
  methods: {
    initData() {
      this.list = []
      this.listObj.pageNum = 1
      this.loadingStatus = 'more'
    },
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      if (this.list.length < this.total) {
        this.listObj.pageNum++
        await this.getList()
      } else {
        this.loadingStatus = 'nomore';
      }
    },
    handEmit() {
      this.$tab.navigateBack(1)
    },
    jumpDoing(item) {
      console.log('当前点击的：', item)
      if (this.listObj.courseOutlineType && this.listObj.courseOutlineType === '2') {
        let isReviewTask = item.overCount >= item.allCount ? 1 : 0
        this.$tab.navigateTo('/pageSec/work/mathematics/mathExaminationPoints/collectPage?courseId=' + item.course_id + '&isReviewTask=' + isReviewTask)
        return
      }
      if (item.overCount >= item.allCount) {
        // 复习模式
        this.$tab.navigateTo('/pageSec/work/exercise/section/doing?type=0&isReviewTask=1&isShowDtk=false&affiliationModule=' + this.obj.affiliationmodule + '&id=' + item.course_id)
      } else {
        this.$tab.navigateTo('/pageSec/work/exercise/section/doing?type=0&isShowDtk=false&affiliationModule=' + this.obj.affiliationmodule + '&id=' + item.course_id)
      }
    },
    // 页面顶部信息
    async getInfo() {
      const { data } = await selectChapterInfo(this.obj)
      this.info = data
      console.log('页面数据', data)
    },
    // 页面列表
    async getList() {
      const { rows, total } = await selectLevelMoreList(this.listObj)
      this.list = this.list.concat(rows)
      this.total = total
      if (this.total < 10) {
        this.loadingStatus = 'noMore'
      }
      console.log('页面列表数据', rows)
    },
    // 数学 考点题库
    async getMathList() {
      const { data } = await selectSubjectMath(this.obj.courseid)
      console.log('页面列表数据', data)
      this.info.rightRate = data.rightRate || 0
      this.info.overCount = data.overCount || 0
      this.info.rate = data.rate || 0
      this.info.allCount = data.allCount || 0
      this.list = data.menuList || []
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  padding: 24rpx 30rpx;
  background: $uni-color-bg;
}

.liBottomRight1 {
  border: 1rpx solid rgba(252, 81, 95, 1);
  color: rgba(252, 81, 95, 1);
  background: white !important;
}

.section-list {
  &-header {
    border-radius: 16rpx;
    background: $uni-bg-color;
    padding: 32rpx 16rpx;
    font-size: 24rpx;
    font-weight: 600;
    color: $uni-text-color;
    @include alignCenter;

    &-left {
      width: 94rpx;
      height: 110rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    &-right {
      margin-left: 28rpx;

      &-title {
        font-size: 32rpx;
        font-weight: 600;
        color: $uni-text-color;
      }

      &-jd {
        @include alignCenter;
        margin: 16rpx 0 24rpx;

        text {
          font-size: 28rpx;
        }

        .bar {
          width: 268rpx;
          height: 8rpx;
          border-radius: 8rpx;
          background: $uni-bg-color-tag;
          position: relative;
          margin-left: 40rpx;

          .barRed {
            height: 8rpx;
            border-radius: 8rpx;
            background: $uni-color-primary;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }

      // &-zql {
      //   line-height: normal;
      // }
    }
  }

  &-label {
    font-size: 28rpx;
    font-weight: 600;
    color: $uni-text-color;
    margin: 32rpx 0 32rpx 17rpx;
  }

  &-list {
    &-item {
      border-radius: 24rpx;
      background: $uni-bg-color;
      padding: 32rpx 16rpx;
      font-size: 24rpx;
      font-weight: 600;
      color: $uni-text-color;
      margin-bottom: 24rpx;

      &-cons {
        margin-top: 30rpx;
        @include flexBetween;

        &-jd {
          font-size: 26rpx;
          font-weight: 400;
          color: $uni-text-color-grey;
        }

        &-btn {
          width: 130rpx;
          line-height: 40rpx;
          border-radius: 224rpx;
          background: $uni-color-primary-fz;
          font-size: 26rpx;
          font-weight: 400;
          color: $uni-color-primary;
          text-align: center;
        }
      }
    }
  }

  .section-list-header-right-zql {
    text {
      margin-left: 32rpx;
    }
  }
}
</style>
