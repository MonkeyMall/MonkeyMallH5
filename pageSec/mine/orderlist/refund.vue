<template>
  <view>
    <view
      class="container"
      v-if="flag == false"
    >
      <view
        class="lis"
        style="border-bottom: 1px solid rgba(246, 248, 253, 1);border-radius: 16rpx  16rpx 0  0rpx;"
        v-if="data.actualAmount"
      >
        <view class="bordes"></view>
        <view class="pires">应退金额（元）</view>
        <view class="pire">{{ data.actualAmount || '' }}</view>
      </view>
      <view
        class="lis"
        style="border-radius: 0 0  16rpx 16rpx;"
        v-if="data.actualAmount"
      >
        <view class="bordes"></view>
        <view class="pires">实退金额（元）</view>
        <view class="pire">{{ data.actualAmount || '' }}</view>
      </view>
      <view
        class="lis"
        style="border-radius:16rpx;margin-top:32rpx ;"
        v-if="data.actualAmount"
      >
        <view class="pires">{{ data.actualAmount || '' }}</view>
        <view class="pire">（元）</view>
      </view>
      <view
        class="bcbtns"
        @click="quit"
      >提交</view>
    </view>
    <!-- 审核中 -->
    <block v-if="flag">
      <view
        class="shz"
        v-if="tuiKuanFlag === '2'"
      >
        <view class="shz-box">
          <i class="iconfont">&#xe629;</i>
          <view class="shz-box-right">
            <view class="tit">审核中</view>
            <view>您的退费申请正在审核中，<br>预计3个工作日到账。</view>
          </view>
        </view>
        <view
          class="refeash"
          @click="getRefundStatusFn()"
        >刷新进度</view>
      </view>
      <!-- 退费已通过 -->
      <view
        class="shz"
        v-if="tuiKuanFlag === '3'"
      >
        <view class="shz-box">
          <i class="iconfont ytg">&#xe62a;</i>
          <view class="shz-box-right">
            <view class="tit">退费已通过</view>
            <view>退费时间：{{ refundPassTime || '' }}</view>
          </view>
        </view>
      </view>
      <view
        class="shz"
        v-if="tuiKuanFlag === '4'"
      >
        <view class="shz-box">
          <i class="iconfont ytg">&#xe639;</i>
          <view class="shz-box-right">
            <view class="tit">退款审核未通过</view>
            <view>退费时间：{{ refundPassTime || '' }}</view>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import { getUserProfile, refund, getRefundStatus } from "@/api/system/user"

export default {
  data() {
    return {
      addForm: true,
      data: {},
      flag: 0,
      tuiKuanFlag: '',
      refundPassTime: '',
    }
  },
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  onLoad(options) {
    this.data = JSON.parse(decodeURIComponent(options.data));
    console.log(this.data, '------------------------');
    if (this.data.orderStatus == 15) {
      console.log(this.flag, 'this.flag');
      this.flag = true
      this.getRefundStatusFn()
    }
    // orderStatus: 15   退费中
    // this.getUser()
  },
  methods: {
    getRefundStatusFn() {
      console.log(this.data.poId);
      getRefundStatus({ poId: this.data.poId }).then(res => {
        console.log(res);
        //   2退款中、3已退款 、4退款审核不通过
        this.tuiKuanFlag = res.data.refundStatus
        // this.tuiKuanFlag = '4'
        this.refundPassTime = res.data.refundPassTime
        console.log(this.tuiKuanFlag);
        console.log(this.refundPassTime);
      })
    },
    quit() {
      refund({ poId: this.data.poId }).then(res => {
        console.log(res);
        uni.showToast({
          title: "提交成功",
          icon: 'none',
        })
        setTimeout(() => {
          uni.navigateBack(1)
        })
      })

    },
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
  // min-height: 100vh;
  background-color: $uni-bg-color-cyan;
  padding: 32rpx 30rpx;
}

.lis {
  padding: 32rpx 16rpx;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;

  .bordes {
    width: 6rpx;
    height: 30rpx;
    border-radius: 16rpx;
    background: $uni-color-primary;
    margin-right: 16rpx;
  }

  .pires {
    font-size: 28rpx;
    font-weight: 600;
    color: $uni-text-color;
  }

  .pire {
    font-size: 28rpx;
    font-weight: 600;
    color: $uni-text-color;
    margin-left: auto;
  }
}

.bcbtns {
  width: 100%;
  height: 80rpx;
  opacity: 1;
  border-radius: 16rpx;
  margin: 0 auto;
  background-color: $uni-color-primary;
  color: $uni-text-color-inverse;
  text-align: center;
  line-height: 80rpx;
  font-size: 32rpx;
  font-weight: 600;
  margin-top: 93rpx;
}

.shz {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-box {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    padding: 130rpx 0;

    .iconfont {
      font-size: 120rpx;
      color: rgba(53, 104, 245, 1);
      margin-right: 40rpx;

      &.ytg {
        color: $uni-color-primary;
      }
    }

    &-right {
      .tit {
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 16rpx;
      }
    }
  }

  .refeash {
    width: 690rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 16rpx;
    border: 2rpx solid $uni-color-primary;
    font-size: 32rpx;
    color: $uni-color-primary;
  }
}
</style>