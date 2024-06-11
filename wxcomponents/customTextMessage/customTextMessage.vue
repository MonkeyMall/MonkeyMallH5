<template>
<uni-shadow-root class="customTextMessage-customTextMessage"><view class="container">
  <view class="answer">
    <image class="answerimage" src="https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/answerImage.png"></image>
    <view class="leftView">
      <view v-if="isRitch">
        <rich-text :nodes="answer"></rich-text>
        <view v-if="linkArr.length">
          <view v-for="(item,index) in (linkArr)" :key="item.key" :data-weburl="item.href" class="link" wx:item="item" @click="tap">
            {{item.name}}
          </view>
        </view>
      </view>
      <text v-else>{{msg.content}}</text>
    </view>
  </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'customTextMessage/customTextMessage'
var plugin = requirePlugin("myPlugin");
Component({
  properties: {
    msg: Object
  },

  data: {
  },
  lifetimes: {
    ready: function() {
      let that = this;
      const facejson = {
        qqface: [
          "微笑",
          "撇嘴",
          "色",
          "发呆",
          "得意",
          "流泪",
          "害羞",
          "闭嘴",
          "睡",
          "大哭",
          "尴尬",
          "发怒",
          "调皮",
          "呲牙",
          "惊讶",
          "难过",
          "酷",
          "冷汗",
          "抓狂",
          "吐",
          "偷笑",
          "愉快",
          "白眼",
          "傲慢",
          "饥饿",
          "困",
          "惊恐",
          "流汗",
          "憨笑",
          "悠闲",
          "奋斗",
          "咒骂",
          "疑问",
          "嘘",
          "晕",
          "疯了",
          "衰",
          "骷髅",
          "敲打",
          "再见",
          "擦汗",
          "抠鼻",
          "鼓掌",
          "糗大了",
          "坏笑",
          "左哼哼",
          "右哼哼",
          "哈欠",
          "鄙视",
          "委屈",
          "快哭了",
          "阴险",
          "亲亲",
          "吓",
          "可怜",
          "菜刀",
          "西瓜",
          "啤酒",
          "篮球",
          "乒乓",
          "咖啡",
          "饭",
          "猪头",
          "玫瑰",
          "凋谢",
          "嘴唇",
          "爱心",
          "心碎",
          "蛋糕",
          "闪电",
          "炸弹",
          "刀",
          "足球",
          "瓢虫",
          "便便",
          "月亮",
          "太阳",
          "礼物",
          "拥抱",
          "强",
          "弱",
          "握手",
          "胜利",
          "抱拳",
          "勾引",
          "拳头",
          "差劲",
          "爱你",
          "NO",
          "OK",
          "爱情",
          "飞吻",
          "跳跳",
          "发抖",
          "怄火",
          "转圈",
          "磕头",
          "回头",
          "跳绳",
          "投降",
          "激动",
          "乱舞",
          "献吻",
          "左太极",
          "右太极"
        ]
      };

      const clicklink = /<a.*href=["']weixin:\/\/bizmsgmenu.*msgmenucontent=([^&"'>]*).*msgmenuid=([^&"'>]*)["']>.*<\/a>/g;
      let content = this.properties.msg.content;

      if (/\[([^\]]*)\]/.test(content)) {
        content = content.replace(/\[([^\]]*)\]/g, (txt, match) => {
          const index = facejson.qqface.indexOf(match);
          if (index > -1) {
            return (
              '<span class="ai-qqemoji" style="background-position: ' +
              that.getFacePosition(index) +
              '">' +
              match +
              "</span>"
            );
          }
          return txt;
        });
      }
      // 超链接逻辑处理
      let linkArr = [],i = 0;
      if(/<a.*href=["']http(s)?:\/\/.*["']>.*<\/a>/g.test(content)){
        content = content.replace(/(<a.*?href=["'](https?[^"']*).*?>([^<]*?)<\/a>)/g, (txt, match1, match2, match3) => {
          linkArr.push({
            name: match3,
            href: match2
          })
          return `<a>${match3}</a>`
        })
        this.setData({
          linkArr: linkArr
        })
      }
      if (/<a.*>|<span.*>/.test(content)) {
        this.setData({
          isRitch: true,
          answer: content
        });
      }
    }
  },
  methods: {
    choose: function(e) {
      const chat = plugin.getChatComponent();
      chat.send(e.currentTarget.dataset.title);
    },
    getFacePosition(index) {
      const row = 15;
      const width = 24;
      const height = 24;
      const y = Math.floor(index / row);
      const x = index - y * row;
      return -(x * width) + "px " + -(y * height) + "px";
    },
    tap: function (e) {
      let url = e.currentTarget.dataset.weburl
      wx.navigateTo({
        url: `/pages/webviewPage/webviewPage?url=${url}`
      })
    },
  }
});
export default global['__wxComponents']['customTextMessage/customTextMessage']
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

.ai-qqemoji {
  background: url("https://res.wx.qq.com/mmspraiweb_node/dist/static/img/qqface2.7582741.png") no-repeat;
  width: 20px;
  height: 20px;
  text-indent: -999em;
  display: inline-block;
  display: -moz-inline-stack;
  display: inline-block;
  vertical-align: top;
  background-size: 360px 192px;
}
.link{
  font-size: 14px;
  color: #359AE1;
}
</style>