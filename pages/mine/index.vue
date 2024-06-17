<template>
  <view class="mineIndexBox" v-if="userInfo">
    用户名：{{ userInfo.username }}
  </view>
</template>

<script>
import { randomAcquisition } from '@/api/work/english'
import mineIndexTemplate1 from '@/pages/mine/components/mineIndexTemplate1.vue'
import { getPhone, getAvatar } from '@/utils/auth'
import { setTabBar } from '@/utils/utils'
import { getWetchatName } from '@/utils/auth'

export default {
  data() {
    return {
      userInfo: JSON.parse(uni.getStorageSync('userInfo')) || ''
    }
  },
  components: {
    mineIndexTemplate1
  },
  onShow() {
    
  },
  computed: {
    
  },
  created() {

  },
  onShareAppMessage(options) {
    // 返回分享的内容
    return {
      title: getWetchatName(),
      path: '/pages/mine/index',
    };
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>

</style>