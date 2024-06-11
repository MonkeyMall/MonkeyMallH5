<template>
  <view class="container">
    <view class="Uls">
      <view class="Lis">
        <view class="hede">
          <view class="titles">
            <text></text>
            系统订单编号
          </view>
          <view
            class="time"
            @click="handfuzhis('23923928398990')"
          >
            {{ data.orderId }}
            <text @click.stop="copyFn(data.orderId)">复制</text>
          </view>
        </view>
        <view class="contens">
          <view>
            <text>订单类型：</text><text>{{ data.orderType === '1' ? '订金' : '学费' }}</text>
          </view>
          <view v-if="data.paymentAmount">
            <text>应收金额：</text><text v-if="data.paymentAmount">{{ data.paymentAmount || '' }}元</text>
          </view>
          <view v-if="data.discountAmount">
            <text>优惠金额：</text><text v-if="data.discountAmount">{{ data.discountAmount || '' }}元</text>
          </view>
          <view v-if="data.paidAmount">
            <text>实收金额：</text><text v-if="data.paidAmount">{{ data.paidAmount || '' }}元</text>
          </view>
          <view v-if="data.paymentAmountTobe">
            <text>剩余金额：</text><text v-if="data.paymentAmountTobe">{{ data.paymentAmountTobe || '' }}元</text>
          </view>
          <view
            class="shenqtuif chakanpinzhen"
            v-if="data.orderType === '1' && data.status === '2'"
            @click="lookPz(data.poId, data.orderType)"
          >
            查看凭证
          </view>
        </view>
        <!-- <view class="shenqtuif" @click="handorderdailes">
          申请退费
        </view> -->
      </view>
      <view
        class="Lis"
        v-for="(item, index) in data.datailList"
        :key="item.podId"
      >
        <view class="hede">
          <view class="titles">
            <text></text>
            第 {{ item.orderNum || '' }} 笔
          </view>
          <view class="order-status dzf-status">
            {{ item.orderStatus === '10' ? '待支付' : item.orderStatus === '11' ? '待审核' : item.orderStatus === '12' ? '已通过' :
              item.orderStatus === '13' ? '已拒绝' : item.orderStatus === '14' ? '退款中' : item.orderStatus === '15' ? '退款成功' :
                item.orderStatus === '16' ? '退款审核不通过' : '' }}
          </view>
        </view>
        <view class="contens">
          <view>
            <text>系统订单编号：</text><text v-if="item.orderId">{{ item.orderId || '' }}</text>
          </view>
          <view>
            <text>回款金额：</text><text v-if="item.paymentAmount">{{ item.paymentAmount || '' }}元</text>
          </view>
          <view class="text1">
            付款方式：
            <dict-tag
              :options="dict.type.payment_method"
              :value="item.paymentMethod"
            />
          </view>
          <view>
            <text>付款时间：</text><text v-if="item.paymentTime">{{ item.paymentTime || '' }}</text>
          </view>
        </view>
        <view
          class="shenqtuif yishenqtuif"
          v-if="item.orderStatus === '10'"
          @click='zhiFu(item)'
        >
          立即支付
        </view>
        <view
          class="shenqtuif chakanpinzhen"
          v-if="item.orderStatus === '12'"
          @click="lookPz(item.podId, data.orderType)"
        >
          查看凭证
        </view>
        <!-- <view v-else-if="item.orderStatus == 12" class="shenqtuif" @click.stop="handorderdailes(item)">
                    申请退费
                </view> -->
      </view>

      <!-- <view class="Lis">
                <view class="hede">
                    <view class="titles">
                        <text></text>
                        第二笔
                    </view>
                    <view class="order-status ytg-status">
                        已通过
                    </view>
                </view>
                <view class="contens">
                    <view>
                        <text>订单类型：</text><text>{{ data.datailList[1].orderType === '1' ? '订金' : '学费' }}</text>
                    </view>
                    <view>
                        <text>应收金额：</text><text>{{ data.datailList[1].paymentAmount }}元</text>
                    </view>
                    <view>
                        <text>实收金额：</text><text>{{ data.datailList[1].paymentAmount }}元</text>
                    </view>
                    <view>
                        <text>支付时间：</text><text>{{ data.datailList[1].updateTime }}</text>
                    </view>
                </view>

                <view class="shenqtuif chakanpinzhen" @click="lookPz">
                    查看凭证
                </view>
            </view> -->
    </view>
  </view>
</template>

<script>
import { getUserProfile, getPayOrderDetail, createXfOrder } from "@/api/system/user"

export default {
  data() {
    return {
      paymentMethod: '0',
      id: null,
      data: null,
    }
  },
  dicts: ['payment_method'],
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  onLoad(options) {
    // this.getUser()
    this.id = options.data
    this.orderStatus = options.orderStatus ? options.orderStatus : null;
    this.getPayOrderDetailList()
    console.log(this.dict.type.payment_method, '------------------')
  },
  methods: {
    getPayOrderDetailList() {
      getPayOrderDetail({ poId: this.id }).then(res => {
        this.data = res.data
      })
    },
    copyFn(data) {
      uni.setClipboardData({
        data: data,
        success: function () {
          //调用方法成功
          console.log('success');
        }
      })
    },


    handfuzhis(e) {
      uni.setClipboardData({
        data: e,
        success: () => {
          this.$modal.msgSuccess('复制成功')
        }
      });
    },
    handorderdailes() {
      this.$tab.navigateTo('/pageSec/mine/orderlist/refund')
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
    },
    // 查看凭证
    lookPz(id, orderType) {
      this.$tab.navigateTo('/pageSec/mine/orderlist/voucher?id=' + id + "&orderType=" + orderType)
    },
    zhiFu(item) {
      console.log(item)
      let params = {
        podId: item.podId
      }
      createXfOrder(params).then(res => {
        if (res.code === 200) {
          //	接口调用成功逻辑
          this.payFn(res.data)
        }
      })
    },
    payFn(data) {
      let that = this
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success(res) {
          console.log('支付成功', res)
          if (res.errMsg === 'requestPayment:ok') {
            // that.$tab.redirectTo('/pageSec/mine/info/finshUserInfo')
            that.getPayOrderDetailList()
          }
        },
        fail(res) {
          console.log('支付失败', res)
          that.$modal.msgError('支付失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text1 {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 28rpx;
  margin-bottom: 8rpx;
  font-weight: 600;
  line-height: 39.2rpx;
}

.container {
  min-height: 100vh;
  background-color: $uni-bg-color-cyan;
  padding: 0rpx 30rpx;
}

.tabse {
  background-color: $uni-bg-color-cyan;
  display: flex;
  width: 100%;
  padding-top: 32rpx;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;

  text {
    display: block;
    width: 200rpx;
    height: 56rpx;
    text-align: center;
    line-height: 56rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: $uni-text-color-placeholder;
    border: 1px solid rgba(252, 81, 95, 1);
  }

  .quanbu {
    border-radius: 8rpx 0 0 8rpx;
  }

  .shouhou {
    border-radius: 0px 8rpx 8rpx 0rpx;
  }
}

.active {
  background-color: $uni-text-color-placeholder;
  color: $uni-text-color-inverse !important;
  font-weight: 600 !important;
}

.Uls {
  width: 100%;

  .Lis {
    padding: 32rpx 16rpx 32rpx 17rpx;
    border-radius: 16rpx;
    margin-top: 32rpx;
    background: rgba(255, 255, 255, 1);
    position: relative;

    .hede {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .titles {
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

        font-size: 32rpx;
        font-weight: 600;
        color: $uni-text-color;
      }

      .time {
        font-size: 28rpx;
        font-weight: 600;
        color: $uni-text-color-grey;

        text {
          display: inline-block;
          color: $uni-text-color;
          border-left: 2px solid rgba(51, 51, 51, 1);
          vertical-align: centet;
          height: 27rpx;
          line-height: 28rpx;
          padding-left: 10rpx;
          margin-left: 10rpx;
        }
      }

      .order-status {
        font-size: 28rpx;
        font-weight: 600;
        color: $uni-text-color;

        &.dzf-status {
          color: $uni-color-primary;
        }
      }
    }

    .contens {
      margin-top: 30rpx;
      padding-top: 32rpx;
      border-top: 1px solid rgba(246, 248, 253, 1);

      text {
        margin-bottom: 8rpx;
        font-size: 28rpx;
        font-weight: 600;
        line-height: 39.2rpx;
        color: $uni-text-color;
      }
    }

    .shenqtuif {
      position: absolute;
      bottom: 32rpx;
      right: 16rpx;
      width: 130rpx;
      height: 46rpx;
      border-radius: 224rpx;
      border: 1px solid rgba(252, 81, 95, 1);
      text-align: center;
      line-height: 42rpx;
      font-size: 26rpx;
      font-weight: 400;
      color: $uni-text-color-placeholder;
    }

    .yishenqtuif {
      background: $uni-color-primary;
      color: $uni-text-color-inverse;
    }

    .chakanpinzhen {
      // background: $uni-text-color-placeholder;
      color: $uni-color-primary;
      border: 1px solid $uni-color-primary;
    }
  }
}
</style>