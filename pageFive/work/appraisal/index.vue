<template>
  <view class="page">
    <topTab
      :tabList=TabData
      :showSearch="true"
      @getData='tabBtn'
      v-model="formQuery.examinationName"
    />
    <view
      class="section-list-list"
      v-if="list.length > 0"
    >
      <view
        v-for="(item,index) in list"
        :key="index"
        :class="[item.studyStatus === -1 ? 'unFinsh' : '','section-list-list-item']"
        @click="jumpDoing(item)"
      >
        <view class="section-list-box">
          <view class="section-list-list-item-title">{{ item.examinationName }}</view>
          <view class="total">
            共<text>{{ item.questionCount }}</text>道
          </view>
        </view>
        <view class="section-list-list-item-cons">
          <view class="section-list-list-item-cons-jd">{{ item.endTime }}</view>
          <view
            v-if="item.studyStatus === 0 || item.studyStatus === 1"
            class="section-list-list-item-cons-btn start"
          >开始答题</view>
          <view
            v-else-if="item.studyStatus === -1"
            class="section-list-list-item-cons-btn start"
          >未开始</view>
          <view
            v-else
            class="section-list-list-item-cons-btn"
          >查看成绩</view>
        </view>
      </view>
      <uni-load-more :status="loadingStatus"></uni-load-more>
    </view>
    <uni-default-page
      :value="4"
      tic="暂无数据"
      btntext="返回上级"
      v-else
    ></uni-default-page>
  </view>
</template>

<script>
// import Tabs from "@/pages/work/mathematics/Tabs.vue"
import { selectExamPaperManageListForApp } from '@/api/work/evaluation.js'
import topTab from '@/pageFive/components/top-tab/top-tab.vue'
import UniDefaultPage from '@/pageFive/components/uni-default-page/uni-default-page.vue'
export default {
  components: {
    topTab,
    UniDefaultPage
  },
  data() {
    return {
      TabFlag: true, //	头部 Tab 展示判断标识
      TabIndex: 1, //	Tab切换标识
      bottomFlag: false, //	开始继续练习切换标识
      TabData: [
        {
          label: '政治',
          value: '0',
          isCheck: true
        },
        {
          label: '数学',
          value: '2',
          isCheck: false
        },
        {
          label: '外语',
          value: '1',
          isCheck: false
        },
      ],
      searchText: '',
      formQuery: {
        courseOutlineType: 0, //0政治 1 外语 2数学题
        examinationName: '', // 试题名称
        pageNum: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more'
    }
  },
  watch: {
    'formQuery.examinationName'(n) {
      console.log(n)
      this.getList()
    }
  },
  onLoad(option) {
    console.log(option)
    this.TabFlag = option.TabFlag
  },
  onShow() {
    this.getList()
  },
  onReachBottom() {
    console.log('触发2')
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: '测评',
      path: '/pageFive/work/appraisal/index',
    };
  },
  methods: {
    // 获取列表接口
    async getList() {
      const { rows, total } = await selectExamPaperManageListForApp(this.formQuery)
      console.log('试卷', rows)
      this.list = rows
      this.total = total
      if (this.total <= 10) {
        this.loadingStatus = 'nomore'
      }
    },
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      if (this.list.length < this.total) {
        this.formQuery.pageNum++
        await this.getList()
      } else {
        this.loadingStatus = 'nomore';
      }
    },
    //	tab 切换
    tabBtn(item) {
      console.log('当前点击的', item)
      if (this.formQuery.courseOutlineType == item) return;
      this.formQuery.courseOutlineType = item
      this.formQuery.pageNum = 1
      this.list = []
      this.getList()
    },

    // 开始答题、查看成绩
    jumpDoing(item) {
      console.log('当前点击的', item)
      if (item.studyStatus === 0) {
        // 开始答题，跳转正常答题页面
        this.$tab.navigateTo('/pageSec/work/appraisal/doing?examinationId=' + item.examinationId + '&courseOutlineType=' + this.formQuery.courseOutlineType)
      } else if (item.studyStatus === 1) {
        // 答完未提交，跳转答题卡页面
        this.$tab.navigateTo('/pageSec/work/appraisal/answerSheet?examinationId=' + item.examinationId + '&courseOutlineType=' + this.formQuery.courseOutlineType)
      } else if (item.studyStatus === 2) {
        // === 2 表示答完已提交，跳转答题结果页面
        this.$tab.navigateTo('/pageSec/work/appraisal/evlationResult?examinationId=' + item.examinationId + '&courseOutlineType=' + this.formQuery.courseOutlineType)
      } else {
        // 该试卷还不能开始做（没有到开始时间）
        this.$modal.msg('该试卷还不能开始做哦！（没有到开始时间）')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  margin: 15px;
  width: calc(100% -50px);
  box-sizing: border-box;
  border-radius: 10px;
}

.section-list-list {
  margin-top: 32rpx;
  &-item {
    border-radius: 24rpx;
    background: $uni-bg-color;
    padding: 32rpx 16rpx;
    font-size: 26rpx;
    font-weight: 600;
    color: $uni-text-color;
    margin-bottom: 24rpx;
    &.unFinsh {
      opacity: 0.6;
    }
    .section-list-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .total {
        font-size: 26rpx;
        font-weight: 400;
        color: $uni-text-color-grey;
        text {
          margin: 0 8rpx;
        }
      }
    }
    &-title {
      font-size: 28rpx;
      font-weight: 600;
    }
    &-cons {
      margin-top: 30rpx;
      @include flexBetween;
      &-jd {
        font-size: 26rpx;
        font-weight: 400;
        color: $uni-text-color-grey;
      }
      &-btn {
        width: 120rpx;
        line-height: 40rpx;
        border-radius: 224rpx;
        background: $uni-color-primary-fz;
        font-size: 26rpx;
        font-weight: 400;
        color: $uni-color-primary;
        text-align: center;
        &.start {
          background: $uni-text-color-inverse;
          border: 1px solid $uni-color-primary;
        }
      }
    }
  }
}
</style>
