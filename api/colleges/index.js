/*
 * @Author: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @Date: 2023-12-11 09:23:56
 * @LastEditors: lili.liang oncwnuLfMdJTJ1uB8pjgINGPT0Rs@git.weixin.qq.com
 * @LastEditTime: 2024-05-16 11:06:43
 * @FilePath: \RuoYi-App-master\api\colleges\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
	request
} from '@/utils/request'


// 查院校=========================================
// 院校列表  /applet/school/message/{schoolId}_1701679026865
export function findAllSchool(data) {
	return request({
		url: '/major/applet/school/message/findAllSchool',
		method: 'post',
		data: data,
    header: {
      hasLoading: true
    }
	})
}
// 院校列表(分页)  /applet/school/message/{schoolId}_1701679026865
export function findAllSchoolPage(data) {
	return request({
		url: `/major/applet/school/message/findAllSchoolPage?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
		method: 'post',
		data: data,
   
	})
}
// 院校列表
export function schoolMessage(schoolId) {
	return request({
		url: `/major/applet/school/message/${schoolId}`,
		method: 'get',
	})
}
// 院校分数
export function schoolFindScore(data) {
	return request({
		url: '/major/applet/retestAvg/score/findScore',
		method: 'POST',
		data: data
	})
}
// 学科分类
export function groupTree(data) {
	return request({
		url: '/major/applet/subject/group/tree', 
		method: 'get',
		data: data
	})
}
// 根据学校查专业
export function schoolssList(data) {
	return request({
		url: '/major/applet/school/specialty/ssList',
		method: 'POST',
		data: data
	})
}
// 所有专业
export function findSpecialtyList(data) {
	return request({
		url: `/major/applet/school/specialty/findSpecialtyList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
		method: 'POST',
		data: data,
    // header: {
    //   hasLoading: true,
    //   loadingTime: 1800
    // }
	})
}
// 根据专业查询院校
export function findSchoolBySpecialty(data) {
	return request({
		url: `/major/applet/school/message/findSchoolBySpecialty?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
		method: 'POST',
		data: data
	})
}
// 专业简介
export function schoolSpecialty(specialtyId ) {
	return request({
		url: `/major/applet/school/specialty/${specialtyId}`,
		method: 'get',
	})
}
// 考试科目
export function subjectEsList(data) {
	return request({
		url: '/major/applet/early/subject/esList',
		method: 'POST',
		data: data
	})
}
// 查询初试参考书列表
export function subjectEbList(data) {
	return request({
		url: '/major/applet/early/subject/ebList',
		method: 'POST',
		data: data
	})
}
// 近年招生情况 
export function findEiryList(data) {
	return request({
		url: '/major/applet/apply/matriculate/condition/findEiryList',
		method: 'POST',
		data: data
	})
}
// 查询报录比
export function findApplyList(data) {
	return request({
		url: '/major/applet/apply/matriculate/condition/findApplyList',
		method: 'POST',
		data: data
	})
}
// 查询复录比
export function findRepeatList(data) {
	return request({
		url: '/major/applet/apply/matriculate/condition/findRepeatList',
		method: 'POST',
		data: data
	})
}
// 分数线 查询国家分数线列表  
export function sclList(data) {
	return request({
		url: '/major/applet/country/score/sclList',
		method: 'POST',
		data: data
	})
}
// 分数线查询复试平均分列表
export function rgList(data) {
	return request({
		url: '/major/applet/country/score/rgList',
		method: 'POST',
		data: data
	})
}
// 分数线 查询录取最高最低分列表
export function mmmsList(data) {
	return request({
		url: '/major/applet/country/score/mmmsList',
		method: 'POST',
		data: data
	})
}
// 专业老师
export function teacherList(data) {
	return request({
		url: '/major/applet/specialty/teacher/list',
		method: 'POST',
		data: data
	})
}
// AI择校
export function AISubjectGroup(data) {
	return request({
		url: '/major/applet/school/specialty/findSpecialtyListBySubjectGroup',
		method: 'POST',
		data: data
	})
}
// 学校列表
export function AifindAIChooseSchool(data) {
	return request({
		url: '/major/applet/school/message/findAIChooseSchool',
		method: 'POST',
		data: data
	})
}
// 调剂信息
export function admListFn(data) {
	return request({
		url: '/major/applet/adjust/message/admList',
		method: 'POST',
		data: data
	})
}
// 研究方向
export function ardListFn(data) {
	return request({
		url: '/major/applet/research/direction/ardList',
		method: 'POST',
		data: data
	})
}
// 获取复试方法
export function findInfo(params) {
	return request({
		url: '/major/applet/reexamine/way/findInfo',
		method: 'get',
    params
	})
}
// 复式内容
export function subjectRcist(data) {
	return request({
		url: '/major/applet/early/subject/rcist',
		method: 'POST',
		data: data
	})
}

// 录取名单-xxx年拟录取名单（不含专项）
export function matriculateListFn(data) {
	return request({
		url: '/major/applet/matriculate/list',
		method: 'POST',
		data: data
	})
}
// 录取名单-xxx一志愿与校内调剂复试名单(不含专项)
export function farListFn(data) {
	return request({
		url: '/major/applet/matriculate/far/list',
		method: 'POST',
		data: data
	})
}// 录取名单-xxx年调剂出去复试名单
export function aorListFn(data) {
	return request({
		url: '/major/applet/matriculate/aor/list',
		method: 'POST',
		data: data
	})
}
// 录取名单-xxx年调剂出去拟录取名单
export function aomListFn(data) {
	return request({
		url: '/major/applet/matriculate/aom/list',
		method: 'POST',
		data: data
	})
}
// 国家线/图表分析
export function findMajorCountryLine(data) {
	return request({
		url: '/major/applet/country/line/findMajorCountryLine',
		method: 'POST',
		data: data
	})
}
// 自划线
export function findMajorSelfDelimitationLine(data) {
	return request({
		url: '/major/applet/self/delimitation/line/findMajorSelfDelimitationLine',
		method: 'POST',
		data: data
	})
}
// 国家线-图表分析-单科分数
export function findMajorCountryLineChart(data) {
	return request({
		url: '/major/applet/country/line/findMajorCountryLineChart',
		method: 'POST',
		data: data
	})
}
// 国家线 -专业查询
export function countryScoreTree() {
	return request({
		url: '/major/applet/subject/group/countryScoreTree',
		method: 'get',
	})
}
// 查询学校下专业
export function findSpecialtyListBySchoolId(data) {
	return request({
		url: '/major/applet/school/specialty/findSpecialtyListBySchoolId/'+data.schoolId,
		method: 'get',
	})
}
// 院校对比--按学校/专业对比
export function collegesUniversitiesContrast(data) {
	return request({
		url: '/major/applet/school/message/collegesUniversitiesContrast',
		method: 'POST',
		data: data,
    header: {
      'content-type': 'application/json;charset=UTF-8'
    },
	})
}
// 按专业对比根据学科分类查询学校
export function findSchoolBySubjectGroup(data) {
	return request({
		url: '/major/applet/school/message/findSchoolBySubjectGroup',
		method: 'POST',
		data: data,
		header: {
			hasLoading: true
		}
	})
}
// 国家线--趋势图
export function findMajorCountryLineTrend(data) {
	return request({
		url: '/major/applet/country/line/findMajorCountryLineTrend',
		method: 'POST',
		data: data
	})
}
// 获取年份(专业)
export function findYearBySchoolId(params) {
	return request({
		url: '/major/applet/retestAvg/score/findYearBySchoolId',
		method: 'get',
    params
	})
}
// 获取年份(自划线-)
export function findMajorSelfDelimitationLineYear() {
	return request({
		url: '/major/applet/self/delimitation/line/findMajorSelfDelimitationLineYear',
		method: 'get',
	})
}
// 获取年份(国家线)
  export function findYear() {
    return request({
      url: '/major/applet/country/line/findYear',
      method: 'get',
    })
}
// 获取学校(自划线)
export function findMajorSelfDelimitationLineSchool() {
  return request({
    url: '/major/applet/self/delimitation/line/findMajorSelfDelimitationLineSchool',
    method: 'get',
  })
}