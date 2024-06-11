<template>
  <view class="page">
    <topTab v-if="TabData && TabData.length && TabFlag" :tabList=TabData @getData='tabBtn' />
    <view class="list" v-if="list && list.length > 0">
      <view class="li" v-for="(item, index) in list" :key='index' @click="liBtn(item)">
        <view class="liTop"> {{ item.course_outline_name }} </view>
        <view class="liBottom" v-if="!item.overcount">
          <view class="liBottomLeft1"> {{ item.overcount }} / {{ item.allCount }} </view>
          <view class="liBottomRight1"> 开始 </view>
        </view>
        <view class="liBottom" v-else>
          <view class="liBottomLeft2"> <span style='color: red; margin-right: 3px;'> {{ item.overcount }} </span> /
            {{ item.allCount }} </view>
          <view class="liBottomRight2"> 继续练习 </view>
        </view>
      </view>
      <uni-load-more :status="loadingStatus" v-if="obj.courseOutlineType == '0'"></uni-load-more>
    </view>
    <view v-else>
      <uni-default-page value="4" tic="暂无数据" btntext="返回上一级"></uni-default-page>
    </view>
  </view>
</template>

<script>
// import Tabs from "@/pages/work/mathematics/Tabs.vue"
import uniDefaultPage from '@/pageSec/components/uni-default-page/uni-default-page.vue';
import { selectLevelOneList } from '@/api/work/english.js'
import topTab from '@/pageSec/components/top-tab/top-tab.vue'

export default {
  components: {
    topTab,
    uniDefaultPage
  },
  data() {
    return {
      TabData: [],
      TabFlag: true, //	头部 Tab 展示判断标识
      TabIndex: 0, //	Tab切换标识
      bottomFlag: false, //	开始继续练习切换标识
      obj: {
        courseOutlineType: '', // 0 政治 1 外语 2数学
        affiliationmodule: '', //  0名师题库   1精选题库  2真题题库 3每日题库 4历年真题 5真题考点
        pageNum: 1,
        pageSize: 10,
      },
      list: [],
      selectIndex: 0,
      total: 0,
      loadingStatus: 'more',
      courseOutlineType: '',
      affiliationModule: '',
      courseid: '',
      againStydyAuto: false
    }
  },
  onLoad(options) {
    console.log(options)
    this.TabFlag = options.TabFlag === 'true' ? true : false
    console.log(111, typeof this.TabFlag)
    this.obj.courseOutlineType = options.courseOutlineType
    this.obj.affiliationmodule = options.affiliationmodule

  },
  onShow() {
    if (this.againStydyAuto) {
      this.obj.affiliationmodule = this.affiliationModule
      this.obj.courseOutlineType = this.courseOutlineType
      this.obj.courseid = this.courseId
      console.log(22222, this.courseId, 'againStydyAuto----', this.againStydyAuto, 'affiliationModule=====', this.affiliationModule)
      this.againStydyAuto = false
      this.$tab.navigateTo('/pageSec/work/exercise/section/doing?isShowDtk=false&id=' + this.courseId + '&affiliationModule=' + this.affiliationModule + '&isReviewTask=1' + '&type=' + this.courseOutlineType)
    }
    this.initData()
    this.getList()
  },
  onReachBottom() {
    console.log('触发2')
    //上拉加载请求更多数据
    if (this.obj.courseOutlineType == '0') {
      this.getmoreActives();
    }

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
      const { rows, total } = await selectLevelOneList(this.obj)
      if (rows && rows.length > 0) {
        if (this.obj.courseOutlineType == '0') {
          this.total = total
          this.list = this.list.concat(rows)
          return
        }
        this.TabData = rows.map((item, index) => {
          return {
            label: item.course_outline_name,
            value: index,
            id: item.course_id,
            isCheck: false,
            childList: item.childList
          }
        })
        this.TabData[this.TabIndex].isCheck = true
        this.list = rows[this.TabIndex].childList
      }

      // this.list = rows
    },
    //	tab 切换
    tabBtn(index) {
      if (this.TabIndex == index) return;
      this.TabIndex = index
      if (this.TabData[index] && this.TabData[index].childList) {
        this.TabData[index].childList.forEach(item => {
          if (item.overcount == 0) {
            item.bottomFlag = true
          } else {
            item.bottomFlag = false
          }
        })
        this.list = this.TabData[index].childList
      } else {
        this.list = []
      }
    },

    // 刷题 详情页
    liBtn(item) {

      if (item.allCount == '0') {
        uni.showToast({
          title: "暂没有题",
          icon: 'none',
        })
        return
      }
      var isReviewTask = 0
      if (item.allCount === item.overcount) {
        isReviewTask = 1

      }
      console.log('item: ', this.obj.affiliationmodule);
      this.$tab.navigateTo('/pageSec/work/exercise/section/doing?isShowDtk=false&id=' + item.course_id + '&affiliationModule=' + this.obj.affiliationmodule + '&isReviewTask=' + isReviewTask + '&type=' + this.obj.courseOutlineType)
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
  margin: 15px;
  width: calc(100% -50px);
  box-sizing: border-box;
  border-radius: 10px;
}

.list {
  width: calc(100%- 30px);
  margin-top: 16px;
  border-radius: 8px;

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

    >.liBottom {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      align-items: center;
      margin-bottom: 3rpx;

      >.liBottomRight1 {
        font-weight: 400;
        width: 130rpx;
        height: 40rpx;
        line-height: 40rpx;
        border-radius: 10px;
        border: 0.5px solid rgba(252, 81, 95, 1);
        box-sizing: content;
        text-align: center;
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