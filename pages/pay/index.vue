<template>
  <view></view>
</template>

<script>
import { payInfo, getUv } from '@/api/comm'
import { getUserId, setTeacherId, getTeacherId, getPhone } from '@/utils/auth'
let that
export default {
  components: {
  },
  data() {
    return {
      info: null,
      userId: getUserId()
    }
  },
  computed: {

  },
  async onLoad(query) {
    that = this
    let scene
    console.log(111, decodeURIComponent(query.scene))
    if (query.scene) {
      console.log('走这里了-3', query.scene)
      scene = decodeURIComponent(query.scene)
      setTeacherId(scene)
      await getUv()
      console.log('scene', scene)
    }
    if (!getPhone()) {
      console.log('走这里了-2')
      that.$tab.redirectTo('/pages/login?referer=payinfo')
    } else {
      console.log('走这里了-1')
      this.getPayInfo()
    }
  },
  onShow() {
    // console.log('onShow')
    // this.userId = getUserId()
    // if (this.userId) {
    //   this.getPayInfo()
    // }
  },
  methods: {
    // 获取支付信息
    async getPayInfo() {
      const { code, data } = await payInfo(this.userId, getTeacherId())
      if (code === 200 && !data) {
        this.$tab.reLaunch('/pages/index')
        return
      }
      this.info = data
      console.log('列表数据', data)
      this.payFn(data)
    },
    payFn(data) {
      that = this
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success(res) {
          console.log('支付成功', res, that)
          if (res.errMsg === 'requestPayment:ok') {
            that.$tab.redirectTo('/pageSec/mine/info/finshUserInfo')
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
</style>