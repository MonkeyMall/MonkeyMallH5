<!--
 * @Author: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @Date: 2023-12-08 09:29:37
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @LastEditTime: 2024-01-13 16:32:20
 * @FilePath: \RuoYi-App-master\pageSec\work\exercise\components\labelBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="work-cons-label">
    <view>{{ leftText }} （{{ nums }}）</view>
    <view v-if="rightType === 'iconfont'">
      <view
        @click="takeNoteFn"
        v-if="nums !== 2"
      >记笔记<i class="iconfont">&#xe614;</i></view>
    </view>
    <view
      class="work-cons-label-btns"
      v-if="rightType === 'button'"
    >
      <view
        :class="[tabType === 'zx' ? 'active' : '','work-cons-label-btns-item']"
        @click="selectTab('zx')"
      >最新</view>
      <view
        :class="[tabType === 'rm' ? 'active' : '','work-cons-label-btns-item']"
        @click="selectTab('rm')"
      >热门</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    leftText: {
      type: String,
      default: ''
    },
    nums: {
      type: Number,
      default: 0
    },
    rightType: {
      type: String,
      default: 'iconfont'
    }
  },
  data() {
    return {
      tabType: 'zx'
    }
  },
  methods: {
    takeNoteFn() {
      this.$emit('takeNoteFn')
    },
    // 切换最新、热门按钮
    selectTab(type) {
      this.tabType = type
      this.$emit('zxOrRmFn', type)
      this.$parent.getAllComment(type === 'zx' ? 0 : 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.work-cons-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28rpx;
  font-weight: 600;
  letter-spacing: 0px;
  color: $uni-text-color;
  padding: 32rpx 0;
  .iconfont {
    font-size: 30rpx;
    color: $uni-color-primary;
    margin-left: 10rpx;
  }
  &-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-item {
      width: 114rpx;
      line-height: 40rpx;
      border-radius: 40rpx;
      background: $uni-color-primary-fz;
      font-size: 24rpx;
      font-size: 400;
      color: $uni-color-primary;
      text-align: center;
      margin-left: 32rpx;
      &.active {
        border: 2rpx solid $uni-color-primary;
        background: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
