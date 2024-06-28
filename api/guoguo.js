import {request} from '@/utils/request'
import { getUserId, setPhoneUuid, getPhoneUuid, getTeacherId } from '@/utils/auth'

// 侃言列表
export function getRidiculeList(query) {
  return request({
    url: '/ridicule/list',
    method: 'get',
    params: query
  })
}

// 侃言评论列表
export function getCommentList(query) {
  return request({
    url: '/comment/commentList',
    method: 'post',
    data: query
  })
}

// 评论
export function addCommentRidicule(params) {
	return request({
		url: "/comment/add",
		method: "post",
		data: params
	})
}

// 公司列表
export function getComponyList(query) {
  return request({
    url: '/company/list',
    method: 'get',
    params: query
  })
}

// 公司评论
export function setCommentsComponyAdd(params) {
  return request({
    url: '/commentsCompony/add',
    method: "post",
		data: params
  })
}

// 公司评论列表
export function getCommentsComponyList(query) {
  return request({
    url: '/commentsCompony/list',
    method: 'get',
    params: query
  })
}

// 用户收藏的公司列表
export function getCompanyCollectList(query) {
  return request({
    url: '/company/collect/list',
    method: 'get',
    params: query
  })
}

// 用户收藏公司
export function commentsCollect(params) {
  return request({
    url: '/compony/collect',
    method: "post",
		data: params
  })
}


// // 红包雨结束后确定接口
// export function addActiveData(data) {
// 	return request({
// 		url: '/system/management/addActiveData',
// 		method: 'post',
// 		data: data
// 	})
// }
