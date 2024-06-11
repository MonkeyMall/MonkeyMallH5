<template>
  <view>
    <!-- --{{ api }} -->
    <uni-index-template
      v-if="templatePage === 1"
      :scrollTop="scrollTop"
      :titleName="title"
    >
      <!-- 考研日报 -->
      <template v-if="listRb.length">
        <!-- 组件里面不能使用小程序的Api，所以不能放到组件里面去 -->
        <uni-rb-list
          :listRb="listRb"
          :templatePage="1"
        ></uni-rb-list>
        <uni-load-more :status="loadingStatus"></uni-load-more>
      </template>
    </uni-index-template>
    <uni-index-template-2
      v-else-if="templatePage === 2"
      :scrollTop="scrollTop"
      :titleName="title"
    >
      <uni-rb-list
        :listRb="listRb"
        :templatePage="2"
      ></uni-rb-list>
      <uni-load-more :status="loadingStatus"></uni-load-more>
    </uni-index-template-2>
  </view>
</template>

<script>
import { listForApplet } from '@/api/comm'
import { setTabBar } from '@/utils/utils'
import { getWetchatName } from '@/utils/auth'
import config from '@/config'

// import { enablePullDownRefreshMixins } from '@/mixins/index'

export default {
  data() {
    return {
      api: config.baseUrl,
      scrollTop: 0,
      templatePage: Number(uni.getStorageSync('templateNum')) || 1, // 模板 Number(uni.getStorageSync('templateNum')) || 1
      listRb: [],
      total: 0,
      obj: {
        pageNum: 1,
        pageSize: 10,
      },
      title: '考研一起卷',
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more',
    }
  },
  watch: {
    '$store.getters.wetchatName':{
      handler(newVal, oldVal) {
        console.log('更新数据', newVal)
        this.title = newVal
      },
      deep: true
    }
  },
  // mixins: [enablePullDownRefreshMixins],
  onPullDownRefresh() {
    this.enablePullDownRefreshFn()
    uni.stopPullDownRefresh();//停止刷新
  },
  onShow() {
    // const accountInfo = uni.getAccountInfoSync();
    // const appid = accountInfo.miniProgram.appId;
    // console.log('appid', appid)
    this.refashPage()
    setTabBar()
    if (getWetchatName()) this.title = getWetchatName()
  },
  onReachBottom() {
    //上拉加载请求更多数据
    this.getmoreActives();
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: getWetchatName(),
      path: '/pages/index',
    };
  },
  methods: {
    // 下拉刷新回调
    enablePullDownRefreshFn() {
      this.refashPage()
    },
    // 刷新页面
    refashPage() {
      this.templatePage = Number(uni.getStorageSync('templateNum')) || 1
      this.listRb = []
      this.obj.pageNum = 1
      this.getRbList()
    },
    // 日报
    async getRbList() {
      const { rows, total } = await listForApplet(this.obj)
      console.log('列表数据', rows)
      this.listRb = this.listRb.concat(rows)
      this.total = total
      if (this.total <= 10) {
        this.loadingStatus = 'nomore'
      }
    },
    // // 跳转日报详情
    // goRb(id) {
    //   this.$tab.navigateTo('/pageThe/home/info?id=' + id)
    // },
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      if (this.listRb.length < this.total) {
        this.obj.pageNum++
        await this.getRbList()
      } else {
        this.loadingStatus = 'nomore';
      }
    }
  }
}
</script>