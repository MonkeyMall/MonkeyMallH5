<template>
  <view>
    <view class="header">
      <uni-easyinput 
        prefixIcon="search" 
        v-model="schoolName" 
        placeholder="请输入学校名称" 
        :suffixIcon="closeIcon" 
        @iconClick="clear" 
        @confirm="handxenamse"
      ></uni-easyinput>
    </view>
  </view>
</template>

<script>
// import { listForApplet } from '@/api/comm'
// import { getWetchatName } from '@/utils/auth'
// import config from '@/config'

export default {
  data() {
    return {
      schoolName: '',
      closeIcon: '',
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
    schoolName(n, o) {
      if (!n) {
        this.closeIcon = ''
      } else {
        this.closeIcon = 'close'
      }
    }
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
    clear(e) {
      console.log('zx', e)
      if (e === 'suffix') {
        this.schoolName = ''
        // this.initData()
      } else {
        // this.initData()
      }
    },
    // 输入学校名称
    handxenamse(schoolName) {
      // this.initData(schoolName)
    },
  }
}
</script>

<style>
.header {
  padding: 30rpx;
}
</style>