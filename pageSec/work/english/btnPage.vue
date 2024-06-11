<!--
 * @Author: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @Date: 2023-12-23 13:58:23
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @LastEditTime: 2023-12-23 14:06:41
 * @FilePath: \RuoYi-App-master\pageSec\work\english\btn.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <Button
      class="btnBox w204"
      open-type="share"
      @click="toShare"
    >分享小程序</Button>
  </view>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  //发送给微信好友
  onShareAppMessage(res) {
    console.log('res: ', res);
    if (res.from === 'button') {// 来自页面内分享按钮
      console.log(res.target, 'res.dataset.eventOpts[1][0] ', res.target.dataset.eventOpts[1])
      // if(res.target.dataset.eventOpts[1] === 'toShare'){
      //   return {
      //       title: '考研一起卷', //分享的名称
      //       path: '/pages/index',   //页面的路径
      //     }
      // }else{
      //   this.saveFn()
      // }
      return {
        title: '考研一起卷', //分享的名称
        path: '/pages/index',   //页面的路径
      }
    }

  },
  //分享到朋友圈
  onShareTimeline(res) {
    console.log('res: ', res);
    return {
      title: '考研一起卷',
      type: 0,
      path: '/pages/index',
    }
  },
  methods: {
    toShare() {
      console.log('22222222')
      // this.$emit('save')
    }
  },
}
</script>