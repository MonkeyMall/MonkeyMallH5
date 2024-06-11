<template>
<uni-shadow-root class="customGuideCard-customGuideCard"><view class="swiperContentView" :style="'height: '+(height)+'px;'">
  <scroll-view class="guideScroll" scroll-x>
    <view v-for="(item,index) in (guideList)" :key="item" class="guideText" @click="chooseGuide" :data-id="index" :data-content="item" :style="guideIndex == index?'background-color: #ccc;':'background-color: #fff;'">{{item}}</view>
  </scroll-view>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'customGuideCard/customGuideCard'
var plugin = requirePlugin("myPlugin"); 
Component({
  properties: {
    controlSwiper: Boolean,
    guideList: Array,
    height: Number
  },
  data: {
    guideIndex: -1
  },

  attached: function () {
  },
  lifetimes: {
    ready: function () {
    }
  },
  methods: {
    //选择guideList事件
    chooseGuide: function (e) {
      const chat = plugin.getChatComponent(); // 通过getChatComponent方法获取到插件中的方法
      if (this.properties.controlSwiper) {
        this.setData(
          {
            guideIndex: e.currentTarget.dataset.id
          },
          () => {
            var that = this;
            that.setData({
              guideIndex: -1
            });
          }
        );
        chat.send(e.currentTarget.dataset.content) // 发送query
      }
    }
  }
});
export default global['__wxComponents']['customGuideCard/customGuideCard']
</script>
<style platform="mp-weixin">
.guideScroll {
  width: calc(100vw - 30px);
  height: 40px;
  white-space: nowrap;
}

.guideText {
  display: inline-block;
  font-size: 13px;
  text-align: center;
  padding: 0px 16px;
  margin-right: 10px;
  line-height: 33px;
  border: 1px solid rgba(237, 237, 237, 1);
  border-radius: 16px;
  color: rgba(136,136,136,1);
  background-color: #fff
}

.swiperContentView {
  height: 40px;
  padding-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  /* position: absolute;
  left: 15px;
  bottom: 145px; */
}
</style>