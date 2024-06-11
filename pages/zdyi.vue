<template>
  <div class="xieyi">
    <div v-html="dat"></div>
  </div>
</template>

<script>
import { handagreement } from '@/api/login'
export default {
  data() {
    return {
      dat: ''
    }
  },
  onLoad(options) {
    console.log(options);
    if (options.id) {
      uni.setNavigationBarTitle({
        title: options.data
      })
      handagreement(options.id).then(res => {
        if (res.code == 200) {
          this.dat = res.data.content
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.xieyi {
  padding: 32rpx;
}
</style>