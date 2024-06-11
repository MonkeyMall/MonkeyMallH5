<template>
  <view style="height: 100vh;">
    <chat
      bind:queryCallback="getQueryCallback"
      bind:openWebview="openWebview"
      bind:openMiniProgram="openMiniProgram"
    />
  </view>
</template>

<script>
// import { addActiveData, participateActivities } from '@/api/comm'
import { getPhone, getOpenId } from '@/utils/auth'

export default {
  data() {
    return {
      // status: res.statusBarHeight,
      // navHeight: navHeight,
      // statusBarHeight: res.statusBarHeight + navHeight
    }
  },
  onLoad() {
    // wx.getSystemInfo({
    //   success: res => {
    //     let isIOS = res.system.indexOf("iOS") > -1;
    //     let navHeight = 0;
    //     if (!isIOS) {
    //       navHeight = 48;
    //     } else {
    //       navHeight = 44;
    //     }
    //     this.setData({
    //       status: res.statusBarHeight,
    //       navHeight: navHeight,
    //       statusBarHeight: res.statusBarHeight + navHeight
    //     })
    //   }
    // })
    let phone = getPhone()
    let opneId = getOpenId()
    var plugin = requirePlugin("chatbot");
    console.log(1111111, plugin)
    plugin.init({
      appid: "V9qTo2SzBqh2xaOr9eGU0LA4uD4Eyh", //微信对话开放平台小程序插件appid
      openid: opneId, // 小程序用户的openid，必填项
      // guideList: ["择校", "山西大学", "国家分数线", "刷英语", "刷数学"],
      robotHeader: "https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/chatbot.png", // 机器人头像,不传会弹出登录框
      userHeader: "https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/user.png", // 用户头像,不传会弹出登录框
      userName: phone, // 用户昵称,不传会弹出登录框
      guideCardHeight: 0,
      operateCardHeight: 0,
      navHeight: 50,
      textToSpeech: true,
      history: true,
      guideListStyle: "default", // 引导语列表样式，可选值default、card，默认为default
      anonymous: false, // 是否允许匿名用户登录，版本1.2.9后生效, 默认为false，设为true时，未传递userName、userHeader两个字段时将弹出登录框
      success: () => { },//非必填
      fail: (error) => { },//非必填
    })
  },
  onShow() {
  },
  mounted() {
  },
  methods: {
    // 
    getQueryCallback: function (e) {

    },
    openWebview: function (e) {
      let url = e.detail.weburl
      wx.navigateTo({
        url: `/pages/webviewPage/webviewPage?url=${url}`
      })
    },
    openMiniProgram(e) {
      let { appid, pagepath } = e.detail
      if (appid) {
        wx.navigateToMiniProgram({
          appId: appid,
          path: pagepath,
          extraData: {},
          envVersion: "",
          success(res) {
            // 打开成功
          }
        });
      } else {
        wx.navigateTo({
          url: pagepath,
          fail() {
            wx.switchTab({
              url: pagepath
            });
          }
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/.operateCard--bottom-operate-view {
  align-items: center;
}
/deep/.operateCard--btn {
  width: 38px !important;
  height: 38px !important;
  padding: 7px !important;
}
/deep/.operateCard--face {
  display: none;
}
/deep/.operateCard--plus {
  display: none;
}
/deep/.operateCard--bottom-operate-view {
  padding-right: 14px;
}
/deep/.textCard--left-voice {
  display: none;
}
/deep/.chat--useClick {
  display: none;
}
</style>
