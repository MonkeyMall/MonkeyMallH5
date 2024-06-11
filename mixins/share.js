export default {
  created() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  // onShareAppMessage(options) {
  //   console.log('分享的参数', options)
  //   return {
  //     title: '自定义转发标题',
  //   }
  // }
}