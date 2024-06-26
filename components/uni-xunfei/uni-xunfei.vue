<template>
  <view class="container">
    <!-- <input type="text" placeholder="请输入搜索关键字" class="search" @focus="keyboardFn" v-model="searchKeyInput" /> -->
    <view
      class="videoBtn"
      :style="{ 'bottom': keyboardHeight + 'px' }"
      v-if="is_Speech"
    >
      <view
        class="videoBtn-1"
        @click='start'
      >
        <image
          class="videoBtn-2"
          src="https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/xunfei/v2.png"
        ></image>
      </view>
    </view>
    <uni-popup
      ref="popup"
      type="bottom"
      :is-mask-click='true'
    >
      <view class="xunfei-box">
        <view
          class="closePopup"
          @click="closePopupFn"
        >
          <i class="iconfont closePopup">&#xe634;</i>
        </view>
        <view class="xunfei-tips">请说，我在聆听...</view>
        <view
          v-show="!searchKey"
          class="xunfei-demo"
        >您可以试试这样说：

          <text
            v-for="(item, index) in keyWordsArray"
            :key="index"
          >{{index !== keyWordsArray.length - 1 ? item + '/' : item}}</text>
        </view>
        <view
          v-show="searchKey"
          class="xunfei-demo"
        >{{ searchKey }}</view>
        <view class="dian-box">
          <view class="dian-box-child">
            <view class="dian"></view>
            <view class="dian"></view>
            <view class="dian"></view>
            <view class="dian"></view>
            <view class="dian"></view>
            <view class="dian"></view>
          </view>
          <view class="dian-box-child dian-box-anmation">
            <view class="dian-box-anmation-box">
              <view class="dian"></view>
              <view class="dian"></view>
              <view class="dian"></view>
            </view>
          </view>
          <view class="dian"></view>
          <view class="dian-box-child dian-box-anmation">
            <view class="dian-box-anmation-box">
              <view class="dian"></view>
              <view class="dian"></view>
              <view class="dian"></view>
            </view>
          </view>
          <view class="dian"></view>
          <view class="dian-box-child dian-box-anmation">
            <view class="dian-box-anmation-box">
              <view class="dian"></view>
              <view class="dian"></view>
              <view class="dian"></view>
            </view>
          </view>
          <view class="dian"></view>
          <view class="dian-box-child dian-box-anmation">
            <view class="dian-box-anmation-box">
              <view class="dian"></view>
              <view class="dian"></view>
              <view class="dian"></view>
            </view>
          </view>
          <view class="dian"></view>
          <view class="dian-box-child dian-box-anmation">
            <view class="dian-box-anmation-box">
              <view class="dian"></view>
              <view class="dian"></view>
              <view class="dian"></view>
            </view>
          </view>
          <view class="dian"></view>
          <view class="dian-box-child">
            <view class="dian"></view>
            <view class="dian"></view>
            <view class="dian"></view>
            <view class="dian"></view>
            <view class="dian"></view>
            <view class="dian"></view>
          </view>
        </view>
      </view>
    </uni-popup>

    <!-- <view class="content">
      <button class="btn" @touchstart='start' @touchend="stop">点击按钮说话</button>
    </view> -->
  </view>
</template>

<script>
import uniPopup from '../uni-popup/components/uni-popup/uni-popup.vue'
import keyWordObj from './keyWords'
const recorderManager = wx.getRecorderManager();
let wxst; //语音websocket
let status = 0;  // 音频的状态
let iatResult = [] // 识别结果
const searchoptions = {
  duration: 60000,//指定录音的时长，单位 ms
  sampleRate: 8000,//采样率
  numberOfChannels: 1,//录音通道数
  encodeBitRate: 48000,//编码码率
  format: 'PCM',//音频格式
  frameSize: 5,//指定帧大小，单位 KB
}
let that
export default {
  name: 'uniXunfei',
  components: {
    uniPopup
  },
  props: {
    is_Speech: {
      type: Boolean,
      default: false
    },
    initFn: {
      type: String,
      default: ''
    },
    keyWordName: {
      type: String,
      default: 'checkcolleges'
    }
  },
  data() {
    return {
      xfurl: "",
      searchKeyInput: '',
      searchKey: "",
      keyboardHeight: 0,
      keyWordsArray: keyWordObj[this.keyWordName]
    };
  },
  created() {
    wx.onKeyboardHeightChange(res => {
      console.log('键盘高度', res.height)
      this.keyboardHeight = res.height
    })

    that = this
    this.getUrl()
    this.initScoket()
  },
  methods: {
    // 父组件input focus,执行此方法
    // keyboardFn() {
    //   wx.onKeyboardHeightChange(res => {
    //     this.keyboardHeight = res.height
    //   })
    // },
    getUrl() {
      //请求接口 获取讯飞语音鉴权
      wx.request({
        url: 'https://ky.yykjedu.com/prod-api/file/url',
        method: 'GET',
        header: { 'content-type': 'application/json' },
        success(res) {
          that.xfurl = res.data
        },
        fail: function () {
          wx.showToast({
            title: '获取语音鉴权失败',
            icon: 'none',
            mask: true,
            duration: 3000
          })
        }
      })
    },
    // 所有socket的监听
    initScoket() {
      wx.onSocketOpen((res) => {// websocket打开
        console.log('监听到 WebSocket 连接已打开');
      })
      wx.onSocketError((err) => {//连接失败
        console.log('websocket连接失败', err);
        wx.showToast({
          title: 'websocket连接失败',
          icon: 'none',
          duration: 2000,
          mask: false
        })
      })
      wx.onSocketMessage((res) => {//接收返回值
        let str = ""
        let data = JSON.parse(res.data)
        console.log('返回值：', data)
        if (data.code != 0) {
          return console.log("error code " + data.code + ", reason " + data.message)
        }
        if (data.data.status == 2) wxst.close();
        iatResult[data.data.result.sn] = data.data.result
        if (data.data.result.pgs == 'rpl') {
          data.data.result.rg.forEach(i => {
            iatResult[i] = null
          })
        }
        iatResult.forEach(i => {
          if (i != null) {
            i.ws.forEach(j => {
              j.cw.forEach(k => {
                str += k.w
              })
            })
          }
        })
        that.searchKey = str //这个是中间的语音识别结果
      })
      //WebSocket连接已关闭！
      wx.onSocketClose((res) => {
        console.log('WebSocket连接已关闭！')
        recorderManager.stop();
        let str = that.searchKey;
        console.log(str);
        str = str.replace(/\s*/g, "");//去除空格
        if (str.substr(str.length - 1, 1) == "。") {//去除句号
          str = str.substr(0, str.length - 1);
        }
        that.searchKey = str //这个是最后确定的语音识别结果
        setTimeout(() => {
          that.stop()
        }, 500)
      })
    },
    // 语音相关的监听
    initManager() {
      recorderManager.onStart(() => {//开始录音时触发
        status = 0;
        iatResult = []
      });
      recorderManager.onError((res) => {//错误回调
        console.log(res);
      });
      recorderManager.onStop((res) => {//结束录音时触发
        console.log('recorder stop', res)
        status = 2;
        wxst.send({
          data: JSON.stringify({
            data: { status: 2, format: "audio/L16;rate=8000", encoding: "raw" }
          })
        })
      });
      recorderManager.onFrameRecorded((res) => {//每帧触发
        const int16Arr = new Int8Array(res.frameBuffer);
        const base64 = wx.arrayBufferToBase64(int16Arr)
        console.log('111', res, status)
        console.log('发送信息')
        if (res.isLastFrame) return
        switch (status) {
          case 0:
            status = 1;
            wxst.send({
              data: JSON.stringify({
                common: { app_id: "5728c298" },
                business: { language: "zh_cn", domain: "iat", accent: "mandarin", dwa: "wpgs", vad_eos: 1000 },
                data: { status: 0, format: "audio/L16;rate=8000", encoding: "raw", audio: base64 }
              })
            })
            break;
          case 1:
            wxst.send({
              data: JSON.stringify({
                data: { status: 1, format: "audio/L16;rate=8000", encoding: "raw", audio: base64 }
              })
            })
            break;
          default:
        }
      })
    },

    /* 开始录音 */
    start() {
      this.$refs.popup.open()
      console.log('--开始录音--')
      //查看用户有没有开启语音权限
      wx.getSetting({
        success(res) {
          console.log(1, res.authSetting['scope.record'])
          if (!res.authSetting['scope.record']) {
            wx.authorize({
              scope: 'scope.record',
              success() {
                that.connectSocketFn()
              },
              fail() {
                wx.showModal({
                  title: '微信授权',
                  content: '您当前未开启语音权限，请在右上角设置(···)中开启“录音功能”',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定1')
                    }
                  }
                })
              }
            })
          } else {
            that.connectSocketFn()
          }
          // else {
          //   wx.showModal({
          //     title: '微信授权',
          //     content: '您当前未开启语音权限，请在右上角设置(···)中开启“录音功能”',
          //     showCancel: false,
          //     success(res) {
          //       if (res.confirm) {
          //         console.log('用户点击确定2')
          //       }
          //     }
          //   })
          // }
        }
      })
    },
    /* 结束录音 */
    stop() {
      console.log('--结束录音--', this.searchKey)
      recorderManager.stop();
      this.$refs.popup.close();
      // this.searchKeyInput = this.searchKey
      // if (this.searchKey) return
      this.$emit('searchKey', this.searchKey)
      this.$parent[this.initFn](this.searchKey)
      this.$parent.is_Speech = false
      this.searchKey = ''
    },
    // 连接scoket
    connectSocketFn() {
      wxst = wx.connectSocket({ // 开启websocket连接
        url: that.xfurl,
        method: 'GET',
        success: function (res) {
          recorderManager.start(searchoptions);//开始录音
          that.initManager()
        }
      })
    },
    // 关闭语音弹窗
    closePopupFn() {
      this.stop()
    }
  }
};
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: #ffffff;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search {
  width: 340rpx;
  height: 80rpx;
  border: 1px solid #ccc;
  border-radius: 16rpx;
  margin: 32rpx auto;
  padding: 5rpx 10rpx;
}

// 播放按钮的动画
@keyframes rotate {
  0% {
    transform: rotateY(-90deg);
  }

  /* 初始状态，不旋转 */
  100% {
    transform: rotateY(0deg);
  }

  /* 结束状态，逆时针旋转90度 */
}

// 录音的动画
@keyframes dianKeyframes1 {
  0% {
    height: 6rpx;
  }

  25% {
    height: 28rpx;
  }

  50% {
    height: 50rpx;
  }

  75% {
    height: 28rpx;
  }

  100% {
    height: 6rpx;
  }
}

@keyframes dianKeyframes2 {
  0% {
    height: 28rpx;
  }

  25% {
    height: 50rpx;
  }

  50% {
    height: 28rpx;
  }

  75% {
    height: 6rpx;
  }

  100% {
    height: 28rpx;
  }
}

@keyframes dianKeyframes3 {
  0% {
    height: 50rpx;
  }

  25% {
    height: 28rpx;
  }

  50% {
    height: 6rpx;
  }

  75% {
    height: 28rpx;
  }

  100% {
    height: 50rpx;
  }
}

.videoBtn {
  width: 100%;
  height: 50rpx;
  background: rgba(237, 240, 244, 1);
  position: fixed;
  bottom: 0;
  left: 0;

  &-1 {
    width: 185rpx;
    height: 90rpx;
    background: url('https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/xunfei/v1.png');
    background-size: 185rpx 90rpx;
    position: absolute;
    top: -80rpx;
    left: 50%;
    margin-left: -92rpx;
  }

  &-2 {
    width: 82rpx;
    height: 82rpx;
    background: url('https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/xunfei/v1.png');
    background-size: 82rpx 82rpx;
    position: absolute;
    left: 50%;
    margin-left: -41rpx;
    bottom: -8rpx;
    animation: rotate 1s;
  }
}

.xunfei-box {
  height: 608rpx;
  border-radius: 16px 16px, 0px, 0px;
  background: #fff;
  padding: 80rpx 108rpx 0;

  .closePopup {
    width: 50rpx;
    height: 50rpx;
    font-size: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 30rpx;
    top: 30rpx;
  }

  .xunfei-tips {
    text-align: center;
    font-size: 40rpx;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 56rpx;
    color: rgba(51, 51, 51, 1);
    vertical-align: top;
    margin: 50rpx 0 30rpx 0;
  }

  .xunfei-demo {
    font-size: 28rpx;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 60rpx;
    color: rgba(51, 51, 51, 1);

    text {
      color: rgba(153, 153, 153, 1);
    }
  }

  .dian-box {
    height: 50rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80rpx;

    .dian {
      width: 6rpx;
      height: 6rpx;
      opacity: 1;
      margin: 5rpx;
      border-radius: 6rpx;
      background: rgba(252, 81, 95, 1);
    }

    .dian-box-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dian-box-anmation-box {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dian-box-anmation-box {
      .dian:nth-of-type(1) {
        height: 6rpx;
        animation: dianKeyframes1 1.5s infinite;
      }

      .dian:nth-of-type(2) {
        height: 28rpx;
        animation: dianKeyframes2 1.5s infinite;
      }

      .dian:nth-of-type(3) {
        height: 50rpx;
        animation: dianKeyframes3 1.5s infinite;
      }
    }
  }
}
</style>