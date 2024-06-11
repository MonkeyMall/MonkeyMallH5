<template>
  <view class="page section-list">
    <view v-if="list && list.length > 0">
      <view
        v-for="(item1, index1) in list"
        :key="index1"
        class="section"
      >
        <view class="section-list-header">
          <view class="fixedBox">宝藏题库</view>
          <view class="header-title">{{ item1.course_outline_name }}</view>
          <view class="header-tips">精选刷题，等你作答～</view>
        </view>
        <view class="section-list-cons">
          <view class="nullBox"></view>
          <view
            v-for="(item, index) in item1.childList"
            :key="index"
            :class="[selectId === item.course_id ? 'active' : '','section-list-cons-item']"
            @click="clickItem(item, index)"
          >
            {{ item.course_outline_name }}
            <i
              class="iconfont"
              v-show="selectId === item.course_id"
            >&#xe715;</i>
          </view>
          <view class="nullBox"></view>
        </view>
      </view>
      <uni-load-more :status="loadingStatus"></uni-load-more>
    </view>
    <view v-else>
      <uni-default-page
        value="4"
        tic="暂无数据"
        btntext="返回上一级"
      ></uni-default-page>
    </view>
    <!-- <view class="start-btn">开始刷题</view> -->
  </view>
</template>

<script>
import { selectLevelOneList } from '@/api/work/english.js'

export default {
  data() {
    return {
      obj: {
        courseOutlineType: '', // 0 政治 1 外语 2数学
        affiliationmodule: '', //  0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点
        pageNum: 1,
        pageSize: 10,
      },
      list: [],
      selectId: '',
      total: 0,
      loadingStatus: 'more',
    }
  },
  onLoad(options) {
    console.log('options', options)
    this.obj.courseOutlineType = options.courseOutlineType
    this.obj.affiliationmodule = options.affiliationmodule
    this.getList()
  },
  onReachBottom() {
    console.log('触发2')
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  created() {

  },
  methods: {
    initData() {
      this.list = []
      this.obj.pageNum = 1
      this.loadingStatus = 'more'
    },
    handEmit() {
      this.$tab.navigateBack(1)
    },
    // 获取列表数据
    async getList() {
      console.log('obj', this.obj)
      const { rows, total } = await selectLevelOneList(this.obj)
      console.log('接口数据', rows)
      this.list = this.list.concat(rows)
      this.total = total
      if (this.total < 10) {
        this.loadingStatus = 'noMore'
      }
    },
    clickItem(item, index) {
      this.selectId = item.course_id
      this.$tab.navigateTo('/pageSec/work/exercise/section/index?level=3&affiliationmodule=' + this.obj.affiliationmodule + '&courseid=' + item.course_id)
    },
    //上拉加载获取更多的限时活动
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
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  @include columnAlignCenter;
  background: $uni-bg-color;
  height: 100vh;
}
.section-list {
  padding-top: 30rpx;
  &-header {
    width: 690rpx;
    height: 188rpx;
    // line-height: 188rpx;
    // border-radius: 16rpx;
    font-size: 32rpx;
    font-weight: 600;
    // text-align: center;
    color: $uni-text-color;
    background: url('https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/jx-01.png');
    background-size: cover;
    position: relative;
    transform: scale(1.05);
    .header-title {
      padding: 50rpx 50rpx 20rpx;
      font-size: 32rpx;
    }
    .header-tips {
      font-size: 24rpx;
      font-weight: 400;
      color: $uni-text-color-grey;
      padding: 0 50rpx;
      position: relative;
    }
    // background: $uni-text-color-inverse;
    .fixedBox {
      position: absolute;
      right: 18rpx;
      top: 15rpx;
      width: 128rpx;
      height: 44rpx;
      line-height: 44rpx;
      text-align: center;
      opacity: 1;
      font-size: 24rpx;
      font-weight: 400;
      border-radius: 0rpx 14px 0rpx 16rpx;
      background: $uni-color-primary;
      color: $uni-bg-color;
      text-align: center;
    }
  }
  &-cons {
    box-shadow: 1rpx -1rpx 10rpx 3rpx rgb(255, 243, 242);
    border-radius: 24rpx;
    margin-top: -10rpx;
    background: white;
    position: relative;
    z-index: 9999;
    &-item {
      width: 690rpx;
      line-height: 88rpx;
      border-radius: 16rpx;
      font-size: 28rpx;
      font-weight: 600;
      color: $uni-text-color;
      background: $uni-text-color-inverse;
      // margin-top: 28rpx;
      padding-left: 32rpx;
      position: relative;
    }
    &-item.active {
      color: $uni-color-primary;
      .iconfont {
        position: absolute;
        top: 0;
        right: 20rpx;
        bottom: 0;
      }
    }
  }
}
.nullBox{
  width: 100%;
  height: 22rpx;
}
.start-btn {
  width: 690rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 8rpx;
  background: $uni-color-primary;
  font-size: 32rpx;
  font-weight: 600;
  letter-spacing: 0px;
  color: $uni-text-color-inverse;
  margin-top: 98rpx;
}
.section {
  margin-bottom: 41rpx;
}
</style>
