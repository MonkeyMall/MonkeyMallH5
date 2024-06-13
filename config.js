/*
 * @Author: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @Date: 2024-05-16 16:12:12
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @LastEditTime: 2024-05-17 10:57:13
 * @FilePath: \RuoYi-App-master\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 应用全局配置
// const { miniProgram: { envVersion } } = wx.getAccountInfoSync();
// console.log('全局信息：', envVersion)
// let baseUrl = null
// switch (envVersion) {
//   case "develop": // 开发版
//       baseUrl = "https://ky.yykjedu.com/prod-api";
//       break;
//   case "trial": // 体验版
//       baseUrl = "https://kaoyan.yykjedu.com/prod-api";
//       break;
//   default:    // 正式版
//       baseUrl = "https://ky.yykjedu.com/prod-api";
//       break;
// }
module.exports = {
  // baseUrl,
  // baseUrl: 'https://vue.ruoyi.vip/prod-api',
  // baseUrl: 'http://192.168.1.7:8080',//本地环境
  baseUrl: 'https://kaoyan.yykjedu.com/prod-api',//测试环境
  // baseUrl: 'https://ky.yykjedu.com/prod-api',//线上环境
  // 应用信息
  appInfo: {
    // 应用名称
    name: "猿社区",
    // 应用版本
    version: "1.1.0",
    // 应用logo
    logo: "https://education-1323054692.cos.ap-beijing.myqcloud.com/mini/static/images/index/logo1.png",
  }
}

