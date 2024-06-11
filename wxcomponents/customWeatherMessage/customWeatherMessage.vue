<template>
<uni-shadow-root class="customWeatherMessage-customWeatherMessage"><view class="container">
  <image class="answerimage" src="https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/answerImage.png"></image>
  <view class="answer">
    <view>{{msg.answer}}</view>
    <view v-for="(item,index) in (queryBMIList)" :key="item.index" class="hrefWord" @click="send" :data-item="item">{{item.description}}</view>
  </view>
  <view style="clear: both;"></view>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'customWeatherMessage/customWeatherMessage'
var plugin = requirePlugin("myPlugin"); 
Component({
  properties: {
    msg: Object
  },

  data: {
    queryBMIList: [
      {
        url:
          "https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/iconOne.png",
        description: "北京今天空气质量"
      },
      {
        url:
          "https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/HealthyIcon.png",
        description: "北京今日防晒指数"
      },
      {
        url:
          "https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/iconTwo.png",
        description: "北京明天的天气"
      }
    ]
  },
  lifetimes: {
    ready: function() {
    }
  },
  methods: {
    send: function(e) {
      const chat = plugin.getChatComponent(); // 通过getChatComponent方法获取到插件中的方法
      chat.send(e.currentTarget.dataset.item.description) // 发送query
    }
  }
});
export default global['__wxComponents']['customWeatherMessage/customWeatherMessage']
</script>
<style platform="mp-weixin">
.answer{
  margin: 10px 0;
  padding: 10px 18px;
  background:rgba(255,255,255,1);
  color:rgba(48,49,51,1);
  border-radius:5px;
  max-width: calc(96vw - 120px);
  font-size: 13px;
  line-height: 18px;
  overflow:hidden;
   word-wrap:break-word;
  text-align: justify;
  box-shadow:0px 3px 8px 0px rgba(219,235,249,0.51);
  border:1px solid rgba(213,226,254,1);
}
.container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.answerimage {
  width: 38px;
  height: 38px;
  margin-right: 10px;
  margin-top: 10px;
}

.hrefWord {
  font-size: 14px;
  color:#61A9FF;
  margin-top: 5px;
}
</style>