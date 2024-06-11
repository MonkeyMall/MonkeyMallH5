import { getToken, getPhone, getAppInfo, getUserPermission } from '@/utils/auth'
import { toast } from '@/utils/common'
// 登录页面
const loginPage = "/pages/login"
  
// 页面白名单
const whiteList = [
  '/pages/login', // 登录页
  '/pages/pay/index', // 支付页
  '/pages/index', // 首页
  '/pages/work/index', // 刷题
  '/pages/common/webview/index', // webview页面
  '/pageFive/tomato/index', // 番茄
  '/pageFive/tomato/index', // 自定义
  '/pageFive/work/examination/index', // 考试
  '/pageSec/timerPage/positiveTiming/index', // 正计时
  '/pageSec/timerPage/countdown/index', // 倒计时
  '/pages/mine/index', // 我的
  '/pageSec/mine/orderlist/index', // 订单列表
  '/pageSec/mine/orderlist/orderInfo', // 订单详情
  '/pageSec/mine/orderlist/voucher', // 支付凭证
  '/pageSec/mine/info/finshUserInfo', // 完善资料
  '/pageSec/AIchooseschool/index', // AI选校
  '/pageSec/checkthemajor/index', // 专业查询
  '/pageSec/checkcolleges/index', // 院校查询
  '/pageSec/countrylineinquiry/index', // 国家线
  '/pageThe/schoolcomparison/contrastselection', // 院校对比
  '/pages/zdyi',  //  用户协议
  '/pageFive/tomato/timer', // 番茄
  '/pageFive/tomato/edit',
  '/pageFive/work/examination/clock',
  '/pageFive/work/examination/testSwitch',
  // '/pageSec/mine/info/index',
  '/pages/teacherImg'
]

// 需要做权限的页面
const needPromiseList = [
  {
    url: '/pageThe/checkcolleges/Institutiondetails', // 查院校 -> 院校详情
    promise: 'pageSec_checkcolleges_index'
  },
  {
    url: '/pageThe/checkthemajor/professional', // 查专业 (同下 调剂查询)
    promise: 'pageSec_checkthemajor_index'
  },
  {
    url: '/pageThe/schoolcomparison/institutions', // 院校对比
    promise: 'pageThe_schoolcomparison_contrastselection'
  },
  // {
  //   url: '/pageSec/countrylineinquiry/index', // 国家线查询
  //   promise: 'pageSec_countrylineinquiry_index'
  // },
  {
    url: '/pageThe/checkthemajor/professional', // AI智能择校
    promise: 'pageSec_AIchooseschool_index'
  },
  {
    url: '/pageThe/checkthemajor/professional', // 调剂查询(同上 查专业)
    promise: 'pageSec_checkthemajor_index_tj'
  },
  {
    url: '/pageFive/work/english/index', // 刷外语
    promise: 'pageFive_work_english_index'
  },
  {
    url: '/pageFive/work/mathematics/index', // 刷数学
    promise: 'pageFive_work_mathematics_index'
  },
  {
    url: '/pageFive/work/exercise/index', // 刷政治
    promise: 'pageFive_work_exercise_index'
  }
]

// 检查地址白名单
function checkWhite(url) {
  let urls = url
  if (urls.indexOf('?') !== -1) {
    urls = urls.split('?')[0]
  }
  return whiteList.indexOf(urls) !== -1
}

function showModalFn() {
  uni.showModal({
    title: '温馨提示',
    content: '您暂无权限访问当前页面，请联系老师授权账号权限！',
    showCancel: false,
    confirmColor: "#fc515f",
    confirmText: '联系老师',
    success: function(res) {
      if (res.confirm) {
        uni.navigateTo({
          url: '/pages/teacherImg'
        })
      }
    }
  })
}

// 页面跳转验证拦截器
let list = ["navigateTo", "redirectTo", "switchTab"]
list.forEach(item => {
  uni.addInterceptor(item, {
    invoke(to, from) {
      console.log('跳转劫持：', to.url)
      if (checkWhite(to.url)) {
        return true
      } else {
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
                  // const qrcodeurl = getAppInfo().qrcodeurl || '' // 替换成要拨打的电话号码
                  // console.log('联系老师', qrcodeurl)
                  // uni.previewImage({
                  //   current: 1, // 当前显示图片索引，默认是第一个
                  //   urls: ['https://education-1323054692.cos.ap-beijing.myqcloud.com/images/1703586783888.jpg'] 
                  // })
                }
              }
            })
            return false
          } else {
            // 获取用户的权限
            let permissionList = getUserPermission()
            // 点击进入的页面的链接
            let filterUrl = to.url.split('?')[0]
            let currentToPagePromiseList = needPromiseList.filter(item => filterUrl.indexOf(item.url) !== -1) || []
            if (currentToPagePromiseList.length > 0) {
              // 需要做权限校验的
              console.log('判断是否是公用页面')
              if (currentToPagePromiseList.length === 1) {
                console.log('单个页面')
                // 只有一项匹配（页面不是公用的）
                let currentToPagePromise = currentToPagePromiseList[0].promise
                if (permissionList.filter(item => item === currentToPagePromise).length != 0){
                  // 当前点击要进入的链接是有权限的
                  return true
                } else {
                  // 没有权限，不能跳转进去
                  console.log('没有权限，不能跳转进去!!')
                  showModalFn()
                  return false
                }
              } else {
                // 页面有公用的
                // currentToPagePromiseList
                let optionsObj = new Object()
                to.url.split('?')[1].split('&').map((item) => {
                  let key = item.split("=")[0]
                  let value = item.split("=")[1]
                  optionsObj[key] = value
                })
                console.log('公用页面', filterUrl, optionsObj)
                // 查专业/调剂专业/AI智能择校
                if (filterUrl === '/pageThe/checkthemajor/professional') {
                  if (optionsObj.isTJ === '0') {
                    // 查专业
                    if (permissionList.filter(item => item === 'pageSec_checkthemajor_index').length == 0){
                      // 当前点击要进入的链接是有权限的
                      showModalFn()
                      return false
                    }
                  } else if (optionsObj.isTJ === '1') {
                    // 调剂专业
                    if (permissionList.filter(item => item === 'pageSec_checkthemajor_index_tj').length == 0){
                      // 当前点击要进入的链接是有权限的
                      showModalFn()
                      return false
                    }
                  } else if (optionsObj.isTJ === '2') {
                    // AI智能择校
                    if (permissionList.filter(item => item === 'pageSec_AIchooseschool_index').length == 0){
                      // 当前点击要进入的链接是有权限的
                      showModalFn()
                      return false
                    }
                  }
                }
              }
            } else {
              // 当前点击要进入的链接不需要校验权限
              return true
            }
          }
          return true
        } else {
          // 没有手机号，跳获取手机号页面
          uni.navigateTo({ url: loginPage })
          return false
        }
      }
    },
    fail(err) {
      console.log(err)
    }
  })
})
