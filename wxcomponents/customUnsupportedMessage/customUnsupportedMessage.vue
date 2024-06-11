<template>
<uni-shadow-root class="customUnsupportedMessage-customUnsupportedMessage"><view class="leftView">
  暂未支持消息类型，请查看开发文档复写unsupportedMessage组件
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'customUnsupportedMessage/customUnsupportedMessage'
Component({
  properties: {
    msg: Object
  },

  data: {},
  lifetimes: {
    ready: function() {}
  },
  methods: {}
});
export default global['__wxComponents']['customUnsupportedMessage/customUnsupportedMessage']
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
</style>