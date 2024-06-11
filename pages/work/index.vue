<template>
  <view>
    <workIndexTemplate1 v-if="templatePage === 1"></workIndexTemplate1>
    <workIndexTemplate2 v-else-if="templatePage === 2"></workIndexTemplate2>
  </view>
</template>

<script>
import workIndexTemplate1 from '@/pages/work/components/workIndexTemplate1.vue'
import workIndexTemplate2 from '@/pages/work/components/workIndexTemplate2.vue'
import { setTabBar } from '@/utils/utils'
import { getWetchatName } from '@/utils/auth'

export default {
  data() {
    return {
      templatePage: Number(uni.getStorageSync('templateNum')) || 1, // 模板
    }
  },
  onShow() {
    this.templatePage = Number(uni.getStorageSync('templateNum')) || 1
    setTabBar()
    if (getWetchatName()) {
      uni.setNavigationBarTitle({
        title: getWetchatName() // 设置页面标题为"页面标题"
      })
    }
  },
  components: {
    workIndexTemplate1,
    workIndexTemplate2
  },
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: getWetchatName(),
      path: '/pages/work/index',
    };
  },
  methods: {

  }
}
</script>

