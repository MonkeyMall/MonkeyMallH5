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

// // 红包雨结束后确定接口
// export function addActiveData(data) {
// 	return request({
// 		url: '/system/management/addActiveData',
// 		method: 'post',
// 		data: data
// 	})
// }
