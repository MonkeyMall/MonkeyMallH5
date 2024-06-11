<template>
  <view class="container">
    <!-- :style="{ height: `${windowHeight}px` }" -->
    <!-- <view class="titlrs">
      <view class="icoblase" @click="handback">
        <uni-icons type="back" size="25" color="#333"></uni-icons>
      </view>
      消息详情
    </view> -->
    <view class="titles"> <text></text> {{ data.noticeTitle || '' }} </view>
    <view class="shumings">
      <image
        :src="data.avatar"
        mode=""
      ></image>
      <view class="namse">
        <text>{{ data.createBy || '' }}</text>
        <text style="margin-top: 8rpx;"> {{ data.createTime || '' }} </text>
      </view>
    </view>
    <view class="contens">
      <!-- 红包抽奖\n1、达到设定的条件即可参数抽奖\n2、参与者扫码进入活动页面，若检测到该微信号未关注“考研一起卷”公众号，则提示关注。\n3、活动页面加载完毕后，进行3秒的倒计时，然后进行15秒的红包雨游戏。\n4、参与者在15秒内点击[红包]，系统将统计点击总数。\n5、15秒后，红包雨结束，仅显示奖励总额。\n6、参与者获得奖励后，系统将通过“考研一起卷”公众号发放红包/商家转账到零钱。{{ data.noticeContent }} -->
      <uv-parse :content="data.noticeContent"></uv-parse>
    </view>
  </view>
</template>

<script>
import uniIcons from '@/pageSec/components/uni-icons/components/uni-icons/uni-icons.vue'
import uvParse from "@/pageSec/components/uv-parse/components/uv-parse/uv-parse.vue";
import {
  getUserProfile
} from "@/api/system/user"

export default {
  components: {
    uniIcons,
    uvParse
  },
  data() {
    return {
      data: {}
    }
  },
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  onLoad(options) {
    this.data = JSON.parse(decodeURIComponent(options.obj))
    // this.getUser()
  },
  methods: {
    handback() {
      this.$tab.navigateBack(1)
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #fff;
  padding: 0rpx 46rpx;
  // background: linear-gradient(190.72deg,
  //     rgba(255, 232, 227, 1) 0%,
  //     rgba(246, 248, 253, 0) 25%);
}

.titlrs {
  font-size: 28rpx;
  font-weight: 500;
  line-height: 44.8px;
  color: $uni-text-color;
  text-align: center;
  padding-top: 100rpx;
  position: relative;
}

.icoblase {
  position: absolute;
  display: block;
  top: 100rpx;
  left: 0rpx;
}

.titles {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  padding-top: 50rpx;
  /* height: 30rpx; */
  /* line-height: 34rpx; */
  padding-left: 8rpx;
  display: flex;
  align-items: center;

  text {
    display: inline-block;
    width: 6rpx;
    height: 30rpx;
    border-radius: 26rpx;
    background: $uni-text-color-placeholder;
    margin-right: 16rpx;
    vertical-align: centet;
  }
}

.shumings {
  margin-top: 26rpx;
  margin-bottom: 36rpx;
  display: flex;

  image {
    display: block;
    width: 64rpx;
    height: 64rpx;
    margin-right: 24rpx;
  }

  .namse {
    text {
      display: block;
      font-size: 26rpx;
      font-weight: 400;
      line-height: 33.6rpx;
      color: $uni-text-color;
    }
  }
}

.contens {
  font-size: 28rpx;
  font-weight: 400;
  line-height: 50rpx;
  color: $uni-text-color;
  white-space: pre-line;
}
</style>