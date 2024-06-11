<template>
  <view>
    <view class="voucher">
      <view class="voucher-title">支付转账凭证</view>
      <view class="voucher-table">
        <view class="voucher-table-li">
          <view class="voucher-table-li-label">订单编号</view>
          <view class="voucher-table-li-info">{{ data.orderId }}</view>
        </view>
        <view class="voucher-table-li">
          <view class="voucher-table-li-label">收款方</view>
          <view class="voucher-table-li-info">{{ data.deptName }}</view>
        </view>
        <view class="voucher-table-li">
          <view class="voucher-table-li-label">交易类型</view>
          <view class="voucher-table-li-info">{{ data.orderType === '1' ? '订金' : '学费' }}</view>
        </view>
        <view class="voucher-table-li">
          <view class="voucher-table-li-label">交易金额</view>
          <view class="voucher-table-li-info">小写：{{ data.paidAmount }} 元； 大写：{{ data.paidAmountUp }}</view>
        </view>
        <view class="voucher-table-li">
          <view class="voucher-table-li-label">转账时间</view>
          <view class="voucher-table-li-info">{{ data.paymentTime }}</view>
        </view>
        <view class="voucher-table-li">
          <view class="voucher-table-li-label">交易状态</view>
          <view class="voucher-table-li-info">
            <dict-tag :options="dict.type.payment_order_status" :value="data.status" />
          </view>
        </view>
      </view>
      <view class="gaizhang">
        <view>盖章</view>
        <image :src="cdn + data.chapterImg" mode="scaleToFill" />
      </view>
      <view class="voucher-footer" @click="saveLargImgFn">保存到相册</view>
    </view>
    <canvas :style="style" canvas-id="shareFrends"></canvas>
  </view>
</template>

<script>
import { getUserProfile, getPayment } from "@/api/system/user"
import config from '@/config/index.js'
let _self
export default {
  dicts: ['payment_order_status'],
  data() {
    return {
      windowWidth: 0,
      id: null,
      orderType: null,
      data: {},
      style: '',
      cdn: config.COS_CDN_PREFIX_http,
    }
  },
  computed: {

  },
  async onLoad(options) {
    console.log(options);
    this.id = options.id
    this.orderType = options.orderType
    _self = this
    await this.getList()
    uni.getSystemInfo({
      success(res) {
        console.log('res: ', res);
        _self.windowWidth = res.windowWidth
        // that.windowHeight = Math.floor(299 * 943 / 598)
        _self.style = `width:${_self.windowWidth}px;height: 260px;position: fixed;top:-9999px;left:0;background:#ffffff;`
      }
    })
    // _self.creatCode()  // 调试的时候放开
  },
  methods: {
    async getList() {
      const { code, data } = await getPayment({ id: this.id, orderType: this.orderType })
      if (code !== 200) return
      this.data = data
      console.log(this.data);
    },
    // canvas绘制过程
    async creatCode() {
      // 屏幕宽度
      const ctx = wx.createCanvasContext('shareFrends')
      ctx.save()
      // 表格矩形
      let w = _self.windowWidth - 10 * 2 // 表格的宽
      let padd = 10 // 表格和画布的间距
      let h = 180 // 表格的高
      let row = 6 // 6行
      let fontSize = 14
      let tableColumn = h / row // 表格行间距(60)
      ctx.strokeStyle = "rgba(153, 153, 153, 1)";
      ctx.strokeRect(10, 10, 340, 180);
      // 表格横线
      for (let i = 1; i < 6; i++) {
        ctx.moveTo(padd, i * tableColumn + padd)  // 指定线的起点 ,moveTo的两个参数依次代表x轴坐标，y轴坐标。
        ctx.lineTo(350, i * tableColumn + padd)  // 指定线的下一点 ,lineTo的两个参数依次代表x轴坐标，y轴坐标。
        // ctx.fillStyle = "red"
        ctx.stroke()
      }
      // 表格竖线
      ctx.moveTo(padd + w / 4, padd)  // 指定线的起点 ,moveTo的两个参数依次代表x轴坐标，y轴坐标。
      ctx.lineTo(padd + w / 4, row * tableColumn + padd)  // 指定线的下一点 ,lineTo的两个参数依次代表x轴坐标，y轴坐标。
      ctx.stroke()

      // 绘制文字
      let textArr = [{
        label: '订单编号',
        text: _self.data.orderId
      }, {
        label: '收款方',
        text: _self.data.deptName
      }, {
        label: '交易类型',
        text: _self.data.orderType === '1' ? '订金' : '学费'
      }, {
        label: '交易金额',
        text: '小写:' + _self.data.paidAmount + " " + "大写:" + _self.data.paidAmountUp
      }, {
        label: '转账时间',
        text: _self.data.paymentTime
      }, {
        label: '交易状态',
        text: '支付成功'
      }]
      for (let i = 0; i < textArr.length; i++) {
        // 左边的文字
        ctx.setFontSize(fontSize)
        ctx.fillText(textArr[i].label, padd * 2, fontSize + (tableColumn - fontSize) + i * tableColumn)
        // 右边的文字
        ctx.setFontSize(fontSize)
        ctx.fillText(textArr[i].text, padd + w / 4 + fontSize, fontSize + (tableColumn - fontSize) + i * tableColumn)
      }
      // 盖章
      let imageW = 90
      let imageH = 90
      ctx.setFontSize(fontSize)
      ctx.fillText('盖章', w - 120, fontSize + (tableColumn - fontSize) + textArr.length * (tableColumn + 1))
      // 章的图片
      var gzImgPath = await _self.toPath(_self.cdn + _self.data.chapterImg)
      console.log(111, gzImgPath)
      ctx.drawImage(gzImgPath.path, w - imageW, h - 10, imageW, imageH)
      ctx.draw()
      setTimeout(() => {
        this.downImage()
      }, 100)
    },
    // 线上图片转化为本地路径
    toPath(avatar) {
      return new Promise(function (resolve, reject) {
        uni.getImageInfo({
          src: avatar,
          success: res => {
            console.log('图片信息', res)
            let obj = {
              width: res.width,
              height: res.height,
              path: res.path
            }
            resolve(obj)

          }
        })
      }).then(function (res) {
        return res
      })
    },
    // 
    getImgLocalPath(base64Str) {
      var _self = this
      removeSave().then(() => {
        writeFile(base64Str).then(function (img) {
          _self.img = img
        })
      })
    },
    saveImg(shareImg) {
      let that = this;
      // 获取用户是否开启用户授权相册
      wx.getSetting({
        success(res) {
          // 如果没有则获取授权
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: shareImg,
                  success() {
                    uni.hideLoading()
                    uni.showToast({
                      title: '保存成功'
                    })
                  },
                  fail() {
                    uni.showToast({
                      title: '保存失败',
                      icon: 'none'
                    })
                  }
                })
              },
              fail() {
                // 如果用户拒绝过或没有授权，则再次打开授权窗口
                //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
                that.openSet = true
              }
            })
          } else {
            // 有则直接保存
            wx.saveImageToPhotosAlbum({
              filePath: shareImg,
              success() {
                wx.showToast({
                  title: '保存成功'
                })
              },
              fail() {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          }
        }
      })
    },
    // 下载图片
    downImage() {
      var that = this
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'shareFrends',
        fileType: 'png',
        success: function (res) {
          console.log('下载结果', res)
          that.shareImg = res.tempFilePath
          that.saveImg(res.tempFilePath)
        }
      })
    },
    //打开设置授权
    e() {
      uni.openSetting({
        success(res) {
          console.log(res.authSetting)
          if (res.authSetting['scope.writePhotosAlbum']) {
            uni.showToast({
              icon: 'success',
              title: '授权成功'
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: '授权失败'
            })
          }

        }
      });
    },
    // 保存长图
    saveLargImgFn() {
      const _this = this
      uni.getSetting({
        success(res) {
          console.log(res.authSetting['scope.writePhotosAlbum'], '222')

          if (!res.authSetting['scope.writePhotosAlbum']) {
            uni.authorize({
              scope: 'scope.writePhotosAlbum',
              success(res) {
                console.log(res, '同意授权');
                _this.creatCode()
              },
              fail(err) {
                console.log(err, '拒绝授权');
                uni.showModal({
                  title: '提示',
                  content: '检测到您没有授权保存图片到相册，为了更好的体验，请前往设置授权',
                  success: function (res) {
                    if (res.confirm) {
                      _this.e()
                    } else if (res.cancel) {
                      console.log('用户点击取消');

                    }
                  }
                });
              }
            })
          } else {
            uni.showLoading({
              title: '下载中'
            })
            console.log('已经授权');
            _this.creatCode()
          }
        }
      });
      // uni.showLoading({
      //   title: '下载中'
      // })
      // this.creatCode()
    }
  }
}
</script>


<style lang="scss" scoped>
// canvas {
//   width: 50vh;
//   height: 300px;
//   position: fixed;
//   background: #fff;
//   // top: -1000px;
//   left: 0;
// }

.voucher {
  min-height: 100vh;
  background-color: $uni-bg-color-cyan;
  padding: 0rpx 30rpx;

  &-title {
    font-size: 32rpx;
    font-weight: 600;
    text-align: center;
    padding: 30rpx 0;
  }

  &-table {
    height: 360rpx;
    border: 1px solid $uni-text-color;
    position: relative;

    &-li {
      line-height: 60rpx;
      display: flex;

      &:not(:nth-child(6)) {
        border-bottom: 1px solid $uni-text-color;
      }

      &-label {
        width: 160rpx;
        font-weight: 600;
        text-align: center;
        color: $uni-text-color;
        border-right: 1px solid $uni-text-color;
      }

      &-info {
        flex: 1;
        text-align: center;
      }
    }
  }

  .gaizhang {
    font-size: 28rpx;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: -50rpx;

    image {
      width: 240rpx;
      height: 240rpx;
      margin-right: 10rpx;
    }
  }

  .voucher-footer {
    width: 260rpx;
    line-height: 80rpx;
    border-radius: 16rpx;
    background: $uni-color-primary;
    font-size: 32rpx;
    font-weight: 600;
    text-align: center;
    color: $uni-text-color-inverse;
    margin: 50rpx auto 0 auto;
  }
}
</style>