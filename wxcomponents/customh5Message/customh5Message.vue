<template>
<uni-shadow-root class="customh5Message-customh5Message"><view class="view">
  <image class="answerimage" src="https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/answerImage.png"></image>
  <view class="container" @click="gowebView" :data-url="url">
    <view class="top">{{title}}</view>
    <view class="bottom">
      <view class="description">{{description}}</view>
      <image :src="picurl" class="image"></image>
    </view>
  </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'customh5Message/customh5Message'
Component({
    properties: {
        msg: Object,
    },

    data: {},
    lifetimes: {
        ready: function () {
            this.setData({
                picurl: this.properties.msg.docs[0].picurl,
                title: this.properties.msg.docs[0].title,
                description: this.properties.msg.docs[0].description,
                url: this.properties.msg.docs[0].url,
                type: this.properties.msg.docs[0].type,
            });
        },
    },
    methods: {
        gowebView: function (e) {
            let url = e.currentTarget.dataset.url;
            wx.navigateTo({
                url: "/pages/webviewPage/webviewPage?url=" + url,
                success: function (res) {},
                fail: function (res) {},
                complete: function (res) {},
            });
        },
    },
});
export default global['__wxComponents']['customh5Message/customh5Message']
</script>
<style platform="mp-weixin">
.view {
  display: flex;
}
.answerimage {
  width: 38px;
  height: 38px;
  margin-right: 10px;
  margin-top: 10px;
}
.container {
  width: 237.5px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  padding: 12px;
}
.top {
  font-size:18px;
  letter-spacing: -0.5px;
  line-height: 21px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:#000000;
  width: 100%;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.bottom {
  margin-top: 6px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.image {
  margin-left: 9px;
  width:45px;
  height:45px;
}
.description {
  font-size:13px;
  line-height: 15px;
  letter-spacing: -0.3px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:#888888;
  flex: 1;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>