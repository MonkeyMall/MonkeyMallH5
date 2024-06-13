<!--
 * @Author: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @Date: 2023-12-28 20:29:50
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @LastEditTime: 2024-05-13 16:33:27
 * @FilePath: \RuoYi-App-master\pageSec\components\uni-default-page\uni-default-page.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="Defaultpage" v-show="delayShow">
    <image :src="value ? imgUrl : ''" mode="" :style="{ marginTop: mt + 'rpx' }"></image>
    <view v-if="tic" class="bossea">
      {{ tic }}
    </view>
    <view v-if="btntext" class="btnse" @click="handleClick">
      {{ btntext }}
    </view>
  </view>
</template>

<script>
export default {
  name: 'UniDefaultPage',
  props: {
    value: {
      type: String,
      default: '4'
    },
    tic: {
      type: String,
      default: ''
    },
    btntext: {
      type: String,
      default: ''
    },
    mt: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      delayShow: false,
      imgUrl: 'https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/defaultpage/defaultpage' + this.value + '.png',
    }
  },
  created() {
    setTimeout(() => {
      this.delayShow = true
    }, 3000)
  },
  methods: {
    handleClick() {
      console.log('2222点击返回')
      if (!this.$parent.handEmit) {
        this.$tab.navigateBack()
        return
      }
      this.$parent.handEmit();
    }
  }
}
</script>

<style lang="scss">
.Defaultpage {
  image {
    display: block;
    margin: 0 auto;
    margin-top: 200rpx;
  }

  .bossea {
    font-size: 32rpx;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 44.8rpx;
    color: $uni-text-color-grey;
    text-align: center;
    // margin-top: 62rpx;
    text-align: center;
  }

  .btnse {
    width: 200rpx;
    // height: 80rpx;
    border: 2rpx solid $uni-color-primary;
    text-align: center;
    line-height: 76rpx;
    border-radius: 40rpx;
    font-size: 28rpx;
    font-weight: 600;
    letter-spacing: 0px;
    color: $uni-color-primary;
    margin: 0 auto;
    margin-top: 32rpx;
  }
}
</style>