<template>
  <view>
    首页
  </view>
</template>

<script>
// import { listForApplet } from '@/api/comm'
// import { getWetchatName } from '@/utils/auth'
// import config from '@/config'

export default {
  data() {
    return {
      // api: config.baseUrl,
      // scrollTop: 0,
      // templatePage: Number(uni.getStorageSync('templateNum')) || 1, // 模板 Number(uni.getStorageSync('templateNum')) || 1
      // listRb: [],
      // total: 0,
      // obj: {
      //   pageNum: 1,
      //   pageSize: 10,
      // },
      // title: '考研一起卷',
      // //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      // loadingStatus: 'more',
    }
  },
  watch: {
  },
  onPullDownRefresh() {
    // this.enablePullDownRefreshFn()
    // uni.stopPullDownRefresh();//停止刷新
  },
  onShow() {
    
  },
  onReachBottom() {
  },
  onPageScroll(e) {
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
    },
    // 刷新页面
    refashPage() {
      
    },
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      // console.log('loadingStatus', this.loadingStatus)
      // if (this.loadingStatus === 'nomore') {
      //   return false;
      // }
      // this.loadingStatus = 'loading';
      // if (this.listRb.length < this.total) {
      //   this.obj.pageNum++
      //   await this.getRbList()
      // } else {
      //   this.loadingStatus = 'nomore';
      // }
    }
  }
}
</script>