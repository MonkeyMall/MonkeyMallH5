import upload from '@/utils/upload'
import { request } from '@/utils/request'

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return upload({
    url: '/system/user/profile/avatar',
    name: data.name,
    filePath: data.filePath
  })
}

//	消息通知 列表获取
export function getNotify(data) {
  return request({
    url: '/system/notice/appletList',
    method: 'get',
    params: data
  })
}

//	我的支付订单
export function getPayOrder(data) {
  return request({
    url: '/system/appletF/minePaymetOrder',
    method: 'get',
    params: data
  })
}

//  我的退款订单
export function getRefundOrder(data) {
  return request({
    url: '/system/appletF/minePaymetRefund',
    method: 'get',
    params: data
  })
}

//  我的支付订单详情
export function getPayOrderDetail(data) {
  return request({
    url: '/system/appletF/minePaymetOrderDetail',
    method: 'get',
    params: data
  })
}

//  退订金
export function refund(data) {
  return request({
    url: '/system/appletFtea/tuitionRefund',
    method: 'post',
    data
  })
}

//  查看订单是否退费
export function getRefundStatus(data) {
  return request({
    url: '/system/appletF/refundOrNot',
    method: 'get',
    params: data
  })
}

//  添加意见反馈
export function addFeedback(data) {
  return request({
    url: '/system/feedback',
    method: 'post',
    data
  })
}



//  获取推广渠道模板
export function getChannel(data) {
  return request({
    url: '/system/appletA/getInfoByTenantId',
    method: 'get',
    params: data
  })
}

//  用户提交form表单
export function submitForm(data) {
  return request({
    url: '/system/appletA/userSubmitFinTgForm',
    method: 'post',
    data
  })
}


//  个人信息查询
export function getUserInfo(data) {
  return request({
    url: '/system/user/selectPersonalData',
    method: 'get',
    params: data
  })
}

//  支付凭证
export function getPayment(data) {
  return request({
    url: '/system/appletF/btainPaymentVoucher',
    method: 'get',
    params: data
  })
}

//  调起回款支付接口
export function createXfOrder(data) {
  return request({
    url: '/system/appletF/createXfOrder',
    method: 'get',
    params: data
  })
}

// 订金订单删除接口
export function delDingjin(id) {
	return request({
	  url: '/system/appletF/delPaymentOrder/'+id,
	  method: 'delete'
	  // params: data
	})
}
