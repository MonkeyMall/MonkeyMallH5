<template>
  <view class="container">
    <view class="tabse">
      <text class="quanbu" :class="index == 1 ? 'active' : ''" @click="handtabIndex(1)">全部</text>
      <text class="shouhou" :class="index == 2 ? 'active' : ''" @click="handtabIndex(2)">售后</text>
    </view>
    <view class="Uls" v-if="list.length > 0">
      <!-- 申请退费 -->
      <view class="Lis" @click="orderInfoFn(item)" v-for="(item, ind) in list" :key="ind">
        <view class="hede">
          <view class="titles">
            <text></text>
            {{ index == 1 ? '系统订单编号' : '退款订单编号' }}:
          </view>
          <view v-if="index == 1" class="time" @click.stop="handfuzhis(item.orderId)"> {{ item.orderId }}<text
              @click.stop="copyFn(item.orderId)">复制</text> </view>
          <view v-if="index == 2" class="time" @click.stop="handfuzhis(item.refundNum)"> {{ item.refundNum }}<text
              @click.stop="copyFn(item.refundNum)">复制</text></view>
        </view>
        <view class="contens">
          <view>
            <text>订单类型：</text><text>{{ item.orderType === '1' ? '订金' : '学费' }}</text>
          </view>
          <view v-if="index == 1">
            <text>应收金额：</text><text>{{ item.paymentAmount === null || item.paymentAmount === undefined ||
        item.paymentAmount === '' ? '' : item.paymentAmount }}元</text>
          </view>
          <view v-if="index == 2 && item.actualAmount">
            <br>
            <text>实收金额：</text><text>{{ item.actualAmount === null || item.actualAmount === undefined ||
        item.actualAmount === '' ? '' : item.actualAmount || '' }}元</text>
          </view>

          <view v-if="index == 1">
            <text>实收金额：</text><text
              v-if="item.paidAmount !== null && item.paidAmount !== '' && item.paidAmount !== undefined">{{
        item.paidAmount }}元</text>
          </view>
          <view v-if="index == 2">
            <text>退款金额：</text><text
              v-if="item.refundAmount !== null && item.refundAmount !== '' && item.refundAmount !== undefined">{{
        item.refundAmount }}元</text>
          </view>
          <view v-if="index == 1 && item.orderType === '1'">
            <text>支付时间：</text><text v-if="item.paymentTime">{{ item.paymentTime }}</text>
          </view>
          <view v-if="index == 2">
            <text>退款时间：</text><text v-if="item.refundPassTime">{{ item.refundPassTime }}</text>
          </view>
        </view>
        <!-- 已缴清 跳转列表详情也 -->
        <view v-if="item.orderStatus == 10" class="shenqtuif yijiaoqin">
          已缴清
        </view>
        <!-- 补交尾款 跳转列表详情也 -->
        <view v-else-if="item.orderStatus == 11" class="shenqtuif bujiaoweikuan">
          补交尾款
        </view>
        <view v-else-if="item.orderStatus == 12" class="shenqtuif" @click.stop="handorderdailes(item)">
          申请退费
        </view>
        <view v-else-if="item.orderStatus == 13" class="shenqtuif yishenqtuif">
          已退费
        </view>
        <view v-else-if="item.orderStatus == 14" class="shenqtuif wanshanziliao" @click.stop="finshUserInfo">
          完善资料
        </view>
        <view v-else-if="item.orderStatus == 15" class="shenqtuif tuifeizhong" @click.stop="handorderdailes(item)">
          退费中
        </view>
        <view v-else-if="item.orderStatus == 16" class="shenqtuif " @click.stop="delFn(item)">
          删除
        </view>
        <!-- status -->

        <dict-tag v-if="index == 2"
          :class="item.approveStatus == 0 ? 'tuifeizhong' : item.approveStatus == 1 ? 'yijiaoqin' : 'bujiaoweikuan'"
          class="shenqtuif" :options="dict.type.refund_approve_status" :value="item.approveStatus" />
      </view>
      <!-- <uni-load-more :status="loadingStatus"></uni-load-more> -->
    </view>
    <uni-default-page :value="4" tic="暂无数据" btntext="返回上级" v-else></uni-default-page>
  </view>
</template>

<script>
import {
  getUserProfile, getPayOrder, getRefundOrder, delDingjin
} from "@/api/system/user"
import UniDefaultPage from '@/pageSec/components/uni-default-page/uni-default-page.vue'
import { getUserId } from '@/utils/auth'
export default {
  components: { UniDefaultPage },
  data() {
    return {
      index: 1,
      list: [],
      //定义加载方式 more---contentdown  loading---contentrefresh nomore---contentnomore
      loadingStatus: 'more',
      userId: getUserId()
    }
  },
  dicts: ['refund_approve_status'],
  computed: {
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  // onLoad() {
  //   // this.getUser()
  //   this.getgetPayOrderList()
  // },
  onShow() {
    // this.getUser()
    this.getDataList()
  },
  created() {
    // 获取用户信息
    console.log('userinfo', this.$store)
  },
  methods: {
    //	数据获取
    getDataList() {
      if (this.userId && this.index == 1) {
        this.getgetPayOrderList()
      } else if (this.userId && this.index == 2) {
        this.getRefundOrderList()
      }
    },
    //	删除
    delFn(val) {
      console.log(val)
      delDingjin(val.poId).then(res => {
        if (res.code === 200) {
          uni.showToast({
            title: '删除成功',
            duration: 2000,
          })
          this.getDataList()
        }
      })
    },
    handEmit() {
      this.$tab.navigateBack(1)
    },
    //上拉加载获取更多的限时活动
    async getmoreActives() {
      console.log('loadingStatus', this.loadingStatus)
      if (this.loadingStatus === 'nomore') {
        return false;
      }
      this.loadingStatus = 'loading';
      if (this.listRb.length < this.total) {
        this.obj.pageNum++
        await this.getRbList()
      } else {
        this.loadingStatus = 'nomore';
      }
    },
    getgetPayOrderList() {
      getPayOrder({ userId: this.userId }).then(res => {
        // res.data.forEach(item => {
        //     item.orderStatus = 14
        // })
        this.list = res.data
        console.log(this.list);
      })
    },
    getRefundOrderList() {
      getRefundOrder({ userId: this.userId }).then(res => {
        this.list = res.data
        console.log(this.list);
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
    handtabIndex(value) {
      this.index = value
      this.list = []
      if (this.userId) {
        if (value == 1) {
          this.getgetPayOrderList()
        } else if (value == 2) {
          this.getRefundOrderList()
        }
      }
    },
    handfuzhis(e) {
      uni.setClipboardData({
        data: e,
        success: () => {
          this.$modal.msgSuccess('复制成功')
        }
      });
    },
    handorderdailes(item) {
      console.log(item);
      let data = encodeURIComponent(JSON.stringify(item))
      this.$tab.navigateTo('/pageSec/mine/orderlist/refund?data=' + data)
    },
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
        this.roleGroup = response.roleGroup
        this.postGroup = response.postGroup
      })
    },
    // 查看订单详情
    orderInfoFn(data) {
      // let id = data.poId ? data.poId : data.prId
      if (this.index == 2) {
        return
      }
      if (data.orderType === '1') {
        this.$tab.navigateTo('/pageSec/mine/orderlist/orderInfo?data=' + data.poId + "&orderStatus=" + data.orderStatus)
      } else {
        this.$tab.navigateTo('/pageSec/mine/orderlist/orderInfo?data=' + data.poId)
      }

    },
    // 完善资料
    finshUserInfo() {
      this.$tab.navigateTo('/pageSec/mine/info/finshUserInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: $uni-bg-color-cyan;
  overflow: hidden;
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
  margin-top: 110rpx;
  height: 90vh;
  overflow: hidden;
  overflow-y: scroll;
  padding: 0rpx 30rpx;

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

        font-size: 28rpx;
        font-weight: 600;
        color: $uni-text-color;
      }

      .time {
        font-size: 26rpx;
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
      border: 1px solid $uni-color-primary;
      text-align: center;
      line-height: 42rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: $uni-text-color-placeholder;
    }

    .yishenqtuif {
      border: 1px solid rgba(51, 51, 51, 1);
      color: $uni-text-color;
    }

    .yijiaoqin {
      color: $uni-bg-color-select;
      border: 1px solid $uni-bg-color-select;
    }

    .tuifeizhong {
      color: rgba(255, 127, 3, 1);
      border: 1px solid rgba(255, 127, 3, 1);
    }

    .wanshanziliao {
      color: $uni-text-color-inverse;
      background: $uni-color-primary;
    }

    .bujiaoweikuan {
      color: rgba(53, 104, 245, 1);
      border: 1px solid rgba(53, 104, 245, 1);
    }

    // .chakanpinzhen {
    //     // background: $uni-text-color-placeholder;
    //     color: $uni-color-primary;
    //     border: 1px solid $uni-color-primary;
    //     position: absolute !important;
    //     right: 164rpx;
    // }
  }
}
</style>