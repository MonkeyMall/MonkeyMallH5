<template>
<uni-shadow-root class="customoperateCard-customoperateCard"><view class="bottom-operate-view" v-if="(!inputing)" :style="'height: '+(height)+'px'">
  <view class="list-btn" @click.stop.prevent="chooseType" data-type="input">
    <image class="list-img" src="https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/keyboard.png"></image>
  </view>
  <view class="voice-btn" @touchstart="inputVoiceStart" @touchcancel="inputVoiceEnd" @touchend="inputVoiceEnd">
    <image class="voice-img" src="https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/customVoiceBtn.png"></image>
  </view>
  <view class="input-btn" @click.stop.prevent="showGuideView">
    <image class="input-img" src="https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/home.png"></image>
  </view>
</view>
<view class="bottom-operate-view" v-if="inputing">
  <view class="list-btn-inputView" @click.stop.prevent="chooseType" data-type="voice">
    <image class="list-img2" src="https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/voiceBtn.png"></image>
  </view>
  <view class="input-btn-inputView">
    <input class="input-view" :focus="focus" placeholder="请输入" :value="inputText" @blur="changContentInput" type="text" confirm-type="send" @confirm="bindconfirmInput" @input="bindInput" placeholder-style="color: #c4c5c7" cursor-spacing="10"></input>
  </view>
  <view class="voice-btn-inputView" @click.stop.prevent="showGuideView">
    <image class="voice-img2" src="https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/home.png"></image>
  </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'customoperateCard/customoperateCard'
var plugin = requirePlugin("myPlugin");
Component({
  properties: {
    focus: Boolean, // 自动获取焦点
    inputText: String, //  文本内容
    inputing: Boolean, // 切换显示
    height: Number
  },

  data: {
    inputing: false, //值为true时表示正在输入
    inputText: ''
  },
  lifetimes: {
    ready: function() {
      if (this.properties.focus) {
        this.setData({
          focus: this.properties.focus,
          inputing: true
        })
      }
    },
    attached:function () {
    }
  },
  methods: {
    bindInput: function(e) {
      this.setData({
        inputText: e.detail.value
      });
    },
    // 输入选择
    chooseType: function(e) {
      if (e.currentTarget.dataset.type == "voice") {
        this.setData({
          inputing: false
        });
      } else {
        this.setData({
          inputing: true
        });
      }
    },
    bindconfirmInput: function(e) {
      var that = this;
      let text = e.detail.value;
      const chat = plugin.getChatComponent(); // 通过getChatComponent方法获取到插件中的方法
      chat.send(text) // 发送query
      that.setData({
        inputText: ''
      })
    },
    // 返回首页
    showGuideView: function() {
      const chat = plugin.getChatComponent(); // 通过getChatComponent方法获取到插件中的方法
      chat.backHome() // 返回
    },
    // 启动语音
    inputVoiceStart: function() {
      const chat = plugin.getChatComponent(); // 通过getChatComponent方法获取到插件中的方法
      chat.inputVoiceStart() // 语音开始
    },
    // 停止语音
    inputVoiceEnd: function() {
      const chat = plugin.getChatComponent(); // 通过getChatComponent方法获取到插件中的方法
      chat.inputVoiceEnd() // 语音结束
    },
  }
});
export default global['__wxComponents']['customoperateCard/customoperateCard']
</script>
<style platform="mp-weixin">
.bottom-operate-view {
  /* position: absolute;
  bottom: 0; */
  width: 100%;
  height: 120px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.list-btn {
  /* position: absolute;
  left: calc(25vw - 40px);
  bottom: 51px; */
  width: 40px;
  height: 40px;
  border-radius:50%;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
}
.voice-btn {
  /* position: absolute;
  left: calc(50vw - 41px);
  bottom: 30px; */
  width: 75px;
  height: 75px;
  border-radius:50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #ffffff; */
}
.input-btn {
  /* position: absolute;
  right: calc(25vw - 40px);
  bottom: 51px; */
  width: 40px;
  height: 40px;
  border-radius:50%;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-btn-inputView {
  /* position: absolute;
  left: 30px;
  bottom: 51px; */
  width: 40px;
  height: 40px;
  border-radius:50%;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.input-btn-inputView {
  /* position: absolute;
  right: 75px;
  left: 75px; */
  /* bottom: 51px; */
  height: 40px;
  background-color: #fff;
  box-shadow:0px 8px 32px 3px rgba(212,212,212,0.19);
  border-radius:40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.voice-btn-inputView {
  /* position: absolute;
  right: 30px;
  bottom: 51px; */
  width: 40px;
  height: 40px;
  border-radius:50%;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.voice-img {
  /* margin-top: 20px;
  margin-left: 26px; */
  width: 75px;
  height: 75px;
}
.list-img {
  width: 25px;
  height: 18px;
}

.list-img2 {
  width: 25px;
  height: 25px;
}

.input-img {
  width: 22px;
  height: 22px;
}
.voice-img2 {
  width: 22px;
  height: 22px;
}
.input-view {
  padding: 5px 10px;
  font-size: 15px;
  height: 30px;
  width: calc(100vw - 150px);
}

.cardView{
  width: 100%;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
/* //浮动录音按钮 */
.recordView{
  position: absolute;
  bottom: 50px;
  right: 15px;
}
.recordImg{
  float: right;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 100%;
}
.recordText{
  float: right;
  margin-right: 5px;
  max-width: calc(100% - 45px);
  line-height: 20px;
  font-size:14px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(102,102,102,1);
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 40px;
  display: -webkit-box ;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:3; 
}
</style>