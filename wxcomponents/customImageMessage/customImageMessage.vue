<template>
<uni-shadow-root class="customImageMessage-customImageMessage"><view class="container">
   <image class="answerimage" src="https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/answerImage.png"></image>
   <image class="imgcard-img" :src="msg.data.url"></image>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'customImageMessage/customImageMessage'
Component({
  properties: {
    msg: Object
  },

  data: {},
  lifetimes: {
    ready: function () {
    }
  },
  methods: {}
});
export default global['__wxComponents']['customImageMessage/customImageMessage']
</script>
<style platform="mp-weixin">
.imgcard-img {
  width: 145px;
  height: 145px;
  margin: 10px 0;
}
.container {
  display: flex;
}
.answerimage {
  width: 38px;
  height: 38px;
  margin-right: 10px;
  margin-top: 10px;
}
</style>