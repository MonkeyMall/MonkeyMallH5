import { request } from '@/utils/request'
// 注册方法
export function login(data) {
	return request({
		url: '/user/WeChat/register',
		method: 'post',
		data: data
	})
}

// 退出方法
export function logout() {
	return request({
		'url': '/auth/logout',
		'method': 'DELETE'
	})
}