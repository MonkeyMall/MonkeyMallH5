<template>
<uni-shadow-root class="customNewsMessage-customNewsMessage"><view class="container">
  <view class="answer">
    <image class="answerimage" src="https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/answerImage.png"></image>
    <view class="leftView">
      {{answer}}
    </view>
  </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'customNewsMessage/customNewsMessage'
Component({
  properties: {
    msg: Object
  },
  data: {
    answer: ''
  },

  lifetimes: {
    ready: function() {
      let msg = this.properties.msg
      this.setData({
        answer: this.properties.msg.answer
      })
    }
  },
  methods: {
    
  }
});
export default global['__wxComponents']['customNewsMessage/customNewsMessage']
</script>
<style platform="mp-weixin">
.leftView {
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
.answerimage {
  width: 38px;
  height: 38px;
  margin-right: 10px;
  margin-top: 10px;
}
.answer {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.container {
  display: flex;
  flex-direction: column;
}
</style>