/*
 * @Description: 
 * @Author: ymgu
 * @Date: 2023-11-17 09:34:34
 * @LastEditTime: 2024-05-21 14:39:18
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 */
import store from '@/store'
import config from '@/config'
import errorCode from '@/utils/errorCode'
import { toast, showConfirm, tansParams } from '@/utils/common'
import md5 from '@/utils/md5'
import { getToken, getPhone, getAppInfo } from '@/utils/auth'
let timeout = 10000
const baseUrl = config.baseUrl
let hasErrorMsg = false
const request = config => {
  console.log('config', config)
  // 是否需要设置 token
  // const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  // if (getToken() && !isToken) {
  //   config.header['Authorization'] = 'Bearer ' + getToken()
  // }
  let cookie = 'account=songyanbin; userInfo={"_id":"666840a5e1ac8c0e360445d5","username":"songyanbin"}'
  config.header = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie
  }
  if (!hasErrorMsg && config.header.hasLoading) {
		uni.showLoading({
			title: '加载中'
		});
    hasErrorMsg = true
	}
  // 
  // let token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjkxYjg5ZDM2LTZmZDQtNGRmMi05YmEwLWFlY2IyNmIwOTVhYiIsInVzZXJuYW1lIjoi5qyy54Gr5qeD5raFIn0.ECYn5TG6-kHMHk_7wgAbAGZm-g6Q1rLKqOWJC0SVi9mUm-dA3OpI-4v-8SSqJAL_UjiJ_sYgQ8p4u2WWQSQe_A'
  // config.header['Authorization'] = 'Bearer ' + token
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  console.log(11,config)
  return new Promise((resolve, reject) => {
    uni.request({
        method: config.method || 'get',
        timeout: config.timeout ||  timeout,
        url: config.baseUrl || baseUrl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        console.log(22,response)
        if (config.header.hasLoading) {
          setTimeout(() => {
            uni.hideLoading()
            hasErrorMsg = false
          }, config.header.loadingTime || 2500)
        }
        // console.log('response: ', response);
        let [error, res] = response
        if (error) {
          toast('当前网速较慢，请稍后重试')
          reject('当前网速较慢，请稍后重试')
          return
        }
        const code = res.data.code || 200
        const msg = errorCode[code] || res.data.msg || errorCode['default']
        if (code === 401) {
          if (getPhone()) {
            if (!getToken()) {
              uni.showModal({
                title: '温馨提示',
                content: '当前用户未在机构中录入，请联系老师授权账号！',
                showCancel: false,
                confirmColor: "#fc515f",
                confirmText: '联系老师',
                success: function(res) {
                  if (res.confirm) {
                    uni.navigateTo({
                      url: '/pages/teacherImg'
                    })
                    // const phoneNumber = getAppInfo().phonenumber || '' // 替换成要拨打的电话号码
                    // if (phoneNumber) {
                    //   wx.makePhoneCall({
                    //     phoneNumber: phoneNumber
                    //   })
                    // }
                    // uni.navigateBack()
                  }
                }
              })
            }
          } else {
            // 没有手机号，跳获取手机号页面
            uni.navigateTo({ url: '/pages/login' })
          }
          // reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          toast(msg)
          reject('500')
        } else if (code !== 200) {
          toast(msg)
          reject(code)
        }
        resolve(res.data)
      })
      .catch(error => {
        // uni.hideLoading()
        let { message } = error
        console.log(33,error)
        if (message === 'Network Error') {
          message = '当前网速较慢，请稍后重试'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        toast(message)
        reject(error)
      })
  })
}

export  {request}
// module.exports = { request }
